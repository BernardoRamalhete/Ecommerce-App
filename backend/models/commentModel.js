const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    author: {
        type: String,
        required: [true, 'Missing author']
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Missing product ID'],
        ref: 'Product'
    },
    text: {
        type: String,
        required: [true, 'Your forgot to add your comment']
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Comment', commentSchema)