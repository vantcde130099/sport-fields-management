const express = require('express')
const router = express.Router()

const { check, checkSchema, validationResult } = require('express-validator')

const owner = require('../../middleware/owner')
const upload = require('../../middleware/upload')

const Owner = require('../../models/Owners')
const Field = require('../../models/Fields')

// @route   POST /api/fields/add
// @desc    Owner add field
// @access  Private
router.post('/add', owner, upload.array('image', 10), async (req, res) => {
  req.body = JSON.parse(req.body.data)
  await check('name', 'Vui lòng nhập tên sân')
    .not()
    .isEmpty()
    .run(req)
  await check('price', 'Vui lòng nhập tên giá sân/giờ')
    .not()
    .isEmpty()
    .run(req)
  await check('openHour', 'Vui lòng nhập giờ mở cửa lớn hơn 0 và nhỏ hơn 24!')
    .isInt({ min: 0, max: 23 })
    .run(req)
  await check(
    'closeHour',
    'Vui lòng nhập giờ đóng cửa lớn hơn 0 và nhỏ hơn 24!'
  )
    .isInt({ min: 0, max: 23 })
    .run(req)
  await check(
    'closeMinutes',
    'Vui lòng nhập phút đóng cửa lớn hơn 0 và nhỏ hơn 59!'
  )
    .isInt({ min: 0, max: 59 })
    .run(req)
  await check(
    'openMinutes',
    'Vui lòng nhập phút đóng cửa lớn hơn 0 và nhỏ hơn 59!'
  )
    .isInt({ min: 0, max: 59 })
    .run(req)
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const {
    name,
    sportType,
    fieldType,
    price,
    openHour,
    closeHour,
    openMinutes,
    closeMinutes,
    status
  } = req.body
  const type = { sportType, fieldType }
  const open = { hour: openHour, minutes: openMinutes }
  const close = { hour: closeHour, minutes: closeMinutes }
  try {
    let existField = await Field.findOne({ name: name })
    if (existField) {
      return res.status(400).json({ message: 'Trùng tên sân' })
    }

    const owner = await Owner.findById(req.owner.id).select('-password')
    const newField = new Field({
      name,
      type,
      price,
      close,
      open,
      status
    })

    //add images to field
    req.files.forEach(e => {
      newField.image.push(e.id)
    })

    await newField.save()

    owner.fields.push(newField.id)

    await owner.save()

    res.status(200).json({
      message: `Thêm thành công sân ${newField.name}`
    })
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Lỗi server')
  }
})

module.exports = router
