const express = require('express')
const router = express.Router()

const { createStory, updateStory, deleteStory, getStoryById, getAllStory, getStoryByMemberId } = require('../controllers/story')

const uploadImage = require('../middleware/multer')
const { authorization } = require('../middleware/auth')

router.get('/', authorization, getAllStory)
router.post('/', authorization, uploadImage, createStory)
router.put('/:stId', authorization, uploadImage, updateStory)
router.delete('/:stId', authorization, deleteStory)
router.get('/:stId', authorization, getStoryById)
router.get('/member/:meId', authorization, getStoryByMemberId)

module.exports = router
