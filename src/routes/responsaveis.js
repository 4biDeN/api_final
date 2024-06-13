const agendaRespController = require('../controllers/responsaveis');

module.exports = (app) => {
    app.get('/agenda_resp/', agendaRespController.getAgendaResp
    /**
        #swagger.tags = ["Responsáveis"]
        #swagger.summary = 'Consulta Lista de Responsáveis de Agenda'
        #swagger.description = 'Consulta lista de Responsáveis de Agenda, todos cadastrados'
    */
    );
    app.post('/agenda_resp', agendaRespController.postAgendaResp
    /**
        #swagger.tags = ["Responsáveis"]
        #swagger.summary = 'Cadastra um novo Responsável de Agenda'
        #swagger.description = 'Cadastra um novo Responsável de Agenda no sistema'
        #swagger.parameters['newAgendaResp'] = {
            in: 'body',
            description: 'Informações do novo Responsável de Agenda',
            required: true,
            schema: {
                agenda_responsaveis: 1,
                agenda_agenda_id: 1
            }
        }
        #swagger.responses[201] = {
            description: 'Responsável de Agenda Criado',
            schema: {
                mensagem: 'Responsável de Agenda criado com sucesso!',
                data: {
                    agenda_responsaveis: 1,
                    agenda_agenda_id: 1
                }
            }
        }  
        #swagger.responses[500] = {
            description: 'Erro ao tentar criar o Responsável de Agenda',
            schema: {
                mensagem: 'Erro no servidor!'
            }
        }
    */
    );
    app.delete('/agenda_resp/:agenda_responsaveis/:agenda_agenda_id', agendaRespController.deleteAgendaResp
    /*
        #swagger.tags = ["Responsáveis"]
        #swagger.summary = 'Deleta um Responsável de Agenda'
        #swagger.description = 'Deleta um Responsável de Agenda baseado nos IDs fornecidos'
        #swagger.parameters['agenda_responsaveis'] = {
            in: 'path',
            description: 'ID do Responsável',
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
    app.put('/agenda_resp/:agenda_responsaveis/:agenda_agenda_id', agendaRespController.updateAgendaResp
    /*
        #swagger.tags = ["Responsáveis"]
        #swagger.summary = 'Atualiza um Responsável de Agenda'
        #swagger.description = 'Atualiza as informações de um Responsável de Agenda existente'
        #swagger.parameters['agenda_responsaveis'] = {
            in: 'path',
            description: 'ID do Responsável',
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
        #swagger.parameters['updatedAgendaResp'] = {
            in: 'body',
            description: 'Informações atualizadas do Responsável de Agenda',
            required: true,
            schema: {
                agenda_responsaveis: 1,
                agenda_agenda_id: 1
            }
        }
    */
    );

    app.patch('/agenda_resp/:agenda_responsaveis/:agenda_agenda_id', agendaRespController.patchAgendaResp
    /*
        #swagger.tags = ["Responsáveis"]
        #swagger.summary = 'Atualiza parcialmente um Responsável de Agenda'
        #swagger.description = 'Atualiza parcialmente as informações de um Responsável de Agenda existente'
        #swagger.parameters['agenda_responsaveis'] = {
            in: 'path',
            description: 'ID do Responsável',
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
            description: 'Campos a serem atualizados no Responsável de Agenda',
            required: true,
            schema: {
                agenda_responsaveis: 1,
                agenda_agenda_id: 1
            }
        }
        #swagger.responses[200] = {
            description: 'Responsável de Agenda atualizado com sucesso',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            agenda_responsaveis: {
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
            description: 'Erro ao atualizar o responsável de agenda',
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
