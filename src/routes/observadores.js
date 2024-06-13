const observadoresController = require('../controllers/observadores');
const express = require('express');

module.exports = (app) => {
    app.get('/observadores', observadoresController.getAgendaObser
    /**
        #swagger.tags = ["Observadores"]
        #swagger.summary = 'Consulta Lista de Observadores'
        #swagger.description = 'Consulta lista de Observadores, todos cadastrados'
    */
    );

    app.post('/observadores', observadoresController.postAgendaObser
    /**
        #swagger.tags = ["Observadores"]
        #swagger.summary = 'Cadastra um novo Observador'
        #swagger.description = 'Cadastra um novo Observador no sistema'
        #swagger.parameters['newObservador'] = {
            in: 'body',
            description: 'Informações do novo Observador',
            required: true,
            schema: {
                agenda_observador: 1,
                agenda_agenda_id: 1
            }
        }
        #swagger.responses[201] = {
            description: 'Observador Criado',
            schema: {
                mensagem: 'Observador criado com sucesso!',
                agenda_observador: 1,
                agenda_agenda_id: 1
            }
        }  
        #swagger.responses[500] = {
            description: 'Erro ao tentar criar o Observador',
            schema: {
                mensagem: 'Erro no servidor!'
            }
        }
    */
    );

    app.delete('/observadores/:agenda_observador/:agenda_agenda_id', observadoresController.deleteAgendaObser
    /*
        #swagger.tags = ["Observadores"]
        #swagger.summary = 'Deleta um Observador'
        #swagger.description = 'Deleta um Observador baseado nos IDs fornecidos'
        #swagger.parameters['agenda_observador'] = {
            in: 'path',
            description: 'ID do Observador',
            required: true,
            type: 'integer'
        }
        #swagger.parameters['agenda_agenda_id'] = {
            in: 'path',
            description: 'ID da Agenda',
            required: true,
            type: 'integer'
        }
    */
    );

    app.put('/observadores/:agenda_observador/:agenda_agenda_id', observadoresController.updateAgendaObser
    /*
        #swagger.tags = ["Observadores"]
        #swagger.summary = 'Atualiza um Observador'
        #swagger.description = 'Atualiza as informações de um Observador existente'
        #swagger.parameters['agenda_observador'] = {
            in: 'path',
            description: 'ID do Observador',
            required: true,
            type: 'integer',
            example: 1
        }
        #swagger.parameters['agenda_agenda_id'] = {
            in: 'path',
            description: 'ID da Agenda',
            required: true,
            type: 'integer',
            example: 1
        }
        #swagger.parameters['updatedObservador'] = {
            in: 'body',
            description: 'Informações atualizadas do Observador',
            required: true,
            schema: {
                agenda_observador: 1,
                agenda_agenda_id: 1
            }
        }
    */
    );

    app.patch('/observadores/:agenda_observador/:agenda_agenda_id', observadoresController.patchAgendaObser
    /*
        #swagger.tags = ["Observadores"]
        #swagger.summary = 'Atualiza parcialmente um Observador'
        #swagger.description = 'Atualiza parcialmente as informações de um Observador existente'
        #swagger.parameters['agenda_observador'] = {
            in: 'path',
            description: 'ID do Observador',
            required: true,
            type: 'integer'
        }
        #swagger.parameters['agenda_agenda_id'] = {
            in: 'path',
            description: 'ID da Agenda',
            required: true,
            type: 'integer'
        }
        #swagger.parameters['updatedFields'] = {
            in: 'body',
            description: 'Campos a serem atualizados no Observador',
            required: true,
            schema: {
                agenda_observador: 1,
                agenda_agenda_id: 1
            }
        }
        #swagger.responses[200] = {
            description: 'Observador atualizado com sucesso',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            agenda_observador: {
                                type: 'integer'
                            },
                            agenda_agenda_id: {
                                type: 'integer'
                            }
                        }
                    }
                }
            }
        }
        #swagger.responses[500] = {
            description: 'Erro ao atualizar o observador',
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
