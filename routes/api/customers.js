const express = require('express')
const router = express.Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')
const GoogleStrategy = require('passport-google-oauth20')
const FacebookStrategy = require('passport-facebook')
const config = require('config')
const { check, validationResult } = require('express-validator')

const Customer = require('../../models/Customers')
const customer = require('../../middleware/customer')
passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  done(null, user)
})

passport.use(
  new GoogleStrategy(
    {
      clientID: config.get('googleID'),
      clientSecret: config.get('googleSecret'),
      callbackURL: '/api/customers/auth/google/callback'
    },
    async function (accessToken, refreshToken, profile, done) {
      await Customer.findOne({ googleId: profile.id }).then((currentUser) => {
        if (currentUser) {
          done(null, currentUser)
        } else {
          new Customer({
            googleId: profile.id,
            name: profile.displayName,
            contact: { email: profile.emails[0].value },
            avatar: profile.photos[0].value
          })
            .save()
            .then((newCustomer) => {
              done(null, newCustomer)
            })
        }
      })
    }
  )
)

// @route   GET api/users
// @desc    Test route
// @access  Public
router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
)

// @route   GET api/customers/auth/google/callback
// @desc    get response from google api & return token for FE
// @access  Public
router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function (req, res) {
    //return jsonwebtoken
    const payload = {
      customer: {
        id: req.user.id
      }
    }

    jwt.sign(
      //sign the token pass and the payload pass
      payload,
      config.get('jwtSecret'),
      { expiresIn: 36000 },
      (err, token) => {
        if (err) throw err
        res.json({ token }) //if have no err, send that token to the client
      }
    )

    // Successful authentication, redirect home.
    // res.redirect('/');
  }
)

passport.use(
  new FacebookStrategy(
    {
      clientID: config.get('facebookID'),
      clientSecret: config.get('facebookSecret'),
      callbackURL: '/api/customers/auth/facebook/callback',
      profileFields: ['emails', 'displayName', 'photos']
    },
    async function (accessToken, refreshToken, profile, done) {
      await Customer.findOne({ facebookId: profile.id }).then((currentUser) => {
        if (currentUser) {
          done(null, currentUser)
        } else {
          new Customer({
            facebookId: profile.id,
            name: profile.displayName,
            // contact: { email: profile.emails[0].value },
            avatar: profile.photos
              ? profile.photos[0].value
              : '/img/faces/unknown-user-pic.jpg'
          })
            .save()
            .then((newCustomer) => {
              done(null, newCustomer)
            })
        }
      })
    }
  )
)

// @route   GET api/customers/auth/facebook
// @desc    get token user by facebook api
// @access  Public
router.get('/auth/facebook', passport.authenticate('facebook'))

// @route   GET api/customers/auth/facebook/callback
// @desc    get response from facebook api & return token for FE
// @access  Public
router.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: '/login'
  }),
  (req, res) => {
    //return jsonwebtoken
    const payload = {
      customer: {
        id: req.user.id
      }
    }

    jwt.sign(
      //sign the token pass and the payload pass
      payload,
      config.get('jwtSecret'),
      { expiresIn: 36000 },
      (err, token) => {
        if (err) throw err
        res.json({ token }) //if have no err, send that token to the client
      }
    )
  }
)

// @route   GET api/customer
// @desc    get all customer
// @access  Public
router.get('/', async (req, res) => {
  try {
    let allCustomers = await Customers.find()
    if (!allCustomers) {
      return res.status(400).json({ message: 'No Customer found' })
    }
    res.json(allCustomers)
  } catch (err) {
    console.error(err.message)
    return res.status(500).json({ message: 'Lỗi server' })
  }
})

// @route   PUT api/customers/contact
// @desc    Customer update contact
// @access  Public
router.put('/contact', customer, [
  check('phoneNumber', 'Vui lòng nhập đúng số điện thoại').matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/),
  check('address.city', 'Vui lòng nhập thành phố').not().isEmpty(),
  check('address.district', 'Vui lòng nhập quận').not().isEmpty(),
  check('address.ward', 'Vui lòng nhập phường').not().isEmpty(),
],async (req, res) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()})
  }

  const {phoneNumber, address}  = req.body
  try {
    
    const updateCustomer = await Customer.findOneAndUpdate({_id: req.customer.id}, {$set: {
      'contact.phoneNumber': phoneNumber,
      'contact.address.city':address.city,
      'contact.address.district': address.district,
      'contact.address.ward': address.ward}}, {new: true})

    res.status(200).json(updateCustomer)
    
  } catch (error) {
    console.error(error)
    return res.status(500).json('Lỗi server')
  }
})

module.exports = router
