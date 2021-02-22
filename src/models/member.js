const db = require('../helpers/db')

module.exports = {
  createMemberModel: (acId) => {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO member SET ?'
      db.query(query, { ac_id: acId }, (error, results, _fields) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  },

  updateMemberModel: (meId, data) => {
    return new Promise((resolve, reject) => {
      const query = `
          UPDATE 
          member
          SET ? 
          WHERE me_id = ${meId}
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

  getMemberByIdModel: (meId) => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT * FROM member me JOIN account ac on (me.ac_id = ac.ac_id) WHERE ?    
      `

      db.query(query, { me_id: meId }, (error, results, _fields) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  }
}
