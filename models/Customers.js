const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CustomerSchema = new Schema({
  googleId: {
    type: String
  },
  facebookId: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  contact: {
    phoneNumber: {
      type: String
    },
    email: {
      type: String
    },
    address: {
      city: {
        type: String,
        require: true
      },
      district: {
        type: String,
        require: true
      },
      ward: {
        type: String,
        require: true
      }
    }
  },
  password: {
    type: String
  },
  dateOfBirth: {
    type: Date
  },
  avatar: {
    type: String,
    default: 'https://www.amongusavatarcreator.com/assets/img/main/icon.png'
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

module.exports = Customers = mongoose.model('customer', CustomerSchema)
