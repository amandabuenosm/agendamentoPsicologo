const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcrypt');

const Psicologo = sequelize.define('Psicologo', {
    id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
    },
    nomePsicologo: {
    type: DataTypes.STRING,
    allowNull: false
    },
    cpfPsicologo: {
    type: DataTypes.STRING(14),
    allowNull: false,
    unique: true
    },
    emailPsicologo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
        isEmail: true
    }
    },
    telefonePsicologo: {
    type: DataTypes.STRING,
    allowNull: false
    },
    idadePsicologo: {
    type: DataTypes.INTEGER,
    allowNull: false
    },
    crp: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
    },
    estadoCrp: {
    type: DataTypes.STRING(2),
    allowNull: false
    },
    especialidades: {
    type: DataTypes.STRING,
    allowNull: false
    },
    formacao: {
    type: DataTypes.TEXT,
    allowNull: false
    },
    experiencia: {
    type: DataTypes.INTEGER,
    allowNull: false
    },
    modalidadeAtendimento: {
    type: DataTypes.STRING,
    allowNull: false
    },
    valorConsulta: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
    },
    localAtendimento: {
    type: DataTypes.TEXT,
    allowNull: false
    },
    senhaPsicologo: {
    type: DataTypes.STRING,
    allowNull: false
    }
}, { hooks: { // criptografia de senhas
        beforeCreate: async (psicologo) => {
            if (psicologo.senhaPsicologo) {
            psicologo.senhaPsicologo = await bcrypt.hash(psicologo.senhaPsicologo, 10);
            }
        },
        beforeUpdate: async (psicologo) => {
            if (psicologo.changed('senha') && psicologo.senhaPsicologo) {
            psicologo.senhaPsicologo = await bcrypt.hash(psicologo.senhaPsicologo, 10);
            }
        }
    }
});

Psicologo.prototype.validarSenha = function(senhaPsicologo) { // validar senha
  return bcrypt.compare(senhaPsicologo, this.senhaPsicologo);
};

Psicologo.prototype.atualizarSenha = async function(novaSenhaPsicologo) { // atualizar senha
  this.senhaPsicologo = novaSenhaPsicologo;
  return await this.save();
};

module.exports = Psicologo;
