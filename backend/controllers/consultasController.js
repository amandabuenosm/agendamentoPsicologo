const Consulta = require('../models/consultasModel');
const Paciente = require('../models/pacientesModel');
const Psicologo = require('../models/psicologosModel');
const VagaDisponivel = require('../models/vagaDisponivelModel');

exports.agendarConsulta = async (req, res) => { // paciente logado vai criar nova consulta
    try {
        const pacienteId = req.headers['x-user-id'];
        const { psicologoId, vagadispId, observacao } = req.body;

        if (!pacienteId) { // verificar se paciente está logado
            return res.status(403).json({
            erro: 'Acesso negado',
            mensagem: 'ID do Paciente/Usuário não informado.'
            });
        }

        // verificar se psicólogo existe
        const psicologoExistente = await Psicologo.findByPk(psicologoId);
        if (!psicologoExistente) {
            return res.status(404).json({ message: 'Psicólogo não encontrado.' });
        }

        // verificar se vaga existe
        const vaga = await VagaDisponivel.findByPk(vagadispId);
        if (!vaga) {
            return res.status(404).json({ message: 'Vaga não encontrada.' });
        }
        
        // if (vaga.livre === false) { // não permitir agendar em vaga já ocupada
        //     return res.status(400).json({ message: 'Esta vaga já está em uso em outra consulta.' });
        // }

        // if (vaga.psicologoId !== psicologoId) { // ver se vaga está relacionada ao psicólogo informado
        //     return res.status(400).json({
        //         message: 'A vaga selecionada não pertence ao psicólogo informado.'
        //     });
        // }

        const consulta = await Consulta.create({
            pacienteId,
            psicologoId,
            vagadispId,
            observacao,
            statusConsulta: 'pendente'
        });

        await vaga.update({ livre: false });

        return res.status(201).json({
            message: 'Consulta agendada com sucesso! Aguardando confirmação do psicólogo.',
            data: consulta
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ 
            erro: 'Erro interno do servidor.', mensagem: error.message });
    }
}

exports.confirmarConsulta = async (req, res) => { // psicólogo logado vai confirmar consulta
    try {
        const psicologoId = req.headers['x-user-id']; 
        const { consultaId } = req.body;

        if (!psicologoId) {
            return res.status(403).json({ 
            message: 'Acesso negado. Psicólogo não autenticado.' });
        }

        const consulta = await Consulta.findByPk(consultaId);
        if (!consulta) {
            return res.status(404).json({ message: 'Consulta não encontrada.' });
        }

        if (consulta.psicologoId !== psicologoId) {
            return res.status(403).json({
                message: 'Operação não autorizada. Esta consulta não pertence ao psicólogo autenticado.'
            });
        }

        if (consulta.statusConsulta !== 'pendente') {
            return res.status(400).json({
                message: 'A consulta não está pendente e portanto não pode ser confirmada.'
            });
        }

        await consulta.update({ statusConsulta: 'confirmada' });

        return res.status(200).json({
            message: 'Consulta confirmada com sucesso.',
            data: consulta
        });

    } catch (error) {
        return res.status(500).json({
            erro: 'Erro interno do servidor.',
            mensagem: error.message
        });
    }
};