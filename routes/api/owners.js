const express = require('express')
const router = express.Router()
const config = require('config')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')

const upload = require('../../middleware/upload')
const Owner = require('../../models/Owners')
const Field = require('../../models/Fields')
const { ObjectId } = require('bson')
const Fields = require('../../models/Fields')

// @route   POST /api/owner/register
// @desc    Register owner
// @access  Public
router.post('/register', upload.array('image', 2), async (req, res) => {
  req.body = JSON.parse(req.body.data)
  await check('name', 'Vui lòng nhập tên').not().isEmpty().run(req)
  await check('email', 'Vui lòng nhập email').isEmail().run(req)
  await check('password', 'Mật khẩu ít nhất 6 chữ')
  await check('brandName', 'Vui lòng nhập tên sân').not().isEmpty()
  await check('phoneNumber', 'Vui lòng nhập số điện thoại').not().isEmpty().run(req)

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
    description
  } = req.body
  const address = { city, district, ward }
  const contact = { email, phoneNumber, address }
  try {
    //see if owner exist
    let owner = await Owner.findOne({ 'contact.phoneNumber': phoneNumber })
    if (owner) {
      return res
        .status(400)
        .json({ errors: 'SĐT này đã tồn tại trong hệ thống' })
    }

    owner = new Owner({
      name,
      contact,
      description
    })
    //add identityCard Id to owner
    owner.identityCard = identityCard

    //Encrypt password
    const salt = await bcrypt.genSalt(10)
    owner.password = await bcrypt.hash(password, salt)

    await owner.save()

    //return jsonwebtoken
    const payload = {
      owner: {
        id: owner.id
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
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

// @route   POST owner/authenticate
// @desc    Authenticate owner & get token
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
      let owner = await Owner.findOne({ 'contact.phoneNumber': phoneNumber })
      if (!owner) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Thông tin không hợp lệ' }] })
      }

      const isMatch = await bcrypt.compare(password, owner.password)
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Thông tin không hợp lệ' }] })
      }

      //Return jwt
      const payload = {
        //the payload which inclube ownerId
        owner: {
          id: owner.id
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

// @route   POST /api/owners
// @desc    get all owners info order by dateCreated
// @access  Public
router.get('/', async (req, res) => {
  try {
    let infoBlock = []
    const listOwners = await Owner.find().sort({ dateCreated: -1 })

    if (listOwners.isEmpty) {
      return res.status(400).json({ msg: 'Không có sân' })
    }

    //filter owner have no field
    const fileteredOwner = await listOwners.filter(function (e) {
      return e.fields.length > 0
    })
    //add identityCard Id to owner
    owner.identityCard = identityCard

    for (const owner of fileteredOwner) {
      const fields = await Field.find({
        // get all fields of owner
        _id: { $in: owner.fields }
      })

      //get first imageId if exist
      var imageId = ''
      for (const field of fields) {
        if (field.image.length > 0) {
          imageId = field.image[0]
        } else if (imageId !== '') break
      }

      //list price from fields
      const listPrice = await fields.map((field) => field.price)

      //calculating average of rate
      let sumRating = 0
      const listRating = await owner.rate.map((rate) => rate.value)

      if (listRating.length > 0) {
        sumRating = listRating.reduce((accumulator, currentValue) => {
          return accumulator + currentValue
        })
      }

      let info = {
        ownerId: owner.id,
        name: owner.name,
        address: owner.contact.address,
        price: Math.min(...listPrice),
        imageId,
        description: owner.description,
        rate:
          sumRating != 0
            ? sumRating / listRating.length
            : 'Chưa có đánh giá nào'
      }

      infoBlock.push(info)
    }
    return res.status(200).json({ infoBlock })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Lỗi server')
  }
})

// @route   GET /api/owner
// @desc    get all fields by location
// @access  Public
router.get('/location', async (req, res) => {
  const { city, district, ward } = req.body

  try {
    let infoBlock = []

    let listOwners

    if (city && district && ward) {
      listOwners = await Owner.find({ 'contact.address': req.body }).sort({
        dateCreated: -1
      })
    } else if (city && district) {
      listOwners = await Owner.find({
        'contact.address.city': req.body.city,
        'contact.address.district': req.body.district
      }).sort({ dateCreated: -1 })
    } else if (city) {
      listOwners = await Owner.find({
        'contact.address.city': req.body.city
      }).sort({ dateCreated: -1 })
    }

    //check empty list owner found
    if (listOwners.isEmpty) {
      return res.status(400).json({ msg: 'Không có sân' })
    }

    //filter owner have no field
    const fileteredOwner = await listOwners.filter(function (e) {
      return e.fields.length > 0
    })

    for (const owner of fileteredOwner) {
      // const field = await Field.findById(owner.fields[0]) // find field by id from owner
      const fields = await Field.find({
        // get all fields of owner
        _id: { $in: owner.fields }
      })

      //get first imageId if exist
      var imageId = ''
      for (const field of fields) {
        if (field.image.length > 0) {
          imageId = field.image[0]
        }
        if (imageId !== '') break
      }

      const listPrice = await fields.map((field) => field.price) //list price from fields

      let info = {
        ownerId: owner.id,
        name: owner.name,
        address: owner.contact.address,
        price: Math.min(...listPrice),
        imageId,
        description: owner.description,
        rate: owner.rate.value
      }

      infoBlock.push(info)
    }
    return res.status(200).json({ infoBlock })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Lỗi server')
  }
})

// @route   POST /api/owners/name
// @desc    get all owners by name
// @access  Public
router.get('/name', async (req, res) => {
  try {
    let infoBlock = []

    const listOwners = await Owner.find({
      name: { $regex: `.*${req.body.name}.*` }
    }).sort({ dateCreated: -1 })

    if (listOwners.isEmpty) {
      return res.status(400).json({ msg: 'Không có sân' })
    }

    //filter owner have no field
    const fileteredOwner = await listOwners.filter(function (e) {
      return e.fields.length > 0
    })

    for (const owner of fileteredOwner) {
      // find field by id from owner
      const fields = await Field.find({
        // get all fields of owner
        _id: { $in: owner.fields }
      })

      //get first imageId if exist
      var imageId = ''

      for (const field of fields) {
        if (field.image.length > 0) {
          imageId = field.image[0]
        } else if (imageId !== '') break
      }

      const listPrice = await fields.map((field) => field.price) //list price from fields

      let info = {
        ownerId: owner.id,
        name: owner.name,
        address: owner.contact.address,
        price: Math.min(...listPrice),
        imageId,
        description: owner.description,
        rate: owner.rate.value
      }

      infoBlock.push(info)
    }
    return res.status(200).json({ infoBlock })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Lỗi server')
  }
})

// @route   POST /api/owners/type
// @desc    get all owners by type
// @access  Public
router.get('/type', async (req, res) => {
  const type = req.body
  try {
    let infoBlock = []
    let listFields

    //find field by type
    if (type.sportType && type.fieldType) {
      listFields = await Fields.find({ type })
    } else if (type.sportType !== 'undefined') {
      listFields = await Fields.find({ 'type.sportType': type.sportType })
    }

    //find owners with field id
    let listOwners = []

    for (const field of listFields) {
      let owner = await Owner.findOne({ fields: field.id }).sort({
        dateCreated: -1
      })
      if (!listOwners.includes(owner)) {
        listOwners.push(owner)
      }
    }

    //filter owner have no field
    const filteredOwner = await listOwners.filter(function (e) {
      return e.fields.length > 0
    })

    //get info
    for (const owner of filteredOwner) {
      const fields = await Field.find({
        // get all fields of owner
        _id: { $in: owner.fields }
      })

      //get first imageId if exist
      var imageId = ''

      for (const field of fields) {
        if (field.image.length > 0) {
          imageId = field.image[0]
        }
        if (imageId !== '') break
      }

      const listPrice = await fields.map((field) => field.price) //list price from fields

      let info = {
        ownerId: owner.id,
        name: owner.name,
        address: owner.contact.address,
        price: Math.min(...listPrice),
        imageId,
        description: owner.description,
        rate: owner.rate.value
      }

      infoBlock.push(info)
    }
    return res.status(200).json({ infoBlock })
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Lỗi server')
  }
})

module.exports = router
