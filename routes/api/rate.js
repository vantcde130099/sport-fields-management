const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')

const Owner = require('../../models/Owners')
const Coach = require('../../models/Coaches')
const Customer = require('../../models/Customers')
const Order = require('../../models/Orders')
const customer = require('../../middleware/customer')
const owner = require('../../middleware/owner')

// @route   POST /api/rate/owner
// @desc    Customer rate owner
// @access  Private
router.post(
  '/owner',
  customer,
  [check('value', 'Vui lòng chọn đánh giá').not().isEmpty()],
  async (req, res) => {
    const { orderId, value, text } = req.body

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      //check payment
      const order = await Order.findById(orderId)
      if (order.payment.status === false) {
        return res.status(400).json({ message: 'Hóa đơn chưa thanh toán' })
      }

      //check customer exist
      const customer = await Customer.findById(req.customer.id)

      if (!customer) {
        return res
          .status(400)
          .json({ message: 'Lỗi, khách hàng không tồn tại' })
      }

      //check owner exist
      const ownerRate = await Owner.findById(order.owner, {
        rate: 1,
        brandName: 1
      })

      if (!ownerRate) {
        return res.status(400).json({ message: 'Sân không tồn tại' })
      }

      ownerRate.rate.push({ customer: customer.id, value, text })

      //calculate rate
      let sumRating = 0

      const listRating = await ownerRate.rate.map((rate) => rate.value)

      if (listRating.length > 0) {
        sumRating = listRating.reduce((accumulator, currentValue) => {
          return accumulator + currentValue
        })
      }

      ownerRate.averageRating =
        sumRating != 0 ? sumRating / listRating.length : 0

      await ownerRate.save()

      return res
        .status(200)
        .json({ message: `Đánh giá thành công ${ownerRate.brandName}` })
    } catch (error) {
      console.error(error.message)
      return res.status(500).json({ message: 'Lỗi server' })
    }
  }
)

// @route   POST /api/rate/coach
// @desc    Customer rate coach
// @access  Private
router.post(
  '/coach',
  customer,
  [check('value', 'Vui lòng chọn đánh giá').not().isEmpty()],
  async (req, res) => {
    const { orderId, value, text } = req.body

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    try {
      //check payment
      const order = await Order.findById(orderId)
      if (order.payment.status === false) {
        return res.status(400).json({ message: 'Hóa đơn chưa thanh toán' })
      }

      //check customer exist
      const customer = await Customer.findById(req.customer.id)
      if (!customer) {
        return res
          .status(400)
          .json({ message: 'Lỗi, khách hàng không tồn tại' })
      }

      //check owner exist
      const coachRate = await Coach.findById(order.coach)
      if (!coachRate) {
        return res
          .status(400)
          .json({ message: 'Huấn luyện viên không tồn tại' })
      }

      coachRate.rate.push({ customer: customer.id, value, text })

      //calculate rate
      let sumRating = 0

      const listRating = await coachRate.rate.map((rate) => rate.value)

      if (listRating.length > 0) {
        sumRating = listRating.reduce((accumulator, currentValue) => {
          return accumulator + currentValue
        })
      }

      coachRate.averageRating =
        sumRating != 0 ? sumRating / listRating.length : 0

      await coachRate.save()

      return res
        .status(200)
        .json({ message: `Đánh giá thành công ${coachRate.name}` })
    } catch (error) {
      console.error(error.message)
      return res.status(500).json({ message: 'Lỗi server' })
    }
  }
)

// @route   GET /api/rate/owner
// @desc    Customer get owner's rating
// @access  Private
router.get('/owner', async (req, res) => {
  const { id } = req.query

  try {
    const owner = await Owner.findById(id, { averageRating: 1, rate: 1 })

    if (!owner) {
      return res.status(400).json({ message: 'Không tồn tại owner' })
    }

    if (owner.rate.length == 0) {
      return res.status(400).json({ message: 'Chưa có đánh giá nào' })
    }

    res.status(200).json({ owner })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({ message: 'Lỗi server' })
  }
})

// @route   GET /api/rate/coach
// @desc    Customer get coach's rating
// @access  Private
router.get('/coach', async (req, res) => {
  const { id } = req.query

  try {
    const coach = await Coach.findById(id, { averageRating: 1, rate: 1 })

    if (!coach) {
      return res.status(400).json({ message: 'Lỗi, không tồn tại coach' })
    }

    if (coach.rate.length == 0) {
      return res.status(400).json({ message: 'Chưa có đánh giá nào' })
    }

    res.status(200).json({ coach })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({ message: 'Lỗi server' })
  }
})

module.exports = router
