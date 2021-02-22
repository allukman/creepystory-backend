
const { getMemberByIdModel, updateMemberModel } = require('../models/member')

const { statusGet, statusNotFound, statusServerError, statusUpdateMember, statusUpdateFail } = require('../helpers/status')

module.exports = {
  getMemberById: async (req, res, _next) => {
    const { meId } = req.params

    try {
      const result = await getMemberByIdModel(meId)

      if (result.length) {
        statusGet(res, result)
      } else {
        statusNotFound(res)
      }
    } catch (error) {
      statusServerError(res)
    }
  },

  updateMemberById: async (req, res, _next) => {
    const { meId } = req.params

    try {
      const findData = await getMemberByIdModel(meId)

      if (findData.length) {
        req.body.image = req.file === undefined ? findData[0].me_photo_profile : req.file.filename

        const data = {
          ...req.body,
          me_photo_profile: req.body.image
        }

        delete data.image
        const result = await updateMemberModel(meId, data)

        if (result.affectedRows) {
          statusUpdateMember(res, findData[0].me_photo_profile)
        } else {
          statusUpdateFail(res)
        }
      } else {
        statusNotFound(res)
      }
    } catch (err) {
      statusServerError(res)
    }
  },
  updatePhotoCover: async (req, res, _next) => {
    const { meId } = req.params

    try {
      const findData = await getMemberByIdModel(meId)

      if (findData.length) {
        req.body.image = req.file === undefined ? findData[0].me_photo_cover : req.file.filename

        const data = {
          ...req.body,
          me_photo_cover: req.body.image
        }

        delete data.image
        const result = await updateMemberModel(meId, data)

        if (result.affectedRows) {
          statusUpdateMember(res, findData[0].me_photo_cover)
        } else {
          statusUpdateFail(res)
        }
      } else {
        statusNotFound(res)
      }
    } catch (err) {
      statusServerError(res)
    }
  }
}
