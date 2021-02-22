const express = require('express')
const router = express.Router()

const { createLabel, getLabelById, getLabelByStoryId, updateLabel, deleteLabel } = require('../controllers/label')
const { authorization } = require('../middleware/auth')

router.post('/', authorization, createLabel)
router.get('/:laId', authorization, getLabelById)
router.get('/story/:stId', authorization, getLabelByStoryId)
router.put('/:laId', authorization, updateLabel)
router.delete('/:laId', authorization, deleteLabel)
module.exports = router
