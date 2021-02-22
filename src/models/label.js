const db = require('../helpers/db')

module.exports = {
  createLabelModel: (data) => {
    return new Promise((resolve, reject) => {
      const query = `
            INSERT INTO label
                    SET ?
          `

      db.query(query, data, (error, results, _fields) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  },

  getLabelByIdModel: (laId) => {
    return new Promise((resolve, reject) => {
      const query = `
            SELECT *
              FROM label
             WHERE ?
          `

      db.query(query, { la_id: laId }, (error, results, _fields) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  },

  getLabelByStoryIdModel: (stId) => {
    return new Promise((resolve, reject) => {
      const query = `
            SELECT *
              FROM label
             WHERE ?
          `

      db.query(query, { st_id: stId }, (error, results, _fields) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  },

  getLabelNameByMeIdModel: (stId) => {
    return new Promise((resolve, reject) => {
      const query = `
            SELECT la_name
              FROM label
             WHERE ?
          `
      db.query(query, { st_id: stId }, (error, results, _fields) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  },

  updateLabelModel: (laId, data) => {
    return new Promise((resolve, reject) => {
      const query = `UPDATE label SET ? WHERE la_id = ${laId}`

      db.query(query, data, (error, results, _fields) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  },

  deleteLabelModel: (laId) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM label WHERE la_id = ${laId}`, (err, result, fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  }
}
