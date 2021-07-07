const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')

// middleware
const owner = require('../../middleware/owner')
const coach = require('../../middleware/coach')
const upload = require('../../middleware/upload')

// models
const Coach = require('../../models/Coaches')
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
  const open = openHour * 60 + openMinutes
  const close = closeHour * 60 + closeMinutes

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
      hours: { open, close },
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

// @route   GET /api/fields/time-generate-now
// @desc    Generate booking for customer for date now
// @access  Private
router.get('/booking-time-now', async (req, res) => {
  try {
    let timeWorkingADay = await Field.findById(req.body.fieldId, { hours: 1 })

    // const orderOnDay = Order.find()  //find order in day now

    //set time for open and close
    let open = new Date()
    open.setHours(
      timeWorkingADay.hours.open / 60,
      timeWorkingADay.hours.open % 60,
      00
    )

    let close = new Date()
    close.setHours(
      timeWorkingADay.hours.close / 60,
      timeWorkingADay.hours.close % 60,
      00
    )

    //generate hour booking
    let listHours = []
    for (
      let i = timeWorkingADay.hours.open;
      i, i <= timeWorkingADay.hours.close;
      i += 60
    ) {
      if (i > timeWorkingADay.hours.close - 60) break

      let close = new Date(open)

      close.setHours(close.getHours() + 1)

      listHours.push({
        start: `${open.getHours()}:${
          open.getMinutes() === 0 ? '00' : open.getMinutes()
        }`,
        end: `${close.getHours()}:${
          close.getMinutes() === 0 ? '00' : open.getMinutes()
        }`
      })
      open.setHours(open.getHours() + 1)
    }

    return res.status(200).json(listHours)
  } catch (error) {
    console.error(error.message)
    return res.status(500).send('Lỗi server')
  }
})

// @route   GET /api/fields/time-generate-by-day
// @desc    Generate booking for customer by day
// @access  Private
router.get('/booking-time-by-day', async (req, res) => {
  try {
    let timeWorkingADay = await Field.findById(req.query.fieldId, { hours: 1 })

    const dateArray = req.query.date.split('-')

    const [day, month, year] = dateArray

    //set time for open and close
    let open = new Date(year, month, day)
    open.setHours(
      timeWorkingADay.hours.open / 60,
      timeWorkingADay.hours.open % 60,
      00
    )

    let close = new Date(year, month, day)

    close.setHours(
      timeWorkingADay.hours.close / 60,
      timeWorkingADay.hours.close % 60,
      00
    )

    //generate hour booking
    let listHours = []

    for (
      let i = timeWorkingADay.hours.open;
      i, i <= timeWorkingADay.hours.close;
      i += 60
    ) {
      if (i > timeWorkingADay.hours.close - 60) break

      let close = new Date(open)

      close.setHours(close.getHours() + 1)

      listHours.push({
        start: `${open.getHours()}:${
          open.getMinutes() === 0 ? '00' : open.getMinutes()
        }`,
        end: `${close.getHours()}:${
          close.getMinutes() === 0 ? '00' : open.getMinutes()
        }`
      })

      open.setHours(open.getHours() + 1)
    }

    return res.status(200).json(listHours)
  } catch (error) {
    console.error(error.message)
    return res.status(500).send('Lỗi server')
  }
})

// @route   GET /api/fields/owner-get-fields
// @desc    Owner get fields info
// @access  Private
router.get('/owner-get-fields', owner, async (req, res) => {
  const ownerId = req.owner.id

  try {
    const owner = await Owner.findById(ownerId, { fields: 1 })

    if (owner.fields.length == 0) {
      return res.status(400).json({ message: 'Không có sân nào' })
    }

    const fields = await Field.find({ _id: { $in: owner.fields } })

    res.status(200).json(fields)
  } catch (error) {
    console.error(error.message)
    return res.status(500).send('Lỗi server')
  }
})

// @route   PUT /api/fields/info-modify
// @desc    Owner modify field info
// @access  Private
router.put(
  '/info-modify',
  owner,
  [
    check('name', 'Vui lòng nhập tên').not().isEmpty(),
    check('type', 'Vui lòng nhập tên').not().isEmpty(),
    check('price', 'Vui lòng nhập tên').isNumeric(),
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
    ).isInt({ min: 0, max: 59 })
  ],
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const {
      id,
      name,
      type,
      price,
      openHour,
      closeHour,
      openMinutes,
      closeMinutes,
      status
    } = req.body

    const open = openHour * 60 + openMinutes
    const close = closeHour * 60 + closeMinutes
    const hours = { open, close }

    try {
      let field = await Field.findOneAndUpdate(
        id,
        { name, 'type.fieldType': type, price, status, hours },
        { new: true }
      )

      res.status(200).json({ message: `Thay đổi thành công` })
    } catch (error) {
      console.error(error.message)
      return res.status(500).send('Lỗi server')
    }
  }
)

// @route   PUT /api/fields/add-images
// @desc    Owner modify field image
// @access  Private
router.put(
  '/add-images',
  owner,
  upload.array('image', 10),
  async (req, res) => {
    req.body = JSON.parse(req.body.data)

    const { id } = req.body

    try {
      let field = await Field.findById(id)

      //add images to field
      req.files.forEach((e) => {
        field.image.push(e.id)
      })

      field.save()

      res
        .status(200)
        .json({ message: `Thêm ${req.files.length} ảnh thành công.` })
    } catch (error) {
      console.error(error.message)
      return res.status(500).send('Lỗi server')
    }
  }
)
// @route   GET /api/fields/coach-register
// @desc    Generate field for coach can register in that city
// @access  Private
router.get('/coach-register', coach, async (req, res) => {
  try {
    const coach = await Coach.findById(req.coach.id, {
      'contact.address': 1,
      fieldsRegistered: 1
    })

    if (!coach) {
      return res.status(400).json({ message: 'Huấn luyện viên không tồn tại' })
    }

    const { city, district, ward } = coach.contact.address

    //khai báo list chủ sân
    let listOwners = null

    if (city && district && ward) {
      listOwners = await Owner.find(
        {
          'contact.address': coach.contact.address
        },
        {
          name: 1,
          booking: 1,
          contact: 1,
          brandName: 1,
          averageRating: 1,
          fieldSize: { $size: '$fields' }
        }
      ).sort({
        brandName: 1
      })
    } else if (city && district) {
      listOwners = await Owner.find(
        {
          'contact.address.city': city,
          'contact.address.district': district
        },
        {
          name: 1,
          booking: 1,
          contact: 1,
          averageRating: 1,
          fieldSize: { $size: '$fields' },
          brandName: 1,
          averageRating
        }
      ).sort({
        brandName: 1
      })
    } else if (city) {
      listOwners = await Owner.find(
        {
          'contact.address.city': city
        },
        {
          name: 1,
          booking: 1,
          contact: 1,
          averageRating: 1,
          fieldSize: { $size: '$fields' },
          brandName: 1,
          averageRating
        }
      ).sort({
        brandName: 1
      })
    } else {
      return res.status(400).json({
        message: `Huấn luyện viên ${coach.name} chưa nhập thông tin địa chỉ`
      })
    }

    //check empty list owner found
    if (listOwners == null) {
      return res.status(400).json({ msg: 'Không có sân' })
    }

    res.status(200).json({ listOwners })
  } catch (error) {
    console.error(error.message)
    return res.status(500).send('Lỗi server')
  }
})

module.exports = router
