const express = require('express');
const rota = express.Router();
const controller = require('../controllers/pacientesController');

rota.get('/', controller.mostrarPacientes);
rota.post('/', controller.cadastrarPaciente);
rota.put('/:id', controller.editarPaciente);
rota.put('/:id', controller.trocarstatus);
rota.delete('/:id', controller.deletarPaciente);

module.exports = rota;