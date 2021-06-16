const express = require('express')
const router = express.Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')
const GoogleStrategy = require('passport-google-oauth20')
const FacebookStrategy = require('passport-facebook')
const config = require('config')

const Customer = require('../../models/Customers')

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
    async function(accessToken, refreshToken, profile, done) {
      await Customer.findOne({ googleId: profile.id }).then(currentUser => {
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
            .then(newCustomer => {
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
  function(req, res) {
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
    async function(accessToken, refreshToken, profile, done) {
      await Customer.findOne({ facebookId: profile.id }).then(currentUser => {
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
            .then(newCustomer => {
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

// @route   GET api/customers/current
// @desc    get current customer
// @access  Public
router.get('/current', async (req, res) => {
  res.send(req.customer)
})

module.exports = router
