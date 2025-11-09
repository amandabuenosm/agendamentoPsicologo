const { Sequelize } = require('sequelize'); // biblioteca para conexão com banco de dados

const sequelize = new Sequelize({
  database: 'mindcare',
  username: 'root',
  password: 'mysql', 
  host: 'localhost',
  dialect: 'mysql', // tipo de banco de dados
  port: 3306,
  logging: false, // desabilita logs de SQL no console
  pool: { // conjunto de conexões prontas para uso
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000 
  }
});

module.exports = sequelize;
