const db = require('../services/db.js');
/*En este archivo se encuentras las funciones de js que mandan a ejecutar los querys */

//---funcion para el login 
async function LoginCorreo(cui){
  
    const rows = await db.queryParams(
      `SELECT * from Usuarios where cui=?`,  [
        cui
      ]
      
    );

    if (!rows) {
        return [];
      }
      return rows[0];
}


//---funcion para obtener todos los usuarios de la bd
async function getUsuarios(){
  
    const rows = await db.query(
      `SELECT * from Usuarios`, 
      
    );

    if (!rows) {
        return [];
      }
      return rows;
}


module.exports = {
    getUsuarios,
    LoginCorreo
  }