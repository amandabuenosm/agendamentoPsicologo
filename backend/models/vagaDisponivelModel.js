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
            model: 'psicologos', // nome da tabela referenciada
            key: 'id'
        },
        onDelete: 'CASCADE',
        unique: 'horarioPorPsicologo'
    },

    dataDisp: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        unique: 'horarioPorPsicologo' // garante que não haja duplicidade de horários para o mesmo psicólogo
    },

    horaDisp: {
        type: DataTypes.TIME,
        allowNull: false,
        unique: 'horarioPorPsicologo'
    },

    status: {
        type: DataTypes.ENUM('livre', 'reservado', 'bloqueado'),
        defaultValue: 'livre',
        allowNull: false
    }

}, {
    tableName: 'vagasDisponiveis',
    timestamps: true
});

// associação entre as tabelas para chaves estrangeiras
Psicologo.hasMany(VagaDisponivel, { foreignKey: 'psicologoId' });
VagaDisponivel.belongsTo(Psicologo, { foreignKey: 'psicologoId' });

module.exports = VagaDisponivel;
