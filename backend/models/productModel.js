const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: [true, 'Please provide a name for this product']
    },
    description: {
        type: String,
        required: [true, 'Please provide a description for this product']
    },
    price:{
        type: Number,
        required: [true, 'Please provide a price for this product']
    },
    image:{
        type: String,
        required: [true, 'Please provide a image for this product']
    },
    categories: {
        type: [String],
        required: false
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Product', productSchema)