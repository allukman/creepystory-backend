const express = require('express')
const router = express.Router()

const { getMemberById, updateMemberById, updatePhotoCover } = require('../controllers/member')

const { authorization } = require('../middleware/auth')
const uploadImage = require('../middleware/multer')

router.get('/:meId', authorization, getMemberById)
router.put('/:meId', authorization, uploadImage, updateMemberById)
router.put('/cover/:meId', authorization, uploadImage, updatePhotoCover)

module.exports = router
