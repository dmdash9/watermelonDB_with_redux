import mysql from 'mysql'

require('dotenv').config()

export const pool = mysql.createPool({
  multipleStatements: true,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})

export function makeQuery ({ query, singleRes = false, nestTables = false }) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        // connection.release();
        reject(err)
        throw err
      }
      const options = { sql: query, nestTables }
      pool.query(options, (err, result) => {
        connection.release()
        if (err) {
          reject(err)
          throw err
        }
        if (singleRes) resolve(result[0])
        else resolve(result)
      })
    })
  })
}
