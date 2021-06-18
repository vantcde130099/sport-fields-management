const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CouponSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'owner'
  },
  code: {
    type: String,
    required: true
  },
  type: {
    sportType: {
      type: String,
      enum: ['Bóng đá', 'Bóng rổ']
    },
    fieldType: {
      type: String
    }
  },
  discount: {
    type: Number,
    required: true
  },
  timeStart: {
    type: Date
  },
  timeEnd: {
    type: Date
  },
  quantity: {
    type: Number
  },
  status: {
    type: Boolean,
    default: true
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
})

module.exports = Coupons = mongoose.model('coupon', CouponSchema)
