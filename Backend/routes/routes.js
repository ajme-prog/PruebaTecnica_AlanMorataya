const express = require('express');
const router = express.Router();
const programacion = require('../services/programacion.js');


//Endpoint Login
router.post('/LoginCorreo', async function (req, res) {
    console.log("correo es "+req.body.correo + " password es "+req.body.password)
    try {
        let respuesta = await programacion.LoginCorreo(req.body.correo,req.body.password);

        if (respuesta === null) { //si devuelvo null es porque no encontre ningun usuario con ese correo
          
            res.json({mensaje:"login fallido",status:400});  //status 400 solicitud defectuosa, credenciales incorrectas
         
        } else {
            console.log("Voy a devolver algo")
            res.json({data:respuesta,status:200});
        }
    } catch (err) {
        console.error(`Error al iniciar sesión con correo `, err.message);
        res.json({data:"Error",status:500});
    }
});


//Endpoint Login
router.post('/LoginTelefono', async function (req, res) {
   // console.log("telefono es "+req.body.telefono + " password es "+req.body.password)
    try {
        let respuesta = await programacion.LoginTelefono(req.body.telefono,req.body.password);

        if (respuesta === null) { //si devuelvo null es porque no encontre ningun usuario con ese correo
          
            res.json({mensaje:"login fallido",status:400});  //status 400 solicitud defectuosa, credenciales incorrectas
         
        } else {
            res.json({data:respuesta,status:200});
        }
    } catch (err) {
        console.error(`Error al iniciar sesión con correo `, err.message);
        res.json({data:"Error",status:500});
    }
});

//Endpoint para registro de usuarios
router.post('/NuevoUsuario', async function (req, res) {
    // console.log("telefono es "+req.body.telefono + " password es "+req.body.password)
     try {
         let respuesta = await programacion.NuevoUsuario(req.body.cui,req.body.nombre,req.body.correo,req.body.telefono,req.body.password);
 
         if (respuesta === null) { //si devuelvo null es porque no encontre ningun usuario con ese correo
           
             res.json({mensaje:"Error al crear el usuario",status:400});  //status 400 solicitud defectuosa, credenciales incorrectas
          
         } else {
             res.json({data:respuesta,status:200});
         }
     } catch (err) {
         console.error(`Error al crear el usuario `, err.message);
         res.json({data:"Error",status:500});
     }
 });
 

 

//Obtener todos los usuarios
router.get('/GetUsuarios', async function (req, res, next) {
    try {
        res.json(await programacion.getUsuarios());
    } catch (err) {
        console.error(`Error al obtener todos los usuarios `, err.message);
        next(err);
    }
});



//Endpoint para registro de Premios
router.post('/NuevoPremio', async function (req, res) {
    // console.log("telefono es "+req.body.telefono + " password es "+req.body.password)
     try {
         let respuesta = await programacion.NuevoPremio(req.body.nombre,req.body.valor);
 
         if (respuesta === null) { //si devuelvo null es porque no encontre ningun usuario con ese correo
           
             res.json({mensaje:"Error al crear el premio",status:400});  //status 400 solicitud defectuosa, credenciales incorrectas
          
         } else {
             res.json({data:respuesta,status:200});
         }
     } catch (err) {
         console.error(`Error al crear el premio `, err.message);
         res.json({data:"Error",status:500});
     }
 });
 


module.exports = router;