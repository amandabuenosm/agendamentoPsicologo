const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const rotaPsicologos = require('./routes/psicologosRoutes');
const rotaPacientes = require('./routes/pacientesRoutes');
const rotaVagasDisp = require('./routes/vagaDisponivelRoutes');
const rotaConsultas = require('./routes/consultasRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/psicologos', rotaPsicologos);
app.use('/api/pacientes', rotaPacientes);
app.use('/api/vagasdisp', rotaVagasDisp);
app.use('/api/consultas', rotaConsultas);

const connectDB = async () => { // conectar ao banco de dados
  try {
    await sequelize.authenticate();
    console.log('✅ Conectado ao MySQL com sucesso!');
    await sequelize.sync({ force: false });
    console.log('✅ Tabelas sincronizadas!');
  } catch (error) {
    console.error('❌ Erro de conexão com o banco de dados:', error);
  }
};
connectDB();

app.use((error, req, res, next) => { // log de erros de servidor
  console.error(error);
  res.status(500).json({ error: 'Erro interno do servidor' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`📝 Documentação: http://localhost:${PORT}`);
});
