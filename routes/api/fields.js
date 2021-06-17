const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const { check, validationResult } = require('express-validator')

const owner = require('../../middleware/owner')
const upload = require('../../middleware/upload')

const Owner = require('../../models/Owners')
const Field = require('../../models/Fields')


// @route   POST /api/fields/add
// @desc    Owner add field
// @access  Private
router.post('/add', owner, upload.array('image', 10), async (req, res) => {
  req.body = JSON.parse(req.body.data)
  await check('name', 'Vui lòng nhập tên sân').not().isEmpty().run(req)
  await check('price', 'Vui lòng nhập tên giá sân/giờ').not().isEmpty().run(req)
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
    const owner = await Owner.findById(req.owner.id).select('-password')

    //get field if exist
    const existField = await Field.find({
      //get all fields of owner
      _id: { $in: owner.fields },
      name: name
    })
    if (existField.length > 0) {
      return res.status(400).json({ message: 'Trùng tên sân' })
    }

    const newField = new Field({
      name,
      type,
      price,
      close,
      open,
      status
    })

    //add images to field
    req.files.forEach((e) => {
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

// @route   GET /api/fields/
// @desc    Default get first field of owner
// @access  Private
router.get('/', async (req, res) => {
  try {
    const owner = await Owner.findById(req.body.ownerId)
    const fieldId = owner.fields[owner.fields.length - 1]
    const theFirstField = await Field.findById(fieldId)
    if (!theFirstField) {
      res.status(400).json({ message: 'Sân không tồn tại' })
    }
    res.status(200).json({
      sport: theFirstField.type.sportType,
      type: theFirstField.type.fieldType,
      image: theFirstField.image,
      status: theFirstField.status,
      name: theFirstField.name,
      price: theFirstField.price
    })
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Lỗi server')
  }
})

// @route   GET /api/fields/type
// @desc    Get field by type of owner
// @access  Private
router.get('/type', async (req, res) => {
  try {
    const owner = await Owner.findById(req.body.ownerId)

    const fields = await Field.find({
      // get all fields of owner and by type
      _id: { $in: owner.fields },
      type: req.body.type
    })
    if (!fields) {
      res.status(400).json({ message: 'Sân không tồn tại' })
    }

    //add info to block response
    let fieldsInfo = []
    fields.forEach((field) => {
      fieldsInfo.push({
        sport: field.type.sportType,
        type: field.type.fieldType,
        image: field.image,
        status: field.status,
        name: field.name,
        price: field.price
      })
    })
    res.status(200).json(fieldsInfo)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Lỗi server')
  }
})

// @route   GET /api/fields/name
// @desc    Get fields by name field of owner
// @access  Private
router.get('/name', async (req, res) => {
  try {
    const owner = await Owner.findById(req.body.ownerId)

    const field = await Field.findOne({
      // get field in owner with ?name
      _id: { $in: owner.fields },
      name: req.body.fieldName
    })

    if (!field) {
      res.status(400).json({ message: 'Sân không tồn tại' })
    }
    res.status(200).json({
      sport: field.type.sportType,
      type: field.type.fieldType,
      image: field.image,
      status: field.status,
      name: field.name,
      price: field.price
    })
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Lỗi server')
  }

})

module.exports = router
