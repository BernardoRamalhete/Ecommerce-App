const express = require('express')
const router = express.Router()
const {protect} = require('../middleware/authMiddleware')
const {addComment, getComments, deleteComment, editComment} = require('../controllers/commentsController')

router.route('/:productId').get(getComments).post(protect, addComment)
router.route('/:id').delete(protect, deleteComment).put(protect, editComment)

module.exports = router;