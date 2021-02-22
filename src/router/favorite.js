const express = require('express')
const router = express.Router()

const { createFavorite, getAllFavoriteByMeId, deleteFavoriteByFaId, deleteFavoriteByStory, checkIsFavorite, getAllFavoriteByStId } = require('../controllers/favorite')

const { authorization } = require('../middleware/auth')

router.post('/', authorization, createFavorite)
router.get('/:meId', authorization, getAllFavoriteByMeId)
router.get('/story/:stId', authorization, getAllFavoriteByStId)
router.get('/', authorization, checkIsFavorite)
router.delete('/:faId', authorization, deleteFavoriteByFaId)
router.delete('/', authorization, deleteFavoriteByStory)

module.exports = router
