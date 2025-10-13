const express = require('express');
const rota = express.Router();
const controller = require('../controllers/psicologosController');

rota.get('/', controller.mostrarPsicologos);
rota.post('/', controller.cadastrarPsicologo);
rota.put('/:id', controller.editarPsicologo);
rota.put('/:id', controller.trocarstatus);
rota.delete('/:id', controller.deletarPsicologo);

module.exports = rota;
