const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const {
  createAccountModel,
  getAccountByEmailModel,
  loginAccountModel,
  getAccountByIdModel,
  updateAccountModel,
  deleteAccountModel
} = require('../models/account')

const {
  statusRegistration,
  statusRegistrationFail,
  statusRegistrationUnique,
  statusServerError,
  statusLogin,
  statusLoginFail,
  statusNotFoundAccount,
  statusUpdate,
  statusUpdateFail,
  statusNotFound,
  statusDelete,
  statusDeleteFail
} = require('../helpers/status')

module.exports = {
  createAccount: async (req, res, _next) => {
    try {
      const findData = await getAccountByEmailModel(req.body.ac_email)

      if (!findData.length) {
        const result = await createAccountModel(req.body)

        if (result.affectedRows) {
          statusRegistration(res)
        } else {
          statusRegistrationFail(res)
        }
      } else {
        statusRegistrationUnique(res)
      }
    } catch (err) {
      console.log(err)
      statusServerError(res)
    }
  },

  loginAccount: async (req, res) => {
    try {
      const { email, password } = req.body

      const login = await loginAccountModel(email)
      console.log(login[0])
      if (login.length > 0) {
        let peyLoad
        const cekPsw = bcrypt.compareSync(password, login[0].ac_password)
        if (cekPsw) {
          peyLoad = {
            ac_id: login[0].ac_id,
            ac_name: login[0].ac_name,
            ac_email: login[0].ac_email,
            ac_phone: login[0].ac_phone,
            ac_status: login[0].ac_status,
            me_id: login[0].me_id,
            me_domicile: login[0].me_domicile,
            me_description: login[0].me_description,
            me_role: login[0].me_role,
            me_dob: login[0].me_dob,
            me_gender: login[0].me_gender,
            me_photo_profile: login[0].me_photo_profile,
            me_photo_cover: login[0].me_photo_cover
          }
          const token = jwt.sign(peyLoad, 'CS123', { expiresIn: '7d' })
          peyLoad = { ...peyLoad, token }
          const result = {
            ...peyLoad,
            token: token
          }
          statusLogin(res, result)
        } else {
          console.log(cekPsw)
          statusLoginFail(res)
        }
      } else {
        statusNotFoundAccount(res)
      }
    } catch (error) {
      statusServerError(res)
    }
  },
  updateAccount: async (req, res, _next) => {
    try {
      const { acId } = req.params
      const findData = await getAccountByIdModel(acId)

      if (findData.length) {
        const result = await updateAccountModel(acId, req.body)

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
  updateAccountPass: async (req, res, _next) => {
    try {
      const { acId } = req.params
      const findData = await getAccountByIdModel(acId)

      if (findData.length) {
        const result = await updateAccountModel(acId, req.body)

        if (result.affectedRows) {
          statusUpdate(res)
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
  deleteAccount: async (req, res, _next) => {
    try {
      const { acId } = req.params
      const findData = await getAccountByIdModel(acId)

      if (findData.length) {
        const result = await deleteAccountModel(acId, req.body)

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
