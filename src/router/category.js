const express = require('express')
const router = express.Router()

const { getAllCategory, createCategory, getCategoryById, updateCategory, deleteCategory } = require('../controllers/category')
const { authorization } = require('../middleware/auth')

router.get('/', authorization, getAllCategory)
router.post('/', authorization, createCategory)
router.get('/:ctId', authorization, getCategoryById)
router.put('/:ctId', authorization, updateCategory)
router.delete('/:ctId', authorization, deleteCategory)

module.exports = router
