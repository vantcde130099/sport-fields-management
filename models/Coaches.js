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
      workingTime: {
        startDay: {
          type: Date
        },
        endDay: {
          type: Date
        },
        repeat: {
          unit: {
            type: String,
            enum: ['Tuần', 'Tháng', 'Năm'],
            default: 'Tuần'
          },
          status: {
            type: Boolean
          }
        },
        workingInDay: {
          startInDay: {
            type: Number,
            default: 420
          },
          endInDay: {
            type: Number,
            default: 1200
          },
          allDay: {
            type: Boolean
          }
        },
        note: {
          type: String
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
  status: {
    type: Boolean,
    default: true
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
})

module.exports = Coaches = mongoose.model('coach', CoachSchema)
