const express = require('express')
const router = express.Router()

// models
const Order = require('../../models/Orders')
const Field = require('../../models/Fields')
const Owner = require('../../models/Owners')
const Coach = require('../../models/Coaches')
const Item = require('../../models/Items')
const Coupon = require('../../models/Coupons')

// middleware
const customer = require('../../middleware/customer')
const owner = require('../../middleware/owner')

// @route   POST api/orders/create
// @desc    create order
// @access  Private
router.post('/create', customer, async (req, res) => {
  const {
    fieldId,
    ownerId,
    coachId,
    items,
    date,
    startRental,
    endRental,
    code
  } = req.body

  const [day, month, year] = date.split('-')
  const [startHour, startMinute] = startRental.split(':')
  const [endHour, endMinute] = endRental.split(':')
  const start = new Date(year, month, day, startHour, startMinute)
  const end = new Date(year, month, day, endHour, endMinute)
  const today = new Date()
  const current = today.getHours() * 60 + today.getMinutes()

  try {
    const field = await Field.findById(fieldId)
    if (!field) {
      return res.status(400).json({ message: 'Lỗi, sân này không tồn tại' })
    }

    const owner = await Owner.findById(ownerId)
    if (!owner) {
      return res.status(400).json({ message: 'Lỗi, sân này không tồn tại' })
    }

    //check code
    let existCoupon = null
    if (code && code.trim() !== '') {
      existCoupon = await Coupon.findOne({ code })
      if (existCoupon === null) {
        return res.status(400).json({ message: 'Coupon này không tồn tại' })
      }

      //check owner
      if (existCoupon.owner.equals(ownerId) == false) {
        return res.status(400).json({ message: 'Coupon này không đúng' })
      }

      //check type
      if (
        existCoupon.type.sportType !== field.type.sportType ||
        field.type.fieldType !== existCoupon.type.fieldType
      ) {
        return res
          .status(400)
          .json({ message: 'Coupon này ko thể áp dụng cho sân này' })
      }

      //check status
      if (existCoupon.status === false) {
        if (existCoupon.quantity == 0) {
          return res
            .status(400)
            .json({ message: 'Coupon này đã được sử dụng hết' })
        } else {
          return res.status(400).json({
            message: 'Coupon này đã quá hạn hoặc chưa tới ngày sử dụng'
          })
        }
      }

      //check in day active
      if (current < existCoupon.inDayOpen || current > existCoupon.inDayClose) {
        return res
          .status(400)
          .json({ message: 'Coupon không áp dụng thời gian này' })
      }

      //- coupon quantity if used
      existCoupon.quantity--
      if (existCoupon.quantity == 0) {
        exist.status == false
      }
      await existCoupon.save()
    }

    //create new order
    const order = await new Order({
      customer: req.customer.id,
      field: fieldId,
      owner: ownerId,
      rentalDate: new Date(year, month, day),
      start,
      end,
      totalTime: (end.getTime() - start.getTime()) / 60 / 60 / 1000, //milisecond to hour
      coupon: existCoupon !== null ? existCoupon.id : null,
      fieldPrice: Math.round(
        (field.price *
          (end.getTime() - start.getTime()) *
          (existCoupon !== null ? 1 - existCoupon.discount / 100 : 1)) / //check if has coupon
          60 /
          60 /
          1000
      ),
      coachPrice: 0,
      itemsPrice: 0,
      status: 'Chờ thanh toán'
    })

    //check coach execute
    const coach = coachId ? await Coach.findById(coachId) : 'None'
    if (coach !== 'None') {
      order.coach = coach.id
      order.coachPrice = coach.price * order.totalTime
    }

    //check item execute
    let itemsPrice = 0
    if (items && items.length > 0) {
      order.items = items
      for (let i = 0; i < items.length; i++) {
        const itemFinding = await Item.findById(items[i].id)
        itemsPrice += itemFinding.price * items[i].quantity
      }
      order.items = items
      order.itemsPrice = itemsPrice
    }

    //total cost
    order.total = order.fieldPrice + order.coachPrice + order.itemsPrice

    //save to DB
    await order.save()

    // console.log(`
    //     customer: ${order.customer}
    //     field: ${order.field}
    //     owner: ${order.owner}
    //     coach: ${order.coach}
    //     items: ${order.items}
    //     rental date: ${order.rentalDate.getDay()}-${order.rentalDate.getMonth()}-${order.rentalDate.getFullYear()}
    //     start: ${order.start.getHours()}:${order.start.getMinutes()},
    //     end: ${order.end.getHours()}:${order.end.getMinutes()}
    //     total time: ${order.totalTime}
    //     coupon: ${existCoupon ? existCoupon.code : null}
    //     field price: ${order.fieldPrice}
    //     coach price: ${order.coachPrice}
    //     item price: ${order.itemsPrice}
    //     total: ${order.total}
    // `)

    return res.status(200).json({ message: 'Đặt sân thành công.' })
  } catch (error) {
    console.error(error.message)
    return res.status(500).send('Lỗi server')
  }
})

// @route   GET api/orders/owner
// @desc    Owner see their info booking
// @access  Private
router.get('/owner', owner, async (req, res) => {
  try {
    const orders = await Order.find({ owner: req.owner.id }).sort({
      dateCreated: -1
    })

    if (orders == undefined || orders.length == 0) {
      return res.status(400).json({ message: 'Không có thông tin đặt sân.' })
    }

    res.status(200).json(orders)
  } catch (error) {
    console.error(error.message)
    return res.status(500).send('Lỗi server')
  }
})

module.exports = router
