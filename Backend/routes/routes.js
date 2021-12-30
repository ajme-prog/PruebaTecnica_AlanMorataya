const express = require('express');
const router = express.Router();
const programacion = require('../services/programacion.js');


//Endpoint Login
router.post('/Login', async function(req, res, next) {
    try {
      res.json(await programacion.LoginCorreo(req.body.cui));
    } catch (err) {
      console.error(`Error al iniciar sesión con login `, err.message);
      next(err);
    }
  });


//Obtener todos los usuarios
router.get('/GetUsuarios', async function(req, res, next) {
  try {
    res.json(await programacion.getUsuarios());
  } catch (err) {
    console.error(`Error al obtener todos los usuarios `, err.message);
    next(err);
  }
});

module.exports = router;