const database = require('../config/database');

const crudPsicologos = {

    mostrarPsicologos: (callback) => {
        database.query('SELECT * FROM psicologos', callback);
    },

    cadastrarPsicologo: (novoPsicologo, callback) => {
        database.query('INSERT INTO psicologos SET ?', novoPsicologo, callback);
    },

    editarPsicologo: (id, psicologoEdit, callback) => {
        database.query('UPDATE psicologos SET ? WHERE id = ?', [psicologoEdit, id], callback);
    },

    trocarstatus: (id, status, callback) => {
        database.query('UPDATE psicologos SET status = ? WHERE id = ?', [status, id], callback);
    },

    deletarPsicologo: (id, callback) => {
        database.query('DELETE FROM psicologos WHERE id = ?', [id], callback);
    },
}

module.exports = crudPsicologos;
