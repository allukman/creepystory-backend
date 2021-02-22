module.exports = {
  statusGet: (res, result) => {
    res.status(200).send({
      success: true,
      message: 'Success to get data',
      data: result
    })
  },

  statusGetLength: (res, result) => {
    res.status(200).send({
      success: true,
      message: 'Success to get data',
      length: result.length,
      data: result
    })
  },

  statusGetPaginate: (res, result, length) => {
    res.status(200).send({
      success: true,
      message: 'Success to get data',
      totalPages: length,
      data: result
    })
  },

  statusLogin: (res, result) => {
    res.status(200).send({
      success: true,
      message: 'Login success',
      data: result
    })
  },

  statusCheckPassword: (res) => {
    res.status(200).send({
      success: true,
      message: 'Password is valid'
    })
  },

  statusCheckPasswordFail: (res) => {
    res.status(400).send({
      success: false,
      message: 'Password is invalid'
    })
  },

  statusLoginRequired: (res, result) => {
    res.status(400).send({
      success: false,
      message: 'Please login first!',
      data: result
    })
  },

  statusTokenError: (res, result) => {
    res.status(403).send({
      success: false,
      message: result.message
    })
  },

  statusTokenExpired: (res, result) => {
    res.status(400).send({
      success: false,
      message: result.message
    })
  },

  statusLoginFail: (res) => {
    res.status(400).send({
      success: false,
      message: 'Password is invalid!'
    })
  },

  statusRegistration: (res) => {
    res.status(201).send({
      success: true,
      message: 'Registration success'
    })
  },

  statusRegistrationFail: (res) => {
    res.status(400).send({
      success: false,
      message: 'Fail to registration!'
    })
  },

  statusRegistrationUnique: (res) => {
    res.status(400).send({
      success: false,
      message: 'Email has registered!'
    })
  },

  statusCreateCategoryUnique: (res) => {
    res.status(400).send({
      success: false,
      message: 'This name already in use!'
    })
  },

  statusCreate: (res) => {
    res.status(201).send({
      success: true,
      message: 'Add data success'
    })
  },

  statusCreateOrder: (res, result) => {
    res.status(201).send({
      success: true,
      message: 'Add data success',
      data: result
    })
  },

  statusCreateFail: (res) => {
    res.status(400).send({
      success: false,
      message: 'Fail to add data!'
    })
  },

  statusUpdate: (res) => {
    res.status(200).send({
      success: true,
      message: 'Update data success'
    })
  },

  statusUpdateMember: (res, image) => {
    res.status(200).send({
      success: true,
      message: 'Update data success',
      image: image
    })
  },

  statusUpdateFail: (res) => {
    res.status(400).send({
      success: false,
      message: 'Fail to update data!'
    })
  },

  statusDelete: (res) => {
    res.status(200).send({
      success: true,
      message: 'Delete data success'
    })
  },

  statusDeleteFail: (res) => {
    res.status(400).send({
      success: false,
      message: 'Fail to delete data!'
    })
  },

  statusServerError: (res) => {
    res.status(500).send({
      success: false,
      message: 'Internal Server Error!'
    })
  },

  statusNotFound: (res) => {
    res.status(404).send({
      success: false,
      message: 'Data not found!'
    })
  },

  statusNotFoundAccount: (res) => {
    res.status(404).send({
      success: false,
      message: 'Account not registered!'
    })
  },

  statusError: (res, result) => {
    res.status(404).send({
      success: false,
      message: result.message
    })
  },

  statusAuthorization: (res) => {
    res.status(404).send({
      success: false,
      message: 'Access denied!'
    })
  }
}
