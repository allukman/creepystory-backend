const db = require('../helpers/db')

const { createMemberModel } = require('../models/member')

module.exports = {
  createAccountModel: (data) => {
    return new Promise((resolve, reject) => {
      const setData = {
        ac_name: data.ac_name,
        ac_email: data.ac_email,
        ac_phone: data.ac_phone,
        ac_password: data.ac_password
      }
      const query = 'INSERT INTO account SET ?'

      db.query(query, setData, async (error, results, _fields) => {
        if (!error) {
          await createMemberModel(results.insertId)
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  },

  getAccountByEmailModel: (acEmail) => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT * FROM account WHERE ?    
      `

      db.query(query, { ac_email: acEmail }, (error, results, _fields) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      }
      )
    })
  },

  loginAccountModel: (email) => {
    return new Promise((resolve, reject) => {
      const query = `
          SELECT *
            FROM account ac 
            JOIN member me 
              ON (ac.ac_id = me.ac_id)
           WHERE ?
        `

      db.query(query, { ac_email: email }, (error, results, _fields) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  },

  getAccountByIdModel: (acId) => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT *
          FROM account
         WHERE ?
      `

      db.query(query, { ac_id: acId }, (error, results, _fields) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  },

  updateAccountModel: (acId, data) => {
    return new Promise((resolve, reject) => {
      const query = `
          UPDATE 
          account
          SET ? 
          WHERE ac_id = ${acId}
          `
      db.query(query, data, (error, results, _fields) => {
        if (!error) {
          resolve(results)
        } else {
          console.log(error)
          reject(error)
        }
      })
    })
  },

  deleteAccountModel: (acId, data) => {
    return new Promise((resolve, reject) => {
      const query = `
          DELETE
          FROM account
          WHERE ac_id = ${acId}
          `
      db.query(query, data, (error, results, _fields) => {
        if (!error) {
          resolve(results)
        } else {
          console.log(error)
          reject(error)
        }
      })
    })
  }
}
