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
