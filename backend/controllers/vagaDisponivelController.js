const VagaDisponivel = require('../models/vagaDisponivelModel');
const { Op } = require('sequelize');

exports.criarVaga = async (req, res) => { // criar nova vaga disponível
    try {
        const { psicologoId, dataDisp, horaDisp } = req.body;

        if (req.psicologo.id !== psicologoId) {
            return res.status(403).json({
                erro: 'Acesso negado',
                mensagem: 'Você não tem permissão para criar vagas para este psicólogo.'
            });
        }

        // não criar vaga em data passada
        const dataAtual = new Date().toISOString().split('T')[0];
        if (dataDisp < dataAtual) {
            return res.status(400).json(response(false,
                'A data informada já passou. Não é permitido criar vagas retroativas.'
            ));
        }

        const vagaExistente = await VagaDisponivel.findOne({
            where: { psicologoId, dataDisp, horaDisp }
        });

        if (vagaExistente) {
            return res.status(400).json({
                erro: 'Conflito de agenda',
                mensagem: 'Já existe uma vaga cadastrada para este horário.'
            });
        }

        const novaVaga = await VagaDisponivel.create(req.body);

        res.status(201).json({
            message: 'Vaga criada com sucesso!',
            data: novaVaga
        });
    } catch (error) { 
        res.status(500).json({ 
            erro: 'Erro interno do servidor',
            mensagem: error.message
        });
    }
};

exports.listarVagas = async (req, res) => { // listar todas as vagas disponíveis
    try {
        const vagas = await VagaDisponivel.findAll();
        
        res.json({
            message: 'Vagas listadas com sucesso!',
            data: vagas
        });
    } catch (error) {
        res.status(500).json({ 
            erro: 'Erro interno do servidor',
            mensagem: error.message
        });
    }
};

exports.buscarPeloId = async (req, res) => { // buscar vaga disponível pelo ID
  try {
    const vagadisponivel = await VagaDisponivel.findByPk(req.params.id);

    if (!vagadisponivel) {
      return res.status(404).json({
        erro: 'Vaga não encontrada',
        mensagem: `Nenhuma vaga foi encontrada com o ID: ${req.params.id}`
      });
    }

    res.json({
      message: 'Vaga disponível encontrada com sucesso!',
      dados: vagadisponivel
    });
  } catch (error) {
    res.status(500).json({ erro: 'Erro interno do servidor', mensagem: error.message });
  }
};

exports.buscarPeloPsicologoId = async (req, res) => { // buscar vaga disponível pelo ID do psicólogo
    try {
        const vagaPorPsicologo = await VagaDisponivel.findAll({
            where: { psicologoId: req.params.psicologoId }
        });

        if (vagaPorPsicologo.length === 0) {
            return res.status(404).json({
                erro: 'Vaga não encontrada',
                mensagem: `Nenhuma vaga foi encontrada para o psicólogo com o ID: ${req.params.psicologoId}`
            });
        }

        res.json({
            message: 'Vaga disponível encontrada com sucesso!',
            dados: vagaPorPsicologo
        });
    } catch (error) {
        res.status(500).json({ erro: 'Erro interno do servidor', mensagem: error.message });
    }
};

exports.editarVagaPeloId = async (req, res) => { // atualizar vaga pelo ID
    try {
        const vaga = await VagaDisponivel.findByPk(req.params.id);

        if (!vaga) {
            return res.status(404).json({
                erro: 'Vaga não encontrada',
                mensagem: `Nenhuma vaga foi encontrada com o ID: ${req.params.id}`
            });
        }

        if (req.usuario.id !== vaga.psicologoId) {
            return res.status(403).json({
                erro: 'Acesso negado',
                mensagem: 'Você não possui permissão para manipular vagas de outro psicólogo.'
            });
        }

        // impedir edição de vaga agendada
        if (vaga.status === 'agendado') {
            return res.status(400).json(response(false,
                'Não é permitido alterar vagas que já possuem agendamento.'
            ));
        }
        
        const { dataDisp, horaDisp } = req.body;

        const dataAtual = new Date().toISOString().split('T')[0];
        if (dataDisp && dataDisp < dataAtual) {
            return res.status(400).json(response(false,
                'Não é permitido mover a vaga para uma data retroativa.'
            ));
        }
        
        const vagaExistente = await VagaDisponivel.findOne({
            where: {
                psicologoId: vaga.psicologoId,
                dataDisp,
                horaDisp,
                id: { [Op.ne]: vaga.id }
            }
        });

        if (vagaExistente) {
            return res.status(400).json({
                erro: 'Conflito de agenda',
                mensagem: 'Já existe uma vaga cadastrada para este horário.'
            });
        }
        
        await vaga.update(req.body);

        res.json({
            message: 'Vaga atualizada com sucesso!',
            dados: vaga
        });
    } catch (error) { 
        res.status(500).json({ erro: 'Erro interno do servidor', mensagem: error.message });
  }
};

exports.deletarVagaPeloId = async (req, res) => { // excluir vaga pelo ID
    try {
        const vaga = await VagaDisponivel.findByPk(req.params.id);

        if (!vaga) {
            return res.status(404).json({
                erro: 'Vaga não encontrada',
                mensagem: `Nenhuma vaga foi encontrada com o ID: ${req.params.id}`
            });
        }   
        
        if (req.usuario.id !== vaga.psicologoId) {
            return res.status(403).json({
                erro: 'Acesso negado',
                mensagem: 'Você não possui permissão para excluir vagas de outro psicólogo.'
            });
        }
        
        await vaga.destroy();

        res.status(200).json({
            message: 'Vaga excluída com sucesso!',
            idDeletado: req.params.id
        });
    } catch (error) {
        res.status(500).json({ erro: 'Erro interno do servidor', mensagem: error.message });
    }
};