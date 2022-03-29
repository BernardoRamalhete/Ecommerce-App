const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please give us your name']
    },
    email: {
        type: String,
        required: [true, 'Please give us your email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please create a password']
    },
    address: {
        type: String,
        required: [true, 'Please provide your address']
    }
}, {
    timestapms : true
})

module.exports = mongoose.model('User', userSchema)