const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  contact: {
    phoneNumber: {
      type: String,
      require: true
    },
    email: {
      type: String,
      require: true
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
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  avatar: {
    type: String,
    default: 'https://www.amongusavatarcreator.com/assets/img/main/icon.png'
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

module.exports = Customers = mongoose.model('customer', CustomerSchema);
