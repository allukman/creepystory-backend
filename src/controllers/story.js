const isEmpty = require('lodash.isempty')
const {
  createStoryModel,
  updateStoryModel,
  getStoryByIdModel,
  deleteStoryModel,
  getAllStoryModel,
  getAllData,
  getSearchStoryModel,
  getFilterStoryModel,
  getAllStoryByFavoriteModel,
  getStoryByMemberIdModel
} = require('../models/story')

const {
  statusCreate,
  statusCreateFail,
  statusServerError,
  statusUpdate,
  statusUpdateFail,
  statusNotFound,
  statusDelete,
  statusDeleteFail,
  statusGet,
  statusGetPaginate,
  statusGetLength
} = require('../helpers/status')

module.exports = {
  createStory: async (req, res, _next) => {
    req.body.image = req.file === undefined ? '' : req.file.filename

    const data = {
      ...req.body,
      st_photo_cover: req.body.image
    }

    delete data.image

    try {
      const result = await createStoryModel(data)

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

  updateStory: async (req, res, _next) => {
    const { stId } = req.params

    try {
      const findData = await getStoryByIdModel(stId)

      if (findData.length) {
        req.body.image = req.file === undefined ? findData[0].st_photo_cover : req.file.filename
        const data = {
          ...req.body,
          st_photo_cover: req.body.image
        }
        delete data.image

        const result = await updateStoryModel(stId, data)

        if (result.affectedRows) {
          statusUpdate(res, result)
        } else {
          statusUpdateFail(res)
        }
      } else {
        statusNotFound(res)
      }
    } catch (error) {
      console.error(error)
      statusServerError(res)
    }
  },
  deleteStory: async (req, res, _next) => {
    const { stId } = req.params

    try {
      const findData = await getStoryByIdModel(stId)

      if (findData.length) {
        const result = await deleteStoryModel(stId)

        if (result.affectedRows) {
          statusDelete(res)
        } else {
          statusDeleteFail(res)
        }
      } else {
        statusNotFound(res)
      }
    } catch (error) {
      statusServerError(res)
    }
  },
  getStoryById: async (req, res, _next) => {
    const { stId } = req.params
    try {
      const result = await getStoryByIdModel(stId)
      if (result.length) {
        statusGet(res, result)
      } else {
        statusNotFound(res)
      }
    } catch (error) {
      statusServerError(res)
    }
  },

  getStoryByMemberId: async (req, res, _next) => {
    const { meId } = req.params
    try {
      const result = await getStoryByMemberIdModel(meId)
      if (result.length) {
        statusGet(res, result)
      } else {
        statusNotFound(res)
      }
    } catch (error) {
      statusServerError(res)
    }
  },
  getAllStory: async (req, res) => {
    let { search, limit, filter, page, order } = req.query

    if (!limit) {
      limit = 25
    } else {
      limit = parseInt(limit)
    }

    if (!page) {
      page = 1
    } else {
      page = parseInt(page)
    }

    const paginate = {
      search: search,
      limit: limit,
      filter: filter,
      order: order,
      offset: (page - 1) * limit
    }

    try {
      let result
      if (isEmpty(filter) && isEmpty(search) && isEmpty(order)) {
        result = await getAllStoryModel(paginate)
      } else if (isEmpty(filter) && isEmpty(order)) {
        result = await getSearchStoryModel(paginate)
      } else if (isEmpty(order)) {
        result = await getFilterStoryModel(paginate)
      } else {
        const refreshData = await getAllStoryModel(paginate)
        if (refreshData.length) {
          result = await getAllStoryByFavoriteModel(paginate)
        } else {
          result = await getAllStoryModel(paginate)
        }
      }

      if (result.length) {
        // const totalData = await getAllData()
        // const totalPage = Math.ceil(totalData.length / limit)

        // statusGetPaginate(res, result, totalPage)

        statusGetLength(res, result)
      } else {
        statusNotFound(res)
      }
    } catch (error) {
      statusServerError(res)
    }
  },
  getFilterStory: async (req, res) => {
    let { search, filter, limit, page } = req.query

    if (!limit) {
      limit = 25
    } else {
      limit = parseInt(limit)
    }

    if (!page) {
      page = 1
    } else {
      page = parseInt(page)
    }

    const paginate = {
      search: search,
      filter: filter,
      limit: limit,
      offset: (page - 1) * limit
    }

    try {
      let result
      if (isEmpty(filter) && isEmpty(search)) {
        result = await getAllStoryModel(paginate)
      } else if (isEmpty(filter)) {
        result = await getSearchStoryModel(paginate)
      } else {
        result = await getFilterStoryModel(paginate)
      }
      if (result.length) {
        const totalData = await getAllData()
        const totalPage = Math.ceil(totalData.length / limit)

        statusGetPaginate(res, result, totalPage)
      } else {
        statusNotFound(res)
      }
    } catch (error) {
      statusServerError(res)
    }
  }
}
