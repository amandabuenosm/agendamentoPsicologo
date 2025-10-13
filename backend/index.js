require('dotenv').config();
const express = require('express');
const cors = require('cors');

const rotaPsicologos = require('./routes/psicologosRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/psicologos', rotaPsicologos);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
