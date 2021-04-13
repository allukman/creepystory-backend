const db = require('../helpers/db')

const { getLabelNameByMeIdModel } = require('../models/label')
const { getFavoriteByStId, updateStoryFavoriteModel } = require('../models/favorite')

module.exports = {
  createStoryModel: (data) => {
    return new Promise((resolve, reject) => {
      const query = `
                INSERT INTO story
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
  updateStoryModel: (stId, data) => {
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
  },
  getStoryByIdModel: (stId) => {
    return new Promise((resolve, reject) => {
      const query = `
      SELECT *
      FROM story st
      INNER JOIN category ct
      ON st.ct_id = ct.ct_id
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
  getStoryByMemberIdModel: (meId) => {
    return new Promise((resolve, reject) => {
      const query = `
      SELECT *
      FROM story st
      INNER JOIN category ct
      ON st.ct_id = ct.ct_id
      WHERE ?
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
  deleteStoryModel: (stId) => {
    return new Promise((resolve, reject) => {
      const query = `
          DELETE 
          FROM story
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
  getAllStoryModel: (paginate) => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT 
        st.st_id,
        st.ct_id,
        st.me_id,
        ct.ct_name,
        st.st_title,
        st.st_photo_cover,
        st.st_content,
        st.st_created_at,
        st.st_updated_at
          FROM story st
          JOIN category ct
            ON st.ct_id = ct.ct_id
          LEFT JOIN label la
            ON la.st_id = st.st_id
      GROUP BY st.st_id        
      ORDER BY st.st_id DESC 
        LIMIT ${paginate.limit}
        OFFSET ${paginate.offset}
      `

      db.query(query, async (err, result, _fields) => {
        if (!err) {
          const data = []
          for (let i = 0; i < result.length; i++) {
            const item = result[i]
            const label = await getLabelNameByMeIdModel(item.st_id)
            const datalength = await getFavoriteByStId(item.st_id)

            const updateData = {
              st_favorited: datalength.length
            }

            const updated = await updateStoryFavoriteModel(item.st_id, updateData)

            if (updated.affectedRows) {
              console.log('Success updated data')
            } else {
              console.log('Failed updated data')
            }

            data[i] = {
              st_id: item.st_id,
              ct_id: item.ct_id,
              me_id: item.me_id,
              ct_name: item.ct_name,
              st_title: item.st_title,
              st_photo_cover: item.st_photo_cover,
              st_content: item.st_content,
              st_created_at: item.st_created_at,
              st_updated_at: item.st_updated_at,
              st_label: label,
              st_favorite_length: datalength.length

            }
          }
          resolve(data)
        } else {
          console.log(err)
          reject(err)
        }
      })
    })
  },

  getAllStoryByFavoriteModel: (paginate) => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT 
        st.st_id,
        st.ct_id,
        st.me_id,
        ct.ct_name,
        st.st_title,
        st.st_photo_cover,
        st.st_content,
        st.st_created_at,
        st.st_updated_at,
        st.st_favorited
          FROM story st
          JOIN category ct
            ON st.ct_id = ct.ct_id
          LEFT JOIN label la
            ON la.st_id = st.st_id
      GROUP BY st.st_id        
      ORDER BY st.st_favorited DESC 
        LIMIT ${paginate.limit}
        OFFSET ${paginate.offset}
      `

      db.query(query, async (err, result, _fields) => {
        if (!err) {
          const data = []
          for (let i = 0; i < result.length; i++) {
            const item = result[i]
            const label = await getLabelNameByMeIdModel(item.st_id)
            data[i] = {
              st_id: item.st_id,
              ct_id: item.ct_id,
              me_id: item.me_id,
              ct_name: item.ct_name,
              st_title: item.st_title,
              st_photo_cover: item.st_photo_cover,
              st_content: item.st_content,
              st_created_at: item.st_created_at,
              st_updated_at: item.st_updated_at,
              st_label: label,
              st_favorite_length: item.st_favorited

            }
          }
          resolve(data)
        } else {
          console.log(err)
          reject(err)
        }
      })
    })
  },
  getFilterStoryModel: (paginate) => {
    return new Promise((resolve, reject) => {
      const filter = parseInt(paginate.filter)
      let where
      if (filter === 0) {
        where = "WHERE ct.ct_name ='Creepy Pasta'"
      } else if (filter === 1) {
        where = "WHERE ct.ct_name ='Riddle'"
      } else if (filter === 2) {
        where = "WHERE ct.ct_name ='Urban Legend'"
      } else {
        where = "WHERE ct.ct_name ='Real Story'"
      }
      const query = `
        SELECT 
        st.st_id,
        st.ct_id,
        st.me_id,
        ct.ct_name,
        st.st_title,
        st.st_photo_cover,
        st.st_content,
        st.st_created_at,
        st.st_updated_at
          FROM story st
          JOIN category ct
            ON st.ct_id = ct.ct_id
          LEFT JOIN label la
            ON la.st_id = st.st_id
            ${where}  
      ORDER BY st.st_id DESC 
        LIMIT ${paginate.limit}
        OFFSET ${paginate.offset}
      `

      db.query(query, async (err, result, _fields) => {
        if (!err) {
          const data = []
          for (let i = 0; i < result.length; i++) {
            const item = result[i]
            const label = await getLabelNameByMeIdModel(item.st_id)
            const datalength = await getFavoriteByStId(item.st_id)

            const updateData = {
              st_favorited: datalength.length
            }

            const updated = await updateStoryFavoriteModel(item.st_id, updateData)

            if (updated.affectedRows) {
              console.log('Success updated data')
            } else {
              console.log('Failed updated data')
            }

            data[i] = {
              st_id: item.st_id,
              ct_id: item.ct_id,
              me_id: item.me_id,
              ct_name: item.ct_name,
              st_title: item.st_title,
              st_photo_cover: item.st_photo_cover,
              st_content: item.st_content,
              st_created_at: item.st_created_at,
              st_updated_at: item.st_updated_at,
              st_label: label,
              st_favorite_length: datalength.length

            }
          }
          resolve(data)
        } else {
          console.log(err)
          reject(err)
        }
      })
    })
  },
  getSearchStoryModel: (paginate) => {
    return new Promise((resolve, reject) => {
      const query = `
      SELECT 
      st.st_id,
      st.ct_id,
      st.me_id,
      ct.ct_name,
      st.st_title,
      st.st_photo_cover,
      st.st_content,
      st.st_created_at,
      st.st_updated_at
        FROM story st
        JOIN category ct
          ON st.ct_id = ct.ct_id
        LEFT JOIN label la
          ON la.st_id = st.st_id
         WHERE st.st_title LIKE '%${paginate.search}%'        
         OR la.la_name LIKE '%${paginate.search}%'     
      ORDER BY st.st_id DESC
         LIMIT ${paginate.limit} 
        OFFSET ${paginate.offset}
      `

      db.query(query, async (err, result, _fields) => {
        if (!err) {
          const data = []
          for (let i = 0; i < result.length; i++) {
            const item = result[i]
            const label = await getLabelNameByMeIdModel(item.st_id)
            console.log(label)
            data[i] = {
              st_id: item.st_id,
              ct_id: item.ct_id,
              me_id: item.me_id,
              ct_name: item.ct_name,
              st_title: item.st_title,
              st_photo_cover: item.st_photo_cover,
              st_content: item.st_content,
              st_created_at: item.st_created_at,
              st_updated_at: item.st_updated_at,
              st_label: label

            }
          }
          resolve(data)
        } else {
          reject(err)
        }
      })
    })
  },
  getAllData: () => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT *
          FROM story st
          JOIN category ct
            ON st.ct_id = ct.ct_id
      ORDER BY st.st_id DESC
      `

      db.query(query, (err, result, _fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  }
}
