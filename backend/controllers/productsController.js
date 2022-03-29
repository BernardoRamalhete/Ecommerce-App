const asyncHandler = require('express-async-handler')

const Product = require('../models/productModel')
const User = require('../models/userModel')

const getUserProducts  = asyncHandler(async (req, res) => {
    const products = await Product.find({user: req.user.id})
    res.status(200).json(products)
})

const getProducts  = asyncHandler(async (req, res) => {
    const products = await Product.find()
    res.status(200).json(products)
})

const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    res.status(200).json(product)
})

const addProduct  = asyncHandler(async (req, res) => {
    if(!req.body.name || !req.body.description || !req.body.price) {
        res.status(400)
        throw new Error('Please provide a product name, description and price')
    }

    const product = await Product.create({
        user: req.user.id,
        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
        description: req.body.description,
        categories: req.body.categories,
    })
    res.status(200).json(product)
})

const updateProduct  = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if(!product) {
        res.status(400)
        throw new Error('Product not found')
    }

    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    if(product.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('This is not your product')
    }

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true})


    res.status(200).json(updatedProduct);
})

const deleteProduct  = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if(!product) {
        res.status(400)
        throw new Error('Product not found')
    }

    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    if(product.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('This is not your product')
    }

    await product.remove()

    res.status(200).json(product);
})

module.exports = {
    getUserProducts,
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
}