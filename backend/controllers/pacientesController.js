const modelPaciente = require('../models/pacientesModel');

const controllerPaciente = {

    mostrarPacientes: (req, res) => {
        modelPaciente.mostrarPacientes((err, results) => {
            if (err) return res.status(500).json({ erro: err });
            res.json(results);
        });
    },

    cadastrarPaciente: (req, res) => {
        const novoPaciente = req.body;  
        modelPaciente.cadastrarPaciente(novoPaciente, (err, result) => {
            if (err) return res.status(500).json({ erro: err });
            res.status(201).json({ id: result.insertId, ...novoPaciente });
        });
    },

    editarPaciente: (req, res) => {
        const id = req.params.id;
        const dadoseditados = req.body; 
        modelPaciente.editarPaciente(id, dadoseditados, (err) => {
            if (err) return res.status(500).json({ erro: err });
            res.json({ mensagem: 'Dados do paciente atualizados com sucesso!' });
        });
    },

    trocarstatus: (req, res) => {
        const id = req.params.id;
        const { status } = req.body;
        modelPaciente.trocarstatus(id, status, (err) => {
            if (err) return res.status(500).json({ erro: err });
            res.json({ mensagem: 'Status do paciente atualizado com sucesso!' });
        });
    },

    deletarPaciente: (req, res) => { 
        const id = req.params.id;
        modelPaciente.deletarPaciente(id, (err) => {
            if (err) return res.status(500).json({ erro: err});
            res.json({ mensagem: 'Paciente excluído com sucesso!' });
        });
    }
}

module.exports = controllerPaciente;