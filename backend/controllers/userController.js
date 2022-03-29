const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const registerUser = asyncHandler(async (req,res) => {
    const {name, email, password, address} = req.body

    if(!name || !email || !password || !address) {
        res.status(400)
        throw new Error('Please fill all fields')
    }

    const userExists = await User.findOne({email})

    if(userExists) {
        res.status(400)
        throw new Error('Email already registered')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        name: name,
        email: email,
        password: hashedPassword,
        address: address
    })

    if(user) {
        res.status(201)
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            address: user.address,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

const loginUser = asyncHandler(async (req,res) => {
    const {email, password} = req.body

    if(!email || !password) {
        res.status(400)
        throw new Error('Please fill all fields')
    }

    const user = await User.findOne({email})

    if(!user) {
        res.status(400)
        throw new Error('Email not registered') 
    }

    if(user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            address: user.address,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Email and password do not match')
    }
})

const getUser = asyncHandler(async (req,res) => {

    res.status(200).json(req.user)
})

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '30d'})
}

module.exports = {
    registerUser,
    loginUser,
    getUser
}