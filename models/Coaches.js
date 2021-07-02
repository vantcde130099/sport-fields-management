const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CoachSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  dateOfBirth: {
    type: Date
  },
  password: {
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
  fieldsRegistered: [
    {
      field: {
        type: Schema.Types.ObjectId,
        ref: 'field'
      },
      startTime: {
        hour: {
          type: Number
        },
        miutes: {
          type: Number
        }
      }
    }
  ],
  price: {
    type: Number
  },
  rate: [
    {
      customer: {
        type: Schema.Types.ObjectId,
        ref: 'customer'
      },
      rateValue: {
        type: Number
      },
      text: {
        type: String
      },
      dateCreated: {
        type: Date,
        default: Date.now
      }
    }
  ],
  averageRating: {
    type: Number,
    default: 0,
    max: 5
  },
  booking: {
    type: Number,
    default: 0
  },
  description: {
    type: String
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
})

module.exports = Coaches = mongoose.model('coach', CoachSchema)
