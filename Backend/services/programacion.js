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

//--funcion para registrar usuario
async function NuevoUsuario(Cui,Nombre,Correo,Telefono,Password){
    const result = await db.queryParams(
   
      `INSERT INTO Usuarios 
      (Cui,Nombre,Correo,Telefono,Password,Rol,Puntos)
      VALUES 
      (?, ?, ?, ?, ?,?,?)`, 
      [ Cui, Nombre,Correo, Telefono,Password,'1',0     // el 1 significar rol usuario y se crea con 0 puntos
       
      ]
    );
  
  
  
    if (result.affectedRows) {
      message = 'Usuario creado correctamente';
      return {message};
    }else{
        return null
    }
  
    
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



//--funcion para registrar premios
async function NuevoPremio(Nombre,Valor){
    const result = await db.queryParams(
   
      `INSERT INTO Premios 
      (Nombre,Estado,Valor)
      VALUES 
      (?, ?, ? )`, 
      [ Nombre,true,Valor     // el true es para el campo byte, quiere decir que esta disponible el premio
       
      ]
    );
  
  
  
    if (result.affectedRows) {
      message = 'Premio creado correctamente';
      return {message};
    }else{
        return null
    }
  
    
  }

module.exports = {
    getUsuarios,
    LoginCorreo,
    LoginTelefono,
    NuevoUsuario,
    NuevoPremio
  }