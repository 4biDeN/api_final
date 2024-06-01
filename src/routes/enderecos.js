const enderecoController = require('../controllers/enderecos');
const validateEndereco = require('../validators/enderecoValidator');

module.exports = (app) => {
    app.get('/enderecos',  enderecoController.getEnderecos)
    app.post('/enderecos', validateEndereco, enderecoController.postEnderecos)
    app.get('/endereco/:end_cli_cod', enderecoController.getEnderecoByCliente)
    app.delete('/endereco/:end_cod', enderecoController.deleteEndereco)
    app.patch('/endereco/:end_cod', validateEndereco, enderecoController.patchEnderecos)
}