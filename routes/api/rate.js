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
      const coachRate = await Owner.findById(order.owner)

      if (!coachRate) {
        return res.status(400).json({ message: 'Sân không tồn tại' })
      }

      coachRate.rate.push({ customer: customer.id, value, text })

      await coachRate.save()

      return res
        .status(200)
        .json({ message: `Đánh giá thành công ${coachRate.brandName}` })
    } catch (error) {
      console.error(error.message)
      return res.status(500).json({ message: 'Lỗi server' })
    }
  }
)

// @route   POST /api/rate
// @desc    Customer rate owner
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

module.exports = router
