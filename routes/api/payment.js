const express = require('express')
const router = express.Router()

const Order = require('../../models/Orders')
const Owner = require('../../models/Owners')
const Coach = require('../../models/Coaches')
const Customer = require('../../models/Customers')
const customer = require('../../middleware/customer')
const owner = require('../../middleware/owner')

// @route   PUT api/payment/offline
// @desc    choose method offline
// @access  Private
router.put('/offline', customer, async (req, res) => {
  const { orderId, payment } = req.body

  try {
    const existCustomerId = await Customer.findById(req.customer.id, { _id: 1 })

    if (!existCustomerId) {
      return res.status(400).json({ message: 'Người dùng không tồn tại' })
    }

    const customerIdOrder = await Order.findById(orderId, {
      _id: 0,
      customer: 1
    })

    //check order own customer
    if (existCustomerId._id.equals(customerIdOrder.customer) == false) {
      return res.status(400).json({ message: 'Không phải hóa đơn của bạn' })
    }

    let order = await Order.findOneAndUpdate(
      { _id: orderId },
      { payment: payment, status: 'Chờ thanh toán' },
      { new: true }
    )

    res
      .status(200)
      .json({ message: 'Thành công! Vui lòng nhận sân trước 15 phút.' })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({ message: 'Lỗi server' })
  }
})

// @route   PUT api/payment/offline/confirm
// @desc    Owner comfirm pay offline
// @access  Private
router.put('/offline/confirm', owner, async (req, res) => {
  const { orderId, status } = req.body

  try {
    const existOwnerId = await Owner.findById(req.owner.id, { _id: 1 })

    if (!existOwnerId) {
      return res.status(400).json({ message: 'Chủ sân không tồn tại' })
    }

    const ownerIdOrder = await Order.findById(orderId, {
      _id: 0,
      owner: 1
    })

    //check order own customer
    if (existOwnerId._id.equals(ownerIdOrder.owner) == false) {
      return res.status(400).json({ message: 'Không phải hóa đơn của bạn' })
    }

    const order = await Order.findOneAndUpdate(
      { _id: orderId },
      {
        status: status,
        'payment.status': status == 'Hoàn thành' ? true : false
      },
      { new: true }
    )

    if (status == 'Hoàn thành') {
      await Owner.findOneAndUpdate(
        { _id: order.owner },
        { $inc: { bookings: 1 } },
        { new: true }
      )
      if (order.coach != undefined || order.coach != 'None') {
        await Coach.findOneAndUpdate(
          { _id: order.coach },
          { $inc: { bookings: 1 } },
          { new: true }
        )
      }
    }
    res.status(200).json({ message: `Đã ${order.status} thanh toán` })
  } catch (error) {
    console.error(error.message)
    return res.status(500).send('Lỗi server')
  }
})

module.exports = router
