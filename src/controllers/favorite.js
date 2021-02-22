const { createFavoriteModel, getFavoriteByMeId, getFavoriteByFaId, deleteFavoriteByFaId, getFavoriteByStory, deleteFavoriteByStory, getFavoriteByStId } = require('../models/favorite')

const {
  statusCreate,
  statusCreateFail,
  statusServerError,
  statusGet,
  statusNotFound,
  statusDelete,
  statusDeleteFail,
  statusGetLength
} = require('../helpers/status')

module.exports = {
  createFavorite: async (req, res, _next) => {
    try {
      const result = await createFavoriteModel(req.body)

      if (result.affectedRows) {
        statusCreate(res)
      } else {
        statusCreateFail(res)
      }
    } catch (err) {
      console.log(err)
      statusServerError(res)
    }
  },
  getAllFavoriteByMeId: async (req, res, _next) => {
    const { meId } = req.params

    try {
      const result = await getFavoriteByMeId(meId)

      if (result.length) {
        statusGet(res, result)
      } else {
        statusNotFound(res)
      }
    } catch (error) {
      statusServerError(res)
    }
  },
  deleteFavoriteByFaId: async (req, res, _next) => {
    try {
      const { faId } = req.params
      const findData = await getFavoriteByFaId(faId)

      if (findData.length) {
        const result = await deleteFavoriteByFaId(faId)

        if (result.affectedRows) {
          statusDelete(res)
        } else {
          statusDeleteFail(res)
        }
      } else {
        statusNotFound(res)
      }
    } catch (err) {
      statusServerError(res)
    }
  },
  checkIsFavorite: async (req, res, _next) => {
    try {
      const { meId, stId } = req.query
      const result = await getFavoriteByStory(meId, stId)
      console.log(result)
      if (result.length) {
        statusGet(res, result)
      } else {
        statusNotFound(res)
      }
    } catch (error) {
      statusServerError(res)
    }
  },
  getAllFavoriteByStId: async (req, res, _next) => {
    try {
      const { stId } = req.params
      const result = await getFavoriteByStId(stId)
      console.log(result)
      if (result.length) {
        statusGetLength(res, result)
      } else {
        statusNotFound(res)
      }
    } catch (error) {
      statusServerError(res)
    }
  },
  deleteFavoriteByStory: async (req, res, _next) => {
    try {
      const { meId, stId } = req.query
      const findData = await getFavoriteByStory(meId, stId)
      console.log(findData)
      if (findData.length) {
        const result = await deleteFavoriteByStory(meId, stId)
        if (result.affectedRows) {
          statusDelete(res)
        } else {
          statusDeleteFail(res)
        }
      } else {
        statusNotFound(res)
      }
    } catch (err) {
      console.log(err)
      statusServerError(res)
    }
  }
}
