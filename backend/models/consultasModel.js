const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Paciente = require('./pacientesModel');
const Psicologo = require('./psicologosModel');
const VagaDisponivel = require('./vagaDisponivelModel');

const Consulta = sequelize.define('Consulta', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    
    pacienteId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'pacientes',
            key: 'id'
        },
        onDelete: 'CASCADE'
    },

    psicologoId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'psicologos',
            key: 'id'
        },
        onDelete: 'CASCADE'
    },

    vagadispId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'vagasdisponiveis',
            key: 'id'
        },
        onDelete: 'CASCADE'
    },

    statusConsulta: {
        type: DataTypes.ENUM('pendente', 'confirmada', 'cancelada'),
        defaultValue: 'pendente',
        allowNull: false
    },

    observacao: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'consultas',
    timestamps: true
});

// associações entre as tabelas para chaves estrangeiras
Paciente.hasMany(Consulta, { foreignKey: 'pacienteId' });
Consulta.belongsTo(Paciente, { foreignKey: 'pacienteId' });

Psicologo.hasMany(Consulta, { foreignKey: 'psicologoId' });
Consulta.belongsTo(Psicologo, { foreignKey: 'psicologoId' });

VagaDisponivel.hasOne(Consulta, { foreignKey: 'vagadispId' });
Consulta.belongsTo(VagaDisponivel, { foreignKey: 'vagadispId', targetKey: 'id' });

module.exports = Consulta;