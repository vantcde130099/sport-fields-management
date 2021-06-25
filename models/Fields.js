const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FieldSchema = new Schema({
  name: {
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
  price: {
    type: Number,
    required: true
  },
  hours: {
    open: {
      type: Number,
      required: true
    },
    close: {
      type: Number,
      required: true
    }
  },
  image: [
    {
      type: Schema.Types.ObjectId
    }
  ],
  status: {
    type: Boolean,
    default: true
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  dateModified: {
    type: Date
  }
})

module.exports = Fields = mongoose.model('field', FieldSchema)
