const express = require('express');
const rota = express.Router();
const vagaDisponivelController = require('../controllers/vagaDisponivelController');

rota.post('/criar', vagaDisponivelController.criarVaga);
rota.get('/', vagaDisponivelController.listarVagas);
rota.get('/id/:id', vagaDisponivelController.buscarPeloId);
rota.get('/psicologoid/:psicologoId', vagaDisponivelController.buscarPeloPsicologoId);
rota.put('/atualizar/id/:id', vagaDisponivelController.editarVagaPeloId);
rota.delete('/excluir/id/:id', vagaDisponivelController.deletarVagaPeloId);

module.exports = rota;