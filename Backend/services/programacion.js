const db = require('../services/db.js');
/*En este archivo se encuentras las funciones de js que mandan a ejecutar los querys */

//---funcion para el login 
async function LoginCorreo(correo, password) {

  const rows = await db.queryParams(
    `SELECT * from Usuarios where Correo=? and Password=?`, [
    correo, password
  ]

  );

  if (!rows || rows.length == 0) {

    return null;
  }

  return rows[0];
}


//---funcion para el login con telefono
async function LoginTelefono(telefono, password) {

  const rows = await db.queryParams(
    `SELECT * from Usuarios where Telefono=? and Password=?`, [
    telefono, password
  ]

  );

  if (!rows || rows.length == 0) {

    return null;
  }

  return rows[0];
}

//--funcion para registrar usuario
async function NuevoUsuario(Cui, Nombre, Correo, Telefono, Password) {
  const result = await db.queryParams(

    `INSERT INTO Usuarios 
      (Cui,Nombre,Correo,Telefono,Password,Rol,Puntos)
      VALUES 
      (?, ?, ?, ?, ?,?,?)`,
    [Cui, Nombre, Correo, Telefono, Password, '1', 0     // el 1 significar rol usuario y se crea con 0 puntos

    ]
  );



  if (result.affectedRows) {
    message = 'Usuario creado correctamente';
    return { message };
  } else {
    return null
  }


}


//--funcion para registrar usuario
async function ActualizarPuntosUsuario(Cui, Puntos) {
  const result = await db.queryParams(

    `UPDATE  Usuarios SET Puntos = ? where CUI = ?`,
    [Puntos, Cui   // el 1 significar rol usuario y se crea con 0 puntos

    ]
  );



  if (result.affectedRows) {
    message = 'Usuario actualizado correctamente';
    return { message };
  } else {
    return null
  }


}

//---funcion para obtener todos los usuarios de la bd
async function getUsuarios() {

  const rows = await db.query(
    `SELECT * from Usuarios`,

  );

  if (!rows) {
    return [];
  }
  return rows;
}



//--funcion para registrar premios
async function NuevoPremio(Nombre, Descripcion, Valor) {
  const result = await db.queryParams(

    `INSERT INTO Premios 
      (Nombre,Descripcion,Estado,Valor)
      VALUES 
      (?, ?, ? ,?)`,
    [Nombre, Descripcion, '1', Valor     // el true es para el campo estado, no ha sido cambiado quiere decir que esta disponible el premio

    ]
  );


  


  if (result.affectedRows) {
    message = 'Premio creado correctamente';
    return { message };
  } else {
    return null
  }


}

//--funcion para actualizar el propietario del regalo este se llama cuando asigna
async function ActualizarPropietarioPremio(Cui, Id) {
  const result = await db.queryParams(

    `UPDATE  Premios SET Cui_propietario = ? where Id = ?`,
    [Cui, Id   // el 1 significar rol usuario y se crea con 0 puntos

    ]
  );



  if (result.affectedRows) {
    message = 'Premio actualizado correctamente';
    return { message };
  } else {
    return null
  }


}

//---funcion para obtener todos los premios
async function getPremios() {

  const rows = await db.query(
    `SELECT * from Premios`,

  );

  if (!rows) {
    return [];
  }
  return rows;
}


//---funcion para obtener todos los premios
async function getUsuarioUnico(cui) {

  const rows = await db.queryParams(
    `SELECT * from Usuarios where Cui = ?`, [cui]

  );

  if (!rows) {
    return [];
  }
  return rows[0];
}



//--funcion para actualizar el propietario del regalo este se llama cuando asigna
async function CanjearPremio(Id) {
  const result = await db.queryParams(

    `UPDATE  Premios SET Estado = '0' where Id = ?`,
    [Id   // el 1 significar rol usuario y se crea con 0 puntos

    ]
  );



  if (result.affectedRows) {
    message = 'Premio canjeado correctamente';
    return { message };
  } else {
    return null
  }


}


//---funcion para obtener los premios de un solo usuario que tiene que canjear
async function getPremiosUsuario(Cui) {

  const rows = await db.queryParams(
    `SELECT * from Premios where Cui_propietario = ? and Estado ='1' `, [Cui]

  );

  if (!rows) {
    return [];
  }
  return rows;
}



//---funcion para obtener los premios de un solo usuario que tiene que canjear
async function getPremiosUsuarioCanjeados(Cui) {

  const rows = await db.queryParams(
    `SELECT * from Premios where Cui_propietario = ? and Estado ='0' `, [Cui]

  );

  if (!rows) {
    return [];
  }
  return rows;
}



//--funcion para registrar usuario
async function NuevaPromocion(Nombre, Descripcion,Fechainicio,Fechafin) {
  const result = await db.queryParams(

    `INSERT INTO Promocion 
      (Nombrepromocion,Descripcionpromocion,Fechainicio,Fechafin)
      VALUES 
      (?, ?, ?,?)`,
    [Nombre,Descripcion,Fechainicio,Fechafin   // el 1 significar rol usuario y se crea con 0 puntos

    ]
  );



  if (result.affectedRows.length!=0) {
    message = 'Promoción creada correctamente';
    return { message };
  } else {
    return null
  }


}



//---funcion para obtener todos los premios
async function getPromociones() {

  const rows = await db.query(
    `SELECT * from Promocion`,

  );

  if (!rows) {
    return [];
  }
  return rows;
}

module.exports = {
  getUsuarios,
  LoginCorreo,
  LoginTelefono,
  NuevoUsuario,
  NuevoPremio,
  ActualizarPuntosUsuario,
  getPremios,
  ActualizarPropietarioPremio,
  getPremiosUsuario,
  getPremiosUsuarioCanjeados,
  CanjearPremio,
  getUsuarioUnico,
  NuevaPromocion,
  getPromociones
}