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
                    cli_doc: '12345678900',
                    cli_nome: 'João da Silva',
                    cli_email: 'joao.silva@example.com',
                    cli_telefone: '(11) 98765-4321',
                    cli_status: 1
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


    app.put('/clientes/:cli_cod', clientesController.updateCliente
    /**
        #swagger.tags = ["Clientes"]
        #swagger.summary = 'Atualiza um Cliente pelo ID'
        #swagger.description = 'Atualiza todas as informações de um Cliente existente no sistema'
        #swagger.parameters['cli_cod'] = {
            in: 'path',
            description: 'ID do Cliente',
            required: true,
            type: 'integer'
        }
        #swagger.parameters['updateCliente'] = {
            in: 'body',
            description: 'Informações atualizadas do Cliente',
            required: true,
            schema: {
                    cli_doc: '12345678900',
                    cli_nome: 'João da Silva',
                    cli_email: 'joao.silva@example.com',
                    cli_telefone: '(11) 98765-4321',
                    cli_status: 1
            }
        }
        #swagger.responses[200] = {
            description: 'Cliente atualizado com sucesso',
            schema: {
                    cli_doc: '12345678900',
                    cli_nome: 'João da Silva',
                    cli_email: 'joao.silva@example.com',
                    cli_telefone: '(11) 98765-4321',
                    cli_status: 1
            }
        }
        #swagger.responses[400] = {
            description: 'Dados inválidos'
        }
        #swagger.responses[404] = {
            description: 'Cliente não encontrado'
        }
        #swagger.responses[500] = {
            description: 'Erro ao atualizar cliente'
        }
    */
    );

    app.patch('/clientes/:cli_cod', clientesController.patchCliente
    /**
        #swagger.tags = ["Clientes"]
        #swagger.summary = 'Atualiza um Cliente pelo ID'
        #swagger.description = 'Atualiza as informações de um Cliente existente no sistema'
        #swagger.parameters['cli_cod'] = {
            in: 'path',
            description: 'ID do Cliente',
            required: true,
            type: 'integer'
        }
        #swagger.parameters['updateCliente'] = {
            in: 'body',
            description: 'Informações atualizadas do Cliente',
            required: true,
            schema: {
                    cli_doc: '12345678900',
                    cli_nome: 'João da Silva',
                    cli_email: 'joao.silva@example.com',
                    cli_telefone: '(11) 98765-4321',
                    cli_status: 1
            }
        }
        #swagger.responses[200] = {
            description: 'Cliente atualizado com sucesso',
            schema: {
                    cli_doc: '12345678900',
                    cli_nome: 'João da Silva',
                    cli_email: 'joao.silva@example.com',
                    cli_telefone: '(11) 98765-4321',
                    cli_status: 1
            }
        }
        #swagger.responses[400] = {
            description: 'Dados inválidos'
        }
        #swagger.responses[404] = {
            description: 'Cliente não encontrado'
        }
        #swagger.responses[500] = {
            description: 'Erro ao atualizar cliente'
        }
    */
    );

}