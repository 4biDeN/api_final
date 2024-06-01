const clienteController = require('../controllers/clientes');

module.exports = (app) => {
    app.post('/clientes', clienteController.postCliente);
}