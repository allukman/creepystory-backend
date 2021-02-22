const db = require('../helpers/db')

module.exports = {
  createCategoryModel: (data) => {
    return new Promise((resolve, reject) => {
      const query = `
                INSERT INTO category
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
  getAllCategoryModel: () => {
    return new Promise((resolve, reject) => {
      const query = `
            SELECT * FROM category ORDER BY ct_id
          `
      db.query(query, (error, results, _fields) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  },
  getCategoryByIDModel: (ctId) => {
    return new Promise((resolve, reject) => {
      const query = `
          SELECT *
          FROM category
          WHERE ?
          `
      db.query(query, { ct_id: ctId }, (error, results, _fields) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  },

  getCategoryByName: (ctName) => {
    return new Promise((resolve, reject) => {
      const query = `
          SELECT *
          FROM category
          WHERE ?
          `
      db.query(query, { ct_name: ctName }, (error, results, _fields) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  },

  updateCategoryModel: (ctId, data) => {
    return new Promise((resolve, reject) => {
      const query = `
          UPDATE 
          category
          SET ? 
          WHERE ct_id = ${ctId}
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

  deleteCategoryModel: (ctId) => {
    return new Promise((resolve, reject) => {
      const query = `
          DELETE 
          FROM category
          WHERE ?
          `
      db.query(query, { ct_id: ctId }, (error, results, _fields) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  }
}
