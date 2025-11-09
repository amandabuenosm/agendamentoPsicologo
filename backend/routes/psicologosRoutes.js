const express = require('express');
const rota = express.Router();
const psicologosController = require('../controllers/psicologosController');

rota.post('/cadastro', psicologosController.cadastro);
rota.post('/login', psicologosController.login);
rota.get('/', psicologosController.listarPsicologos);
rota.get('/id/:id', psicologosController.buscarPeloId);
rota.get('/crp/:crp', psicologosController.buscarPeloCrp);
rota.get('/especialidade/:especialidades', psicologosController.buscarPelaEspecialidade);
rota.get('/modalidade/:modalidade', psicologosController.buscarPelaModalidade);
rota.put('/atualizar/id/:id', psicologosController.editarPeloId);
rota.delete('/excluir/id/:id', psicologosController.deletarPeloId);
rota.put('/atualizar-senha/id/:id', psicologosController.editarSenha);
rota.put('/esqueceu-senha/id/:id', psicologosController.resetPassword);

module.exports = rota;
