const express = require('express')
const router = express.Router()

const { createAccount, loginAccount, updateAccount, updateAccountPass, deleteAccount } = require('../controllers/account')
const { hashPassword } = require('../middleware/auth')

router.post('/register', hashPassword, createAccount)
router.post('/login', loginAccount)
router.put('/:acId', updateAccount)
router.put('/password/:acId', hashPassword, updateAccountPass)
router.delete('/:acId', deleteAccount)

module.exports = router
