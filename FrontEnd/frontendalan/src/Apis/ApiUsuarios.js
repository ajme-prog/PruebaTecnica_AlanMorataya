const url_api = "http://localhost:5000"
export var LoginCorreoApi = async function (
  correo,
  password
) {

  console.log("si entro a logincorreoapi")
  return fetch(url_api + "/LoginCorreo", {
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
  return fetch(url_api + "/LoginTelefono", {
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


  return fetch(url_api + "/NuevoUsuario", {
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


//---Llamada api de nuevopremio
export var NuevoPremioApi = async function (
  nombre,
  descripcion,
  valor
) {


  return fetch(url_api + "/NuevoPremio", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    mode: 'cors',
    body: JSON.stringify({
      nombre: nombre,
      descripcion: descripcion,
      valor: valor

    }),
  });
};


//---Llamada api de actualizar los puntos de un usuario
export var ActualizarPuntosApi = async function (
  cui, puntos
) {


  return fetch(url_api + "/ActualizarPuntos", {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    mode: 'cors',
    body: JSON.stringify({
      cui: cui,
      puntos: puntos

    }),
  });
};


//----funcion para obtener todos los usuarios
export async function GetUsuariosApi() {
  // let usuarioActual = await JSON.parse(localStorage.getItem("usuarioActual"));
  // console.log("llamando a perfil usuario api")
  return fetch(url_api + "/GetUsuarios", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    mode: 'cors'
  });
}



//----funcion para obtener todos los usuarios
export async function GetPremiosApi() {
  // let usuarioActual = await JSON.parse(localStorage.getItem("usuarioActual"));
  // console.log("llamando a perfil usuario api")
  return fetch(url_api + "/GetPremios", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    mode: 'cors'
  });
}


//---Llamada api de actualizar los puntos de un usuario
export var ActualizarPropietarioApi = async function (
  cui, id
) {


  return fetch(url_api + "/ActualizarPropietarioPremio", {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    mode: 'cors',
    body: JSON.stringify({
      cui: cui,
      id: id

    }),
  });
};




//---Llamada api de actualizar los puntos de un usuario
export var CanjearPremioApi = async function (
  id
) {


  return fetch(url_api + "/CanjearPremio", {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    mode: 'cors',
    body: JSON.stringify({

      id: id

    }),
  });
};




//----funcion para obtener todos los premios a canjear
export async function GetPremiosUsuarioApi(cui) {
  // let usuarioActual = await JSON.parse(localStorage.getItem("usuarioActual"));
  // console.log("llamando a perfil usuario api")
  return fetch(url_api + "/GetPremiosUsuario/" + cui, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    mode: 'cors'
  });
}


//----funcion para obtener todos los usuarios
export async function GetPremiosUsuarioCanjeadosApi(cui) {
  // let usuarioActual = await JSON.parse(localStorage.getItem("usuarioActual"));
  // console.log("llamando a perfil usuario api")
  return fetch(url_api + "/GetPremiosUsuarioCanjeados/" + cui, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    mode: 'cors'
  });
}



//----funcion para obtener todos los premios a canjear
export async function GetUsuarioUnicoApi(cui) {
  // let usuarioActual = await JSON.parse(localStorage.getItem("usuarioActual"));
  // console.log("llamando a perfil usuario api")
  return fetch(url_api + "/GetUsuarioUnico/" + cui, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    mode: 'cors'
  });
}



//---Llamada api de nuevopremio
export async function NuevaPromocionApi  (
  nombre,
  descripcion,
  fechainicio,
  fechafin

) {


  return fetch(url_api + "/NuevaPromocion", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    mode: 'cors',
    body: JSON.stringify({
      nombre: nombre,
      descripcion: descripcion,
      fechainicio: fechainicio,
      fechafin: fechafin
    }),
  });
};



//----funcion para obtener todas las promociones
export async function GetPromocionesApi() {
 
  return fetch(url_api + "/GetPromociones", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    mode: 'cors'
  });
}