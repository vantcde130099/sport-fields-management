const express = require('express')
const router = express.Router()

const Order = require('../../models/Orders')
const Field = require('../../models/Fields')
const Coach = require('../../models/Coaches')
const Item = require('../../models/Items')
const customer = require('../../middleware/customer')
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
    payment
  } = req.body
  const [day, month, year] = date.split('-')
  const [startHour, startMinute] = startRental.split(':')
  const [endHour, endMinute] = endRental.split(':')
  const start = new Date(year, month, day, startHour, startMinute)
  const end = new Date(year, month, day, endHour, endMinute)
  try {
    const field = await Field.findById(fieldId)
    if (!field) {
      return res.status(400).json({ message: 'Lỗi, sân này không tồn tại' })
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
      fieldPrice:
        (field.price * (end.getTime() - start.getTime())) / 60 / 60 / 1000,
      coachPrice: 0,
      itemsPrice: 0
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
      order.itemsPrice = itemsPrice
    }
    //total cost
    order.total = order.fieldPrice + order.coachPrice + order.itemsPrice

    //payment
    order.payment = payment

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
    //     field price: ${order.fieldPrice}
    //     coach price: ${order.coachPrice}
    //     item price: ${order.itemsPrice}
    //     total: ${order.total}
    //     payment: ${order.payment.method} - ${order.payment.status}
    // `)
    return res.status(200).json({ message: 'Đặt sân thành công.' })
  } catch (error) {
    console.error(error.message)
    return res.status(500).send('Lỗi server')
  }
})

module.exports = router
