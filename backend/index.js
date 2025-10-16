require('dotenv').config();
const express = require('express');
const cors = require('cors');

const rotaPsicologos = require('./routes/psicologosRoutes');
const rotaPacientes = require('./routes/pacientesRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/psicologos', rotaPsicologos);
app.use('/pacientes', rotaPacientes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
