const deptController = require('../controllers/dept');
const express = require('express');

module.exports = (app) => {
    app.get('/dept', deptController.getDept
    /**
        #swagger.tags = ["Departamento"]
        #swagger.summary = 'Consulta Lista de Departamentos'
        #swagger.description = 'Consulta lista de Departamentos, todos cadastrados'
    */
    );
    app.post('/dept', deptController.postDept
    /**
        #swagger.tags = ["Departamento"]
        #swagger.summary = 'Cadastra um novo Departamento'
        #swagger.description = 'Cadastra um novo Departamento no sistema'
        #swagger.parameters['newDept'] = {
            in: 'body',
            description: 'Informações do novo Departamento',
            required: true,
            schema: {
                dep_nome: 'Nome do Departamento',
                dep_sigla: 'SIGLA',
                dep_descricao: 'Descrição do Departamento',
                dep_localizacao: 'Localização do Departamento',
                dep_resp: 1
            }
        }
        #swagger.responses[201] = {
            description: 'Departamento Criado',
            schema: {
                mensagem: 'Departamento criado com sucesso!',
                id: 1
            }
        }  
        #swagger.responses[500] = {
            description: 'Erro ao tentar criar o Departamento',
            schema: {
                mensagem: 'Erro no servidor!'
            }
        }
    */
    );
    app.delete('/dept/:dept_id', deptController.deleteDept
    /*
        #swagger.tags = ["Departamento"]
        #swagger.summary = 'Deleta um Departamento'
        #swagger.description = 'Deleta um Departamento baseado no ID fornecido'
        #swagger.parameters['dept_id'] = {
            in: 'path',
            description: 'ID do Departamento',
            required: true,
            type: 'integer'
        }
    */
    );
    app.put('/dept/:dep_id', deptController.updateDept
    /*
        #swagger.tags = ["Departamento"]
        #swagger.summary = 'Atualiza um Departamento'
        #swagger.description = 'Atualiza as informações de um Departamento existente'
        #swagger.parameters['dep_id'] = {
            in: 'path',
            description: 'ID do Departamento',
            required: true,
            type: 'integer',
            example: 1
        }
        #swagger.parameters['updatedDept'] = {
            in: 'body',
            description: 'Informações atualizadas do Departamento',
            required: true,
            schema: {
                dep_nome: 'Nome do Departamento',
                dep_sigla: 'SIGLA',
                dep_descricao: 'Descrição do Departamento',
                dep_localizacao: 'Localização do Departamento',
                dep_resp: 1
            }
        }
    */
    );

    app.patch('/dept/:dep_id', deptController.patchDept
    /*
        #swagger.tags = ["Departamento"]
        #swagger.summary = 'Atualiza parcialmente um Departamento'
        #swagger.description = 'Atualiza parcialmente as informações de um Departamento existente'
        #swagger.parameters['dep_id'] = {
            in: 'path',
            description: 'ID do Departamento',
            required: true,
            type: 'integer'
        }
        #swagger.parameters['updatedFields'] = {
            in: 'body',
            description: 'Campos a serem atualizados no Departamento',
            required: true,
            schema: {
                dep_nome: 'Tecnologia da Informação',
                dep_sigla:'TI',
                dep_descricao: 'Departamento de TI',
                dep_localizacao: 'Edifício Norte',
                dep_resp: 3
            }
        }
        #swagger.responses[200] = {
            description: 'Departamento atualizado com sucesso',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            dep_id: {
                                type: 'integer'
                            },
                            dep_nome: {
                                type: 'string'
                            },
                            dep_sigla: {
                                type: 'string'
                            },
                            dep_descricao: {
                                type: 'string'
                            },
                            dep_localizacao: {
                                type: 'string'
                            },
                            dep_resp: {
                                type: 'integer'
                            }
                        }
                    }
                }
            }
        }
        #swagger.responses[500] = {
            description: 'Erro ao atualizar o departamento',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            error: {
                                type: 'string'
                            }
                        }
                    }
                }
            }
        }
    */
);

};
