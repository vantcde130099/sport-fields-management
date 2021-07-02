const express = require('express')
const router = express.Router()
const config = require('config')
const { check, validationResult } = require('express-validator')

const Customer = require('../../models/Customers')
const customer = require('../../middleware/customer')
const Owner = require('../../models/Owners')
const owner = require('../../middleware/owner')
const Coach = require('../../models/Coaches')
const coach = require('../../middleware/coach')
const upload = require('../../middleware/upload')

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

module.exports = router
