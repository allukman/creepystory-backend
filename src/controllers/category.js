const {
  getAllCategoryModel,
  getCategoryByName,
  createCategoryModel,
  getCategoryByIDModel,
  updateCategoryModel,
  deleteCategoryModel
} = require('../models/category')

const {
  statusGet,
  statusNotFound,
  statusServerError,
  statusCreate,
  statusCreateFail,
  statusCreateCategoryUnique,
  statusUpdate,
  statusUpdateFail,
  statusDelete,
  statusDeleteFail
} = require('../helpers/status')

module.exports = {
  getAllCategory: async (_req, res, _next) => {
    try {
      const result = await getAllCategoryModel()

      if (result.length) {
        statusGet(res, result)
      } else {
        statusNotFound(res)
      }
    } catch (error) {
      console.error(error)
      statusServerError(res)
    }
  },

  createCategory: async (req, res, _next) => {
    try {
      const findData = await getCategoryByName(req.body.ct_name)

      if (!findData.length) {
        const result = await createCategoryModel(req.body)

        if (result.affectedRows) {
          statusCreate(res)
        } else {
          statusCreateFail(res)
        }
      } else {
        statusCreateCategoryUnique(res)
      }
    } catch (err) {
      statusServerError(res)
    }
  },

  getCategoryById: async (req, res, _next) => {
    const { ctId } = req.params

    try {
      const result = await getCategoryByIDModel(ctId)
      if (result.length) {
        statusGet(res, result)
      } else {
        statusNotFound(res)
      }
    } catch (error) {
      console.error(error)
      statusServerError(res)
    }
  },
  updateCategory: async (req, res, _next) => {
    try {
      const { ctId } = req.params
      const findData = await getCategoryByIDModel(ctId)

      if (findData.length) {
        const result = await updateCategoryModel(ctId, req.body)

        if (result.affectedRows) {
          statusUpdate(res)
        } else {
          statusUpdateFail(res)
        }
      } else {
        console.log(res)
        statusNotFound(res)
      }
    } catch (err) {
      statusServerError(res)
    }
  },
  deleteCategory: async (req, res, _next) => {
    const { ctId } = req.params

    try {
      const result = await getCategoryByIDModel(ctId)

      if (result.length) {
        const result = await deleteCategoryModel(ctId)

        if (result.affectedRows) {
          statusDelete(res, result)
        } else {
          statusDeleteFail(res)
        }
      } else {
        statusNotFound(res)
      }
    } catch (error) {
      statusServerError(res)
    }
  }
}
