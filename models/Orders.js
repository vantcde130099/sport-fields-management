const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "owner",
  },
  customer: {
    type: Schema.Types.ObjectId,
    ref: "customer",
  },
  field: {
    type: Schema.Types.ObjectId,
    ref: "field",
  },
  coach: {
    type: Schema.Types.ObjectId,
    ref: "coach",
  },
  item: {
    type: Schema.Types.ObjectId,
    ref: "item",
  },
  rentalDate: {
    type: Date,
    required: true,
  },
  start: {
    hour: {
      type: Number,
    },
    minutes: {
      type: Number,
    },
  },
  end: {
    hour: {
      type: Number,
    },
    minutes: {
      type: Number,
    },
  },
  totalTime: {
    type: Number,
  },
  fieldPrice: {
    type: Number,
  },
  coachPrice: {
    type: Number,
  },
  coupon: {
    type: String,
  },
  total: {
    type: Number,
  },
  payment: {
    method: {
      type: String,
    },
    status: {
      type: String,
    },
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  dateModified: {
    type: Date,
  },
});

module.exports = Orders = mongoose.model("order", OrderSchema);
