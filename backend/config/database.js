require ('dotenv').config();
const mysql = require('mysql2');

const conexaoDatabase = mysql.createConnection({
  host: process.env.DB_HOST, 
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

conexaoDatabase.connect((err) => {
  if(err) {
    console.error('Erro de Conexão com MySQL');
    return;
  } console.log('Conexão concluída com MySQL')
}); 

module.exports = conexaoDatabase;
