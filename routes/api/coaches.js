const express = require('express')
const router = express.Router()
const config = require('config')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')

const upload = require('../../middleware/upload')
const Coach = require('../../models/Coaches')
const coach = require('../../middleware/coach')
const Field = require('../../models/Fields')

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

// @route   POST api/coaches/work-register
// @desc    Coach register for work schedule
// @access  Private
router.put(
  '/work-register',
  coach,
  [
    check(
      'openHour',
      'Vui lòng nhập giờ mở cửa lớn hơn 0 và nhỏ hơn 24!'
    ).isInt({ min: 0, max: 23 }),
    check(
      'closeHour',
      'Vui lòng nhập giờ đóng cửa lớn hơn 0 và nhỏ hơn 24!'
    ).isInt({ min: 0, max: 23 }),
    check(
      'closeMinutes',
      'Vui lòng nhập phút đóng cửa lớn hơn 0 và nhỏ hơn 59!'
    ).isInt({ min: 0, max: 59 }),
    check(
      'openMinutes',
      'Vui lòng nhập phút đóng cửa lớn hơn 0 và nhỏ hơn 59!'
    ).isInt({ min: 0, max: 59 }),
    check('startDay', 'Vui lòng nhập ngày').not().isEmpty(),
    check('endDay', 'Vui lòng nhập ngày').not().isEmpty(),
    check('repeat.unit', 'Vui lòng chọn đơn vị lặp lại').not().isEmpty()
  ],
  async (req, res) => {
    //check validate
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const {
      fieldId,
      openHour,
      closeHour,
      openMinutes,
      closeMinutes,
      startDay,
      endDay,
      repeat,
      allDay,
      note
    } = req.body

    const startInDay = openHour * 60 + openMinutes
    const endInDay = closeHour * 60 + closeMinutes
    const [dayStart, monthStart, yearStart] = startDay.split('-')
    const [dayEnd, monthEnd, yearEnd] = endDay.split('-')

    const workingInDay = { startInDay, endInDay, allDay }
    try {
      // check id
      if (fieldId.match(/^[0-9a-fA-F]{24}$/) == null) {
        return res.status(400).json({ message: 'Id sai' })
      }

      //check field exist
      const field = await Field.findById(fieldId)
      if (!field) {
        return res.status(400).json({ message: 'Sân không tồn tại' })
      }

      const newSchedule = {
        field: fieldId,
        workingTime: {
          startDay: new Date(yearStart, monthStart, dayStart),
          endDay: new Date(yearEnd, monthEnd, dayEnd),
          repeat,
          workingInDay,
          note
        }
      }

      await Coach.findOneAndUpdate(
        req.coach.id,
        {
          $push: { fieldsRegistered: newSchedule }
        },
        { new: true }
      )

      res.status(200).json({ message: 'Thêm lịch làm thành công!' })
    } catch (error) {
      console.error(error.message)
      res.status(500).send('Server error')
    }
  }
)
module.exports = router
