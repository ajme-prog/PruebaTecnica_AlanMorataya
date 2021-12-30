const mysql = require('mysql2/promise');
const config = require('../config/db.config.js');

//---Función para mandar a llamar a las querys con paso de parametros
async function queryParams(sql, params) {
    const connection = await mysql.createConnection(config.db);
    const [results, ] = await connection.execute(sql, params);
  
    return results;
  }
  

  //---Función para mandar a llamar a las querys sin parametros
async function query(sql) {
    const connection = await mysql.createConnection(config.db);
    const [results, ] = await connection.execute(sql);
  
    return results;
  }
  
  module.exports = {
    queryParams,
    query
    
  }