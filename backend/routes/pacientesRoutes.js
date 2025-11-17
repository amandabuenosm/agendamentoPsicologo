const express = require('express');
const rota = express.Router();
const pacientesController = require('../controllers/pacientesController');

rota.post('/cadastro', pacientesController.cadastro);
rota.post('/login', pacientesController.login);
rota.get('/', pacientesController.listarPacientes);
rota.get('/id/:id', pacientesController.buscarPeloId);
rota.get('/cpf/:cpfPaciente', pacientesController.buscaPeloCpf);
rota.put('/atualizar/id/:id', pacientesController.editarPeloId);
rota.delete('/excluir/id/:id', pacientesController.deletarPeloId);
rota.put('/atualizar-senha/id/:id', pacientesController.editarSenha);
rota.put('/esqueceu-senha/id/:id', pacientesController.resetPassword);

module.exports = rota;
