let mysql = require('mysql')
let config = require('../config')

var pool  = mysql.createPool({
  host: config.database.HOST,
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE
})

let query = function( sql, values ) {
  return new Promise(( resolve, reject ) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        reject( err )
      } else {
        connection.query(sql, values, ( err, rows) => {
          if ( err ) {
            reject( err )
          } else {
            resolve( rows )
          }
          connection.release()
        })
      }
    })
  })
}

// 注册用户
let insertUser = function( value ) {
  let _sql = "insert into students set name=?,class_id=?,gender=?,score=?;"
  return query( _sql, value )
}

module.exports = {
  insertUser
}