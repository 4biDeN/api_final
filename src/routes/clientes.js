const clientesController = require('../controllers/clientes');

module.exports = (app) => {
    app.get('/clientes', clientesController.getClientes
    /**
        #swagger.tags = ["Clientes"]
        #swagger.summary = 'Consulta Lista de Clientes, Somente Ativos'
        #swagger.description = 'Consulta lista de Clientes Ativos'
    */
    );

    app.post('/clientes', clientesController.postCliente
    /**
        #swagger.tags = ["Clientes"]
        #swagger.summary = 'Cadastra um novo Cliente'
        #swagger.description = 'Cadastra um novo Cliente no sistema'
        #swagger.parameters['newCliente'] = {
            in: 'body',
            description: 'Informações do novo Cliente',
            required: true,
            schema: {
                type: 'object',
                properties: {
                    cli_doc: {
                        type: 'string',
                        example: '12345678900'
                    },
                    cli_nome: {
                        type: 'string',
                        example: 'João da Silva'
                    },
                    cli_email: {
                        type: 'string',
                        example: 'joao.silva@example.com'
                    },
                    cli_telefone: {
                        type: 'string',
                        example: '(11) 98765-4321'
                    },
                    cli_status: {
                        type: 'string',
                        example: 'ativo'
                    }
                }
            }
        }
    */
    );

    app.get('/clientes/:cli_cod', clientesController.getClienteById
    /**
        #swagger.tags = ["Clientes"]
        #swagger.summary = 'Consulta Cliente por ID'
        #swagger.description = 'Consulta um Cliente pelo ID'
        #swagger.parameters['cli_cod'] = {
            in: 'path',
            description: 'ID do Cliente',
            required: true,
            type: 'integer'
        }
    */
    );

    app.delete('/clientes/:cli_cod', clientesController.deleteCliente
    /*
        #swagger.tags = ["Clientes"]
        #swagger.summary = 'Deleta um Cliente'
        #swagger.description = 'Deleta um Cliente baseado no ID fornecido'
        #swagger.parameters['cli_cod'] = {
            in: 'path',
            description: 'ID do Cliente',
            required: true,
            type: 'integer'
        }
    */
    
    );
}