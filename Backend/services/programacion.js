const db = require('../services/db.js');
/*En este archivo se encuentras las funciones de js que mandan a ejecutar los querys */

//---funcion para el login 
async function LoginCorreo(correo,password){
  
    const rows = await db.queryParams(
      `SELECT * from Usuarios where Correo=? and Password=?`,  [
        correo,password
      ]
      
    );

    if (!rows || rows.length==0) {
       
        return null;
      }
  
      return rows[0];
}


//---funcion para el login con telefono
async function LoginTelefono(telefono,password){
  
    const rows = await db.queryParams(
      `SELECT * from Usuarios where Telefono=? and Password=?`,  [
        telefono,password
      ]
      
    );

    if (!rows || rows.length==0) {
       
        return null;
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
    LoginCorreo,
    LoginTelefono
  }