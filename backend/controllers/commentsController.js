const asyncHandler = require('express-async-handler')

const Comment = require('../models/commentModel')
const User = require('../models/userModel')

const addComment = asyncHandler(async (req, res) => {
    if(!req.body.text) {
        res.status(400)
        throw new Error('You cannot post a empty comment')
    }

    const comment = await Comment.create({
        user: req.user.id,
        author: req.body.author,
        product: req.params.productId,
        text: req.body.text
    })
    res.status(200).json(comment)
})

const getComments = asyncHandler(async (req, res) => {
    const comments = await Comment.find({product: req.params.productId})
    res.status(200).json(comments)
})

const deleteComment = asyncHandler(async (req, res) => {
    const comment = await Comment.findById(req.params.id)

    if(!comment) {
        res.status(400)
        throw new Error('Comment not found')
    }

    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    if(comment.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('This is not your comment')
    }

    await comment.remove()

    res.status(200).json(comment);
})

const editComment = asyncHandler(async (req, res) => {
    const comment = await Comment.findById(req.params.id)

    if(!comment) {
        res.status(400)
        throw new Error('Comment not found')
    }

    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    if(comment.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('This is not your comment')
    }

    const updatedComment = await Comment.findByIdAndUpdate(req.params.id, req.body, {new: true})


    res.status(200).json(updatedComment);
})

module.exports = {
    addComment, 
    getComments, 
    deleteComment, 
    editComment
}