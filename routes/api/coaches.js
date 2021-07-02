const express = require('express')
const router = express.Router()
const config = require('config')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')

// middleware
const upload = require('../../middleware/upload')
const coach = require('../../middleware/coach')

// models
const Coach = require('../../models/Coaches')
const Order = require('../../models/Orders')

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
    return res.status(400).json({ errors: errors.array() })
  }

  //upload image
  let identityCard = []

  req.files.forEach((e) => {
    identityCard.push(e.id)
  })

  const {
    name,
    dateOfBirth,
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
      dateOfBirth,
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
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
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
    } catch (error) {
      console.error(error.message)
      res.status(500).send('Lỗi server')
    }
  }
)

// @route   GET api/coaches/work-schedule
// @desc    Coach get work schedule
// @access  Private
router.get('/work-schedule', coach, async (req, res) => {
  const [dayStart, monthStart, yearStart] = req.body.start.split('-')
  const [dayEnd, monthEnd, yearEnd] = req.body.end.split('-')
  const start = new Date(yearStart, monthStart, dayStart)
  const end = new Date(yearEnd, monthEnd, dayEnd)

  try {
    const coachFieldsRegistered = await Coach.findById(req.coach.id, {
      fieldsRegistered: 1
    })

    //check coach if exist
    if (!coachFieldsRegistered) {
      return res
        .status(400)
        .json({ message: 'Lỗi, không tìm thất huấn luyện viên' })
    }

    //find order has coach booking from rental date
    const orderHasCoach = await Order.find(
      {
        coach: coachFieldsRegistered.id,
        'payment.status': true,
        rentalDate: { $gte: start },
        rentalDate: { $lte: end }
      },
      { retalDate: 1, start: 1, end: 1, coachPrice: 1, owner: 1 }
    )

    if (orderHasCoach.length == 0) {
      return res
        .status(400)
        .json({ message: 'Bạn chưa được ai book trong thời gian này' })
    }

    res.status(200).json({ orderHasCoach, coachFieldsRegistered })
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Lỗi server')
  }
})

module.exports = router
