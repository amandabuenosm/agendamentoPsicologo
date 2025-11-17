const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcrypt');

const Paciente = sequelize.define('Paciente', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    nomePaciente: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cpfPaciente: {
        type: DataTypes.STRING(14),
        allowNull: false,
        unique: true
    },
    emailPaciente: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    telefonePaciente: {
        type: DataTypes.STRING,
        allowNull: false
    },
    idadePaciente: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    localizacaoPaciente: {
        type: DataTypes.STRING,
        allowNull: false
    },
    senhaPaciente: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { hooks: { // criptografia de senhas
        beforeCreate: async (paciente) => {
            if (paciente.senhaPaciente) {
                paciente.senhaPaciente = await bcrypt.hash(paciente.senhaPaciente, 10);
            }
        },
        beforeUpdate: async (paciente) => {
            if (paciente.changed('senha') && paciente.senhaPaciente) {
                paciente.senhaPaciente = await bcrypt.hash(paciente.senhaPaciente, 10);
            }
        }
    }   
});

Paciente.prototype.validarSenha = function(senhaPaciente) { // validar senha
  return bcrypt.compare(senhaPaciente, this.senhaPaciente);
};

module.exports = Paciente;
