const express = require('express');
const rota = express.Router();
const consultasController = require('../controllers/consultasController');

rota.post('/agendar', consultasController.agendarConsulta);

module.exports = rota;