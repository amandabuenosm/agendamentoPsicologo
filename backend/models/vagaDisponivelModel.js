const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Psicologo = require('./psicologosModel');

const VagaDisponivel = sequelize.define('VagaDisponivel', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },

    psicologoId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Psicologo, // nome da tabela referenciada
            key: 'id'
        },
        onDelete: 'CASCADE',
        unique: 'horarioPorPsicologo'
    },

    dataDisp: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        unique: 'horarioPorPsicologo', // garante que não haja duplicidade de horários para o mesmo psicólogo
        validate: {
            isDate: true
        }
    },

    horaDisp: {
        type: DataTypes.TIME,
        allowNull: false,
        unique: 'horarioPorPsicologo',
        validate: {
            is: /^(0\d|1\d|2[0-3]):([0-5]\d)$/ // valida Hora:Minuto
        }
    },

    status: {
        type: DataTypes.ENUM('livre', 'agendado'),
        defaultValue: 'livre',
        allowNull: false
    }
}, {
    tableName: 'vagasdisponiveis',
    freezeTableName: true
});

// associação entre as tabelas para chaves estrangeiras
Psicologo.hasMany(VagaDisponivel, { foreignKey: 'psicologoId' });
VagaDisponivel.belongsTo(Psicologo, { foreignKey: 'psicologoId' });

module.exports = VagaDisponivel;
