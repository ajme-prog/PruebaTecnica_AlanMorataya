const url_api="http://localhost:5000"
export var LoginCorreoApi = async function (
    correo,
    password
  ) {
   
  console.log("si entro a logincorreoapi")
    return fetch(url_api+"/LoginCorreo" , {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      mode: 'cors',
      body: JSON.stringify({
        correo: correo,
        password: password,
      }),
    });
  };

  export var LoginTelefonoApi = async function (
    telefono,
    password
  ) {
   
  console.log("si entro a logincorreoapi")
    return fetch(url_api+"/LoginTelefono" , {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      mode: 'cors',
      body: JSON.stringify({
        telefono: telefono,
        password: password,
      }),
    });
  };


//---Llamada api de nuevousuario
export var NuevoUsuarioApi = async function (
  cui,
  nombre,
  correo,
  telefono,
  password
) {
 

  return fetch(url_api+"/NuevoUsuario" , {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    mode: 'cors',
    body: JSON.stringify({
      cui: cui,
      nombre: nombre,
      correo: correo,
      telefono: telefono,
      password: password

    }),
  });
};
