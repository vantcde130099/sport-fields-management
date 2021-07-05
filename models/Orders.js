const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrderSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'owner'
  },
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'customer'
  },
  field: {
    type: Schema.Types.ObjectId,
    ref: 'field'
  },
  coach: {
    type: Schema.Types.ObjectId,
    ref: 'coach'
  },
  items: [
    {
      id: {
        type: Schema.Types.ObjectId,
        ref: 'item'
      },
      quantity: {
        type: Number
      }
    }
  ],
  rentalDate: {
    type: Date,
    required: true
  },
  start: {
    type: Date
  },
  end: {
    type: Date
  },
  totalTime: {
    type: Number
  },
  fieldPrice: {
    type: Number
  },
  coachPrice: {
    type: Number
  },
  itemsPrice: {
    type: Number
  },
  coupon: {
    type: Schema.Types.ObjectId,
    ref: 'coupon'
  },
  total: {
    type: Number
  },
  payment: {
    method: {
      type: String,
      enum: ['Thanh toán tại chỗ', 'Online']
    },
    status: {
      type: Boolean
    }
  },
  status: {
    type: String,
    enum: ['Chờ thanh toán', 'Hoàn thành', 'Hủy']
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  dateModified: {
    type: Date
  }
})

module.exports = Orders = mongoose.model('order', OrderSchema)
