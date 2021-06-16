const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ItemSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  price: {
    type: Number
  },
  quantity: {
    type: Number
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  dateModified: {
    type: Date,
    default: Date.now
  }
})

module.exports = Items = mongoose.model('item', ItemSchema)
