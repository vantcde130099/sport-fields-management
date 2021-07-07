const express = require('express')
const router = express.Router()
const config = require('config')
const { check, validationResult } = require('express-validator')

// middleware
const customer = require('../../middleware/customer')
const owner = require('../../middleware/owner')
const coach = require('../../middleware/coach')
const upload = require('../../middleware/upload')

// models
const Customer = require('../../models/Customers')
const Owner = require('../../models/Owners')
const Coach = require('../../models/Coaches')

// @route   GET api/profile/customer
// @desc    Customer get profile
// @access  Private
router.get('/customer', customer, async (req, res) => {
  try {
    const customer = await Customer.findById(req.customer.id, {
      name: 1,
      contact: 1,
      dateOfBirth: 1,
      avatar: 1,
      dateCreated: 1
    })

    if (!customer) {
      return res.status(400).json({ message: 'Lỗi, không tìm ra thông tin' })
    }

    res.status(200).json(customer)
  } catch (error) {
    console.error(error.message)
    return res.status(500).send('Lỗi server')
  }
})

// @route   GET api/profile/owner
// @desc    Owner get profile
// @access  Private
router.get('/owner', owner, async (req, res) => {
  try {
    const owner = await Owner.findById(req.owner.id, {
      name: 1,
      contact: 1,
      dateOfBirth: 1,
      brandName: 1,
      identityCard: 1,
      fields: 1,
      rate: 1,
      booking: 1,
      description: 1,
      dateCreated: 1
    })

    if (!owner) {
      return res.status(400).json({ message: 'Lỗi, không tìm ra thông tin' })
    }

    res.status(200).json(owner)
  } catch (error) {
    console.error(error.message)
    return res.status(500).send('Lỗi server')
  }
})

// @route   GET api/profile/coach
// @desc    Coach get profile
// @access  Private
router.get('/coach', coach, async (req, res) => {
  try {
    const coach = await Coach.findById(req.coach.id, {
      name: 1,
      contact: 1,
      dateOfBirth: 1,
      avatar: 1,
      identityCard: 1,
      price: 1,
      rate: 1,
      booking: 1,
      description: 1,
      dateCreated: 1
    })

    if (!coach) {
      return res.status(400).json({ message: 'Lỗi, không tìm ra thông tin' })
    }

    res.status(200).json(coach)
  } catch (error) {
    console.error(error.message)
    return res.status(500).send('Lỗi server')
  }
})

// @route   PUT api/profile/customer
// @desc    Customer update info
// @access  Private
router.put(
  '/customer',
  customer,
  [
    check('phoneNumber', 'Vui lòng nhập đúng số điện thoại').matches(
      /(84|0[3|5|7|8|9])+([0-9]{8})\b/
    ),
    check('address.city', 'Vui lòng nhập thành phố').not().isEmpty(),
    check('address.district', 'Vui lòng nhập quận').not().isEmpty(),
    check('address.ward', 'Vui lòng nhập phường').not().isEmpty(),
    check('email', 'Vui lòng nhập email').isEmail()
  ],
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { phoneNumber, address, email } = req.body

    try {
      const updateCustomer = await Customer.findOneAndUpdate(
        { _id: req.customer.id },
        {
          $set: {
            'contact.phoneNumber': phoneNumber,
            'contact.address.city': address.city,
            'contact.address.district': address.district,
            'contact.address.ward': address.ward,
            'contact.email': email
          }
        },
        { new: true }
      )

      res
        .status(200)
        .json({ message: `Thay đổi thành công ${updateCustomer.name}` })
    } catch (error) {
      console.error(error)
      return res.status(500).json('Lỗi server')
    }
  }
)

// @route   PUT api/profile/customer/avatar
// @desc    Customer update avatar
// @access  Private
router.put(
  '/customer/avatar',
  customer,
  upload.single('image'),
  async (req, res) => {
    try {
      const avatar = req.file.id
      await Customer.findOneAndUpdate(
        { _id: req.customer.id },
        { avatar: avatar },
        { new: true }
      )

      res.status(200).json({ message: 'Thay đổi thành công' })
    } catch (error) {
      console.error(error.message)
      return res.status(500).json('Lỗi server')
    }
  }
)

// @route   PUT api/profile/owner
// @desc    Owner update info
// @access  Private
router.put(
  '/owner',
  owner,
  [
    check('phoneNumber', 'Vui lòng nhập đúng số điện thoại').matches(
      /(84|0[3|5|7|8|9])+([0-9]{8})\b/
    ),
    check('address.city', 'Vui lòng nhập thành phố').not().isEmpty(),
    check('address.district', 'Vui lòng nhập quận').not().isEmpty(),
    check('address.ward', 'Vui lòng nhập phường').not().isEmpty(),
    check('brandName', 'Vui lòng không để trống').not().isEmpty(),
    check('description', 'Vui lòng không để trống').not().isEmpty(),
    check('email', 'Vui lòng nhập email').isEmail()
  ],
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { name, phoneNumber, address, email, description } = req.body

    try {
      const updateOwner = await Owner.findOneAndUpdate(
        { _id: req.owner.id },
        {
          $set: {
            'contact.phoneNumber': phoneNumber,
            'contact.address.city': address.city,
            'contact.address.district': address.district,
            'contact.address.ward': address.ward,
            'contact.email': email,
            description,
            name,
            brandName
          }
        },
        { new: true }
      )

      res
        .status(200)
        .json({ message: `Thay đổi thành công ${updateOwner.name}` })
    } catch (error) {
      console.error(error)
      return res.status(500).json('Lỗi server')
    }
  }
)

// @route   PUT api/profile/coach
// @desc    Coach update info
// @access  Private
router.put(
  '/coach',
  coach,
  [
    check('phoneNumber', 'Vui lòng nhập đúng số điện thoại').matches(
      /(84|0[3|5|7|8|9])+([0-9]{8})\b/
    ),
    check('address.city', 'Vui lòng nhập thành phố').not().isEmpty(),
    check('address.district', 'Vui lòng nhập quận').not().isEmpty(),
    check('address.ward', 'Vui lòng nhập phường').not().isEmpty(),
    check('price', 'Vui lòng nhập số').isNumeric(),
    check('description', 'Vui lòng không để trống').not().isEmpty(),
    check('email', 'Vui lòng nhập email').isEmail()
  ],
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { name, phoneNumber, address, email, description, price } = req.body

    try {
      const updateCoach = await Coach.findOneAndUpdate(
        { _id: req.coach.id },
        {
          $set: {
            'contact.phoneNumber': phoneNumber,
            'contact.address.city': address.city,
            'contact.address.district': address.district,
            'contact.address.ward': address.ward,
            'contact.email': email,
            description,
            name,
            price
          }
        },
        { new: true }
      )

      res
        .status(200)
        .json({ message: `Thay đổi thành công ${updateCoach.name}` })
    } catch (error) {
      console.error(error)
      return res.status(500).json('Lỗi server')
    }
  }
)

// @route   PUT api/profile/coach/avatar
// @desc    Coach update avatar
// @access  Private
router.put('/coach/avatar', coach, upload.single('image'), async (req, res) => {
  try {
    const avatar = req.file.id

    await Coach.findOneAndUpdate(
      { _id: req.coach.id },
      { avatar: avatar },
      { new: true }
    )

    res.status(200).json({ message: 'Thay đổi thành công' })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json('Lỗi server')
  }
})

module.exports = router
