const database = require('../config/database');

const crudPacientes = {

    mostrarPacientes: (callback) => {
        database.query('SELECT * FROM pacientes', callback);
    },

    cadastrarPaciente: (novoPaciente, callback) => {
        database.query('INSERT INTO pacientes SET ?', novoPaciente, callback);
    },

    editarPaciente: (id, pacienteEdit, callback) => {
        database.query('UPDATE pacientes SET ? WHERE id = ?', [pacienteEdit, id], callback);
    },

    trocarstatus: (id, status, callback) => {
        database.query('UPDATE pacientes SET status = ? WHERE id = ?', [status, id], callback);
    },

    deletarPaciente: (id, callback) => {
        database.query('DELETE FROM pacientes WHERE id = ?', [id], callback);
    },
}