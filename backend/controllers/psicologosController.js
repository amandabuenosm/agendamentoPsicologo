const modelPsicologo = require('../models/psicologosModel');

const controllerPsicologo = {

    mostrarPsicologos: (req, res) => {
        modelPsicologo.mostrarPsicologos((err, results) => {
            if (err) return res.status(500).json({ erro: err });
            res.json(results);
        });
    },

    cadastrarPsicologo: (req, res) => {
        const novoPsicologo = req.body;
        modelPsicologo.cadastrarPsicologo(novoPsicologo, (err, result) => {
            if (err) return res.status(500).json({ erro: err });
            res.status(201).json({ id: result.insertId, ...novoPsicologo });
        });
    },

    editarPsicologo: (req, res) => {
        const id = req.params.id;
        const dadoseditados = req.body;
        modelPsicologo.editarPsicologo(id, dadoseditados, (err) => {
            if (err) return res.status(500).json({ erro: err });
            res.json({ mensagem: 'Dados do psicólogo atualizados com sucesso!' });
        });
    },

    trocarstatus: (req, res) => {
        const id = req.params.id;
        const { status } = req.body;
        modelPsicologo.trocarstatus(id, status, (err) => {
            if (err) return res.status(500).json({ erro: err });
            res.json({ mensagem: 'Status do psicólogo atualizado com sucesso!' });
        });
    },
    
    deletarPsicologo: (req, res) => { 
        const id = req.params.id;
        modelPsicologo.deletarPsicologo(id, (err) => {
            if (err) return res.status(500).json({ erro: err});
            res.json({ mensagem: 'Psicólogo excluído com sucesso!' });
        });
    }
};

module.exports = controllerPsicologo;
