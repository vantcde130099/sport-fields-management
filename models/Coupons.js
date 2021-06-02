const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    type: String,
    required: true
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
  quanlity: {
    type: Number
  },
  status: {
    type: Boolean,
    default: false
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

module.exports = Coupons = mongoose.model('coupon', CouponSchema);
