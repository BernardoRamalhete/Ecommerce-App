const express = require('express')
const router = express.Router()
const {protect} = require('../middleware/authMiddleware')
const {getUserProducts, getProducts, getProductById, updateProduct, addProduct, deleteProduct} = require('../controllers/productsController')

router.route('/me').get(protect, getUserProducts)
router.route('/').get(getProducts).post(protect, addProduct)
router.route('/:id').get(getProductById).put(protect, updateProduct).delete(protect, deleteProduct)

module.exports = router;