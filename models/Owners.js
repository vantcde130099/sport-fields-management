const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OwnerSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    contact: {
        phoneNumber: {
            type: String,
            require: true,
        },
        email: {
            type: String,
            require: true,
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
            },
        },
    },
    identityCard: [{
        type: Schema.Types.ObjectId
    }],

    brandName: {
        type: String,
        require: true,
    },
    fields: [{
        type: Schema.Types.ObjectId,
        ref: 'field'
    }],
    items: [{
        type: Schema.Types.ObjectId,
        ref: 'item'
    }],
    rate: [{
        customer: {
            type: Schema.Types.ObjectId,
            ref: 'customer'
        },
        value: {
            type: Number,
            required: true,
        },
        text: {
            type: String
        },
        dateCreated: {
            type: Date,
            default: Date.now
        }
    }],
    bookings: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
})
module.exports = Owners = mongoose.model('owner', OwnerSchema)