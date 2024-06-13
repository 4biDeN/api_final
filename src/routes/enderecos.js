const enderecoController = require('../controllers/enderecos');
const validateEndereco = require('../validators/enderecoValidator');

module.exports = (app) => {
    app.get('/enderecos', enderecoController.getEnderecos
    /**
        #swagger.tags = ["Endereços"]
        #swagger.summary = 'Consulta Lista de Endereços'
        #swagger.description = 'Consulta lista de todos os Endereços cadastrados'
        #swagger.responses[200] = {
            description: "Lista de enderços",
            schema: {
            "total": 1,
                "enderecos": [
                {
                    "end_cod": 1,
                    "end_cli_cod": 1,
                    "end_cep": "01001000",
                    "end_logradouro": "Praça da Sé",
                    "end_bairro": "Sé",
                    "end_numero": "100",
                    "end_uf": "SP",
                    "end_complemento": "Próximo à catedral",
                    "end_contato": "11999999999",
                    "end_tipo": 1,
                    "end_status": 1
                }]
                }
            }
*/
    );

    app.post('/enderecos', validateEndereco, enderecoController.postEnderecos
    /**
        #swagger.tags = ["Endereços"]
        #swagger.summary = 'Cadastra um novo Endereço'
        #swagger.description = 'Cadastra um novo Endereço no sistema'
        #swagger.parameters['newEndereco'] = {
            in: 'body',
            description: 'Informações do novo Endereço',
            required: true,
            schema: {
                end_cli_cod: 1,
                end_cep: '01000000',
                end_logradouro: 'Rua das Flores',
                end_bairro: 'Centro',
                end_numero: '123',
                end_uf: 'SP',
                end_complemento: 'Apto 101',
                end_contato: 3366-1011,
                end_tipo: 1, 
                end_status: 1
            }
        }
        #swagger.responses[201] = {
            description: 'Endereço Criado',
            schema: {
                end_cli_cod: 1,
                end_cep: '01000000',
                end_logradouro: 'Rua das Flores',
                end_bairro: 'Centro',
                end_numero: '123',
                end_uf: 'SP',
                end_complemento: 'Apto 101',
                end_contato: 3366-1011,
                end_tipo: 1, 
                end_status: 1
            }
        }  
        #swagger.responses[500] = {
            description: 'Erro ao tentar criar o Endereço',
            schema: {
                mensagem: 'Erro no servidor!'
            }
        }
    */
    );

    app.get('/endereco/:end_cli_cod', enderecoController.getEnderecoByCliente
    /**
        #swagger.tags = ["Endereços"]
        #swagger.summary = 'Consulta Endereço por Código do Cliente'
        #swagger.description = 'Consulta um Endereço pelo Código do Cliente'
        #swagger.parameters['end_cli_cod'] = {
            in: 'path',
            description: 'Código do Cliente',
            required: true,
            type: 'integer'
        }
        #swagger.responses[200] = {
            description: "Lista de enderços",
            schema: {
            "total": 1,
                "enderecos": [
                {
                    "end_cod": 1,
                    "end_cli_cod": 1,
                    "end_cep": "01001000",
                    "end_logradouro": "Praça da Sé",
                    "end_bairro": "Sé",
                    "end_numero": "100",
                    "end_uf": "SP",
                    "end_complemento": "Próximo à catedral",
                    "end_contato": "11999999999",
                    "end_tipo": 1,
                    "end_status": 1
                }]
                }
            }
    */
    );

    app.delete('/endereco/:end_cod', enderecoController.deleteEndereco
    /**
        #swagger.tags = ["Endereços"]
        #swagger.summary = 'Deleta um Endereço'
        #swagger.description = 'Deleta um Endereço baseado no Código fornecido'
        #swagger.parameters['end_cod'] = {
            in: 'path',
            description: 'Código do Endereço',
            required: true,
            type: 'integer'
        }
    */
    );

    app.put('/enderecos/:end_cod', validateEndereco, enderecoController.updateEnderecos
    /** 
        #swagger.tags = ["Endereços"]
        #swagger.summary = 'Atualiza um Endereço'
        #swagger.description = 'Atualiza um Endereço baseado no Código fornecido'
        #swagger.parameters['end_cod'] = {
            in: 'path',
            description: 'Código do Endereço',
            required: true,
            type: 'integer'
        }
        #swagger.parameters['updatedEnderecos'] = {
            in: 'body',
            description: 'Informações atualizadas do Endereço',
            required: true,
            schema: {
                end_cli_cod: 3,
                end_cep: "30140071",
                end_logradouro: "Av. Afonso Pena",
                end_bairro: "Centro",
                end_numero: "300",
                end_uf: "MG",
                end_complemento: "Em frente ao Parque Municipal",
                end_contato: "31999999999",
                end_tipo: 1,
                end_status: 1
            }
        }
    */
    );

    app.patch('/endereco/:end_cod', enderecoController.patchEnderecos
    /**
        #swagger.tags = ["Endereços"]
        #swagger.summary = 'Atualiza um Endereço'
        #swagger.description = 'Atualiza um Endereço baseado no Código fornecido'
        #swagger.parameters['end_cod'] = {
            in: 'path',
            description: 'Código do Endereço',
            required: true,
            type: 'integer'
        }
        #swagger.parameters['updatedEndereco'] = {
            in: 'body',
            description: 'Informações atualizadas do Endereço',
            required: true,
            schema: {
                type: 'object',
                properties: {
                    end_logradouro: {
                        type: 'string',
                        example: 'Rua das Flores'
                    },
                    end_numero: {
                        type: 'string',
                        example: '123'
                    },
                    end_complemento: {
                        type: 'string',
                        example: 'Apto 101'
                    },
                    end_bairro: {
                        type: 'string',
                        example: 'Centro'
                    },
                    end_cidade: {
                        type: 'string',
                        example: 'São Paulo'
                    },
                    end_estado: {
                        type: 'string',
                        example: 'SP'
                    },
                    end_cep: {
                        type: 'string',
                        example: '01000-000'
                    }
                }
            }
        }
    */
    );
};
