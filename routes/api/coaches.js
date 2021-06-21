const express = require('express')
const router = express.Router()
const config = require('config')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')

const upload = require('../../middleware/upload')
const Coach = require('../../models/Coaches')

// @route   POST /api/coach/register
// @desc    Register coach
// @access  Public
router.post('/register', upload.array('image', 2), async (req, res) => {
  req.body = JSON.parse(req.body.data)
  await check('name', 'Vui lòng nhập tên').not().isEmpty().run(req)
  await check('email', 'Vui lòng nhập email').isEmail().run(req)
  await check('password', 'Mật khẩu ít nhất 6 chữ')
    .isLength({ min: 6 })
    .run(req)
  await check('phoneNumber', 'Vui lòng nhập SDT').not().isEmpty().run(req)

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors })
  }

  //upload image
  let identityCard = []

  req.files.forEach((e) => {
    identityCard.push(e.id)
  })

  const {
    name,
    email,
    phoneNumber,
    password,
    city,
    district,
    ward,
    price,
    description
  } = req.body
  const address = { city, district, ward }
  const contact = { email, phoneNumber, address }
  try {
    //see if coach exist
    let coach = await Coach.findOne({ 'contact.phoneNumber': phoneNumber })
    if (coach) {
      return res
        .status(400)
        .json({ errors: 'SĐT này đã tồn tại trong hệ thống' })
    }

    coach = new Coach({
      name,
      contact,
      price,
      description
    })
    //add identityCard Id to Coaches
    coach.identityCard = identityCard

    //Encrypt password
    const salt = await bcrypt.genSalt(10)
    coach.password = await bcrypt.hash(password, salt)

    await coach.save()

    //return jsonwebtoken
    const payload = {
      coach: {
        id: coach.id
      }
    }

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: 36000 },
      (err, token) => {
        if (err) throw err
        res.json({ token })
      }
    )
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

// @route   POST api/coaches/authenticate
// @desc    Authenticate coach & get token
// @access  Public
router.post(
  '/authenticate', //Router-level middleware
  [
    check('phoneNumber', 'Vui lòng nhập số điện thoại').not().isEmpty(),
    check('password', 'Yêu cầu nhập mật khẩu').exists()
  ],
  async (req, res) => {
    const err = validationResult(req)
    if (!err.isEmpty()) {
      return res.status(400).json({ err: err.array() })
    }
    const { phoneNumber, password } = req.body
    try {
      //see if owner exists
      let coach = await Coach.findOne({ 'contact.phoneNumber': phoneNumber })
      if (!coach) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Thông tin không hợp lệ' }] })
      }

      const isMatch = await bcrypt.compare(password, coach.password)
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Thông tin không hợp lệ' }] })
      }

      //Return jwt
      const payload = {
        //the payload which inclube ownerId
        coach: {
          id: coach.id
        }
      }

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err
          res.json({ token })
        }
      )
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Lỗi server')
    }
  }
)

module.exports = router
