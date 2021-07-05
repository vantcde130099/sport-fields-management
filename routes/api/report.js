const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')

// models
const Order = require('../../models/Orders')
const Field = require('../../models/Fields')
const Owner = require('../../models/Owners')
const Coach = require('../../models/Coaches')
const Item = require('../../models/Items')
const Coupon = require('../../models/Coupons')

// middleware
const coach = require('../../middleware/coach')
const owner = require('../../middleware/owner')

// @route   GET api/report/owner
// @desc    owner get report
// @access  Private
router.get(
  '/owner',
  owner,
  [
    check('from', 'Vui lòng nhập ngày bắt đầu').notEmpty(),
    check('to', 'Vui lòng nhập ngày kết thúc').notEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { from, to } = req.body

    const [dayFrom, monthFrom, yearFrom] = from.split('-')
    const [dayTo, monthTo, yearTo] = to.split('-')

    const fromDate = new Date(yearFrom, monthFrom, dayFrom)
    const endDate = new Date(yearTo, monthTo, dayTo)
    try {
      const revenue = await Order.find(
        {
          owner: req.owner.id,
          rentalDate: { $gte: fromDate },
          rentalDate: { $lte: endDate },
          'payment.status': true
        },
        {
          field: 1,
          items: 1,
          rentalDate: 1,
          start: 1,
          end: 1,
          totalTime: 1,
          fieldPrice: 1,
          itemsPrice: 1,
          coupon: 1
        }
      ).sort({ rentalDate: -1 })

      res.status(200).json({ revenue })
    } catch (error) {
      console.error(error.message)
      return res.status(500).send('Lỗi server')
    }
  }
)

// @route   GET api/report/coach
// @desc    coach get report
// @access  Private
router.get(
  '/coach',
  coach,
  [
    check('from', 'Vui lòng nhập ngày bắt đầu').notEmpty(),
    check('to', 'Vui lòng nhập ngày kết thúc').notEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { from, to } = req.body

    const [dayFrom, monthFrom, yearFrom] = from.split('-')
    const [dayTo, monthTo, yearTo] = to.split('-')

    const fromDate = new Date(yearFrom, monthFrom, dayFrom)
    const endDate = new Date(yearTo, monthTo, dayTo)
    try {
      const revenue = await Order.find(
        {
          coach: req.coach.id,
          rentalDate: { $gte: fromDate },
          rentalDate: { $lte: endDate },
          'payment.status': true
        },
        {
          coach: 1,
          rentalDate: 1,
          start: 1,
          end: 1,
          totalTime: 1,
          coachPrice: 1,
          coupon: 1
        }
      ).sort({ rentalDate: -1 })

      res.status(200).json({ revenue })
    } catch (error) {
      console.error(error.message)
      return res.status(500).send('Lỗi server')
    }
  }
)

module.exports = router
