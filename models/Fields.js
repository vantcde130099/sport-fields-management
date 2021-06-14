const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FieldSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    sportType: {
      type: String,
      enum: ["Bóng đá", "Bóng rổ"],
    },
    fieldType: {
      type: String,
    },
  },
  price: {
    type: Number,
    required: true,
  },
  open: {
    hour: {
      type: Number,
      default: 6,
    },
    minutes: {
      type: Number,
      default: 0,
    },
  },
  close: {
    hour: {
      type: Number,
      default: 22,
    },
    minutes: {
      type: Number,
      default: 0,
    },
  },
  image: [
    {
      type: Schema.Types.ObjectId,
    },
  ],
  status: {
    type: Boolean,
    default: true,
  },
  bookings: {
    type: Number,
    default: 0,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  dateModified: {
    type: Date,
  },
});

module.exports = Fields = mongoose.model("field", FieldSchema);
