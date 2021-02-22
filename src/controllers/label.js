const { createLabelModel, getLabelByIdModel, getLabelByStoryIdModel, updateLabelModel, deleteLabelModel } = require('../models/label')

const {
  statusCreate,
  statusCreateFail,
  statusServerError,
  statusGet,
  statusNotFound,
  statusUpdate,
  statusUpdateFail,
  statusDelete,
  statusDeleteFail
} = require('../helpers/status')

module.exports = {
  createLabel: async (req, res) => {
    try {
      const result = await createLabelModel(req.body)
      if (result.affectedRows) {
        statusCreate(res)
      } else {
        statusCreateFail(res)
      }
    } catch (err) {
      statusServerError(res)
    }
  },
  getLabelById: async (req, res, _next) => {
    const { laId } = req.params

    try {
      const result = await getLabelByIdModel(laId)

      if (result.length) {
        statusGet(res, result)
      } else {
        statusNotFound(res)
      }
    } catch (error) {
      statusServerError(res)
    }
  },
  getLabelByStoryId: async (req, res, _next) => {
    const { stId } = req.params

    try {
      const result = await getLabelByStoryIdModel(stId)

      if (result.length) {
        statusGet(res, result)
      } else {
        statusNotFound(res)
      }
    } catch (error) {
      console.log(error)
      statusServerError(res)
    }
  },
  updateLabel: async (req, res, _next) => {
    try {
      const { laId } = req.params
      const findData = await getLabelByIdModel(laId)

      if (findData.length) {
        const result = await updateLabelModel(laId, req.body)

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
  deleteLabel: async (req, res, _next) => {
    try {
      const { laId } = req.params
      const findData = await getLabelByIdModel(laId)

      if (findData.length) {
        const result = await deleteLabelModel(laId, req.body)

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
  }
}
