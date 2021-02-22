const db = require('../../src/helpers/db')

module.exports = {
  createFavoriteModel: (data) => {
    return new Promise((resolve, reject) => {
      const query = `
                INSERT INTO favorite
                        SET ?
              `
      db.query(query, data, (error, results, _fields) => {
        console.log(results)
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  },
  getFavoriteByMeId: (meId) => {
    return new Promise((resolve, reject) => {
      const query = `
      SELECT 
            fa.fa_id, 
            fa.me_id, 
            fa.st_id, 
            fa.fa_created_at, 
            st.ct_id, 
            st.st_title, 
            st.st_photo_cover, 
            st.st_content
      FROM favorite AS fa
      LEFT JOIN story AS st 
            ON fa.st_id = st.st_id
            WHERE fa.?
      `

      db.query(query, { me_id: meId }, (error, results, _fields) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  },
  getFavoriteByFaId: (faId) => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT 
              fa.fa_id, 
              fa.me_id, 
              fa.st_id, 
              fa.fa_created_at, 
              st.ct_id, 
              st.st_title, 
              st.st_photo_cover, 
              st.st_content 
        FROM favorite AS fa
        LEFT JOIN story AS st 
              ON fa.st_id = st.st_id
              WHERE ?
        `

      db.query(query, { fa_id: faId }, (error, results, _fields) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  },
  getFavoriteByStory: (meId, stId) => {
    return new Promise((resolve, reject) => {
      const query = `
      SELECT *
        FROM favorite
       WHERE me_id = ${meId}
         AND st_id = ${stId}
      `

      db.query(query, (error, results, _fields) => {
        if (!error) {
          console.log(results)
          resolve(results)
        } else {
          console.log(error)
          reject(error)
        }
      })
    })
  },
  deleteFavoriteByFaId: (faId) => {
    return new Promise((resolve, reject) => {
      const query = `
        DELETE FROM favorite
         WHERE ?
      `

      db.query(query, { fa_id: faId }, (error, results, _fields) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  },

  deleteFavoriteByStory: (meId, stId) => {
    return new Promise((resolve, reject) => {
      const query = `
        DELETE FROM favorite
         WHERE me_id = ${meId}
           AND st_id = ${stId}
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
  getFavoriteByStId: (stId) => {
    return new Promise((resolve, reject) => {
      const query = `
      SELECT *
      FROM favorite WHERE ?
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
  updateStoryFavoriteModel: (stId, data) => {
    return new Promise((resolve, reject) => {
      const query = `
          UPDATE 
          story
          SET ? 
          WHERE st_id = ${stId}
          `
      db.query(query, data, (error, results, _fields) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  }
}
