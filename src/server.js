require('dotenv').config();

const express = require('express');
const sequelize = require('./database/database');
const clienteRoutes = require('./routes/clienteRoutes');

const app = express();

// JSON identado ajuda na visualização em desenvolvimento.
if (process.env.NODE_ENV !== 'production') {
  app.set('json spaces', 2);
}

app.use(express.json());
app.use('/', clienteRoutes);

// Middleware simples de tratamento de erro.
app.use((err, req, res, next) => {
  console.error(err);
  return res.status(500).json({ erro: 'Erro interno do servidor.' });
});

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('Falha ao iniciar aplicação:', error);
    process.exit(1);
  }
})();

module.exports = app;
