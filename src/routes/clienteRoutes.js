const express = require('express');
const clienteController = require('../controllers/clienteController');

const router = express.Router();

router.get('/clientes', clienteController.getAllClientes);
router.get('/clientes/:id', clienteController.getClienteById);
router.post('/clientes', clienteController.createCliente);
router.put('/clientes/:id', clienteController.updateCliente);
router.delete('/clientes/:id', clienteController.deleteCliente);
router.get('/relatorio', clienteController.getRelatorio);

module.exports = router;

