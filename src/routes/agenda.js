const agendaController = require('../controllers/agenda');

module.exports = (app) => {
    app.get('/agenda/:agenda_id', agendaController.getAgenda
        /**
            #swagger.tags = ["Agenda"]
            #swagger.summary = 'Consulta uma Agenda específica'
            #swagger.description = 'Consulta uma agenda específica pelo ID'
            #swagger.parameters['agenda_id'] = {
                in: 'path',
                description: 'ID da Agenda',
                required: true,
                type: 'integer'
            }
            #swagger.responses[200] = {
                description: "Detalhes da agenda",
                schema: {
                    "agenda_id": 1,
                    "agenda_tipo_acao": 1,
                    "agenda_dept_id": 1,
                    "agenda_cli_cod": 1,
                    "agenda_criado_em": "2024-06-13",
                    "agenda_alterado_em": "2024-06-14",
                    "agenda_finalizado_em": "2024-06-15",
                    "agenda_criado_por": 1,
                    "agenda_fechado_por": 2,
                    "agenda_descricao": "Descrição da agenda",
                    "agenda_status": 1
                }
            }
            #swagger.responses[404] = {
                description: 'Agenda não encontrada',
                schema: {
                    mensagem: 'Agenda não encontrada'
                }
            }
            #swagger.responses[500] = {
                description: 'Erro ao tentar buscar a Agenda',
                schema: {
                    mensagem: 'Erro no servidor!'
                }
            }
        */
    );

    app.post('/agenda', agendaController.postAgenda
        /**
            #swagger.tags = ["Agenda"]
            #swagger.summary = 'Cadastra uma nova Agenda'
            #swagger.description = 'Cadastra uma nova Agenda no sistema'
            #swagger.parameters['newAgenda'] = {
                in: 'body',
                description: 'Informações da nova Agenda',
                required: true,
                schema: {
                    agenda_tipo_acao: 1,
                    agenda_dept_id: 1,
                    agenda_cli_cod: 1,
                    agenda_criado_em: "2024-06-13",
                    agenda_alterado_em: "2024-06-14",
                    agenda_finalizado_em: "2024-06-15",
                    agenda_criado_por: 1,
                    agenda_fechado_por: 2,
                    agenda_descricao: "Descrição da agenda",
                    agenda_status: 1
                }
            }
            #swagger.responses[201] = {
                description: 'Agenda Criada',
                schema: {
                    agenda_tipo_acao: 1,
                    agenda_dept_id: 1,
                    agenda_cli_cod: 1,
                    agenda_criado_em: "2024-06-13",
                    agenda_alterado_em: "2024-06-14",
                    agenda_finalizado_em: "2024-06-15",
                    agenda_criado_por: 1,
                    agenda_fechado_por: 2,
                    agenda_descricao: "Descrição da agenda",
                    agenda_status: 1
                }
            }  
            #swagger.responses[500] = {
                description: 'Erro ao tentar criar a Agenda',
                schema: {
                    mensagem: 'Erro no servidor!'
                }
            }
        */
    );

    app.get('/agenda/cliente/:cliente_id', agendaController.getAgendaByClienteId
        /**
            #swagger.tags = ["Agenda"]
            #swagger.summary = 'Consulta agendas por ID do Cliente'
            #swagger.description = 'Consulta todas as agendas associadas a um cliente específico pelo ID do Cliente'
            #swagger.parameters['cliente_id'] = {
                in: 'path',
                description: 'ID do Cliente',
                required: true,
                type: 'integer'
            }
            #swagger.responses[200] = {
                description: "Lista de agendas do cliente",
                schema: [{
                    "agenda_id": 1,
                    "agenda_tipo_acao": 1,
                    "agenda_dept_id": 1,
                    "agenda_cli_cod": 1,
                    "agenda_criado_em": "2024-06-13",
                    "agenda_alterado_em": "2024-06-14",
                    "agenda_finalizado_em": "2024-06-15",
                    "agenda_criado_por": 1,
                    "agenda_fechado_por": 2,
                    "agenda_descricao": "Descrição da agenda",
                    "agenda_status": 1
                }]
            }
            #swagger.responses[404] = {
                description: 'Nenhuma agenda encontrada para o cliente especificado',
                schema: {
                    mensagem: 'Nenhuma agenda encontrada para o cliente especificado'
                }
            }
            #swagger.responses[500] = {
                description: 'Erro ao tentar buscar as agendas do cliente',
                schema: {
                    mensagem: 'Erro no servidor!'
                }
            }
        */
    );

    app.get('/agenda/departamento/:dept_id', agendaController.getAgendaByDeptId
        /**
            #swagger.tags = ["Agenda"]
            #swagger.summary = 'Consulta agendas por ID do Departamento'
            #swagger.description = 'Consulta todas as agendas associadas a um departamento específico pelo ID do Departamento'
            #swagger.parameters['dept_id'] = {
                in: 'path',
                description: 'ID do Departamento',
                required: true,
                type: 'integer'
            }
            #swagger.responses[200] = {
                description: "Lista de agendas do departamento",
                schema: [{
                    "agenda_id": 1,
                    "agenda_tipo_acao": 1,
                    "agenda_dept_id": 1,
                    "agenda_cli_cod": 1,
                    "agenda_criado_em": "2024-06-13",
                    "agenda_alterado_em": "2024-06-14",
                    "agenda_finalizado_em": "2024-06-15",
                    "agenda_criado_por": 1,
                    "agenda_fechado_por": 2,
                    "agenda_descricao": "Descrição da agenda",
                    "agenda_status": 1
                }]
            }
            #swagger.responses[404] = {
                description: 'Nenhuma agenda encontrada para o departamento especificado',
                schema: {
                    mensagem: 'Nenhuma agenda encontrada para o departamento especificado'
                }
            }
            #swagger.responses[500] = {
                description: 'Erro ao tentar buscar as agendas do departamento',
                schema: {
                    mensagem: 'Erro no servidor!'
                }
            }
        */
    );

    app.get('/agenda/tipo/:tipo_id', agendaController.getAgendaByTipoId
        /**
            #swagger.tags = ["Agenda"]
            #swagger.summary = 'Consulta agendas por ID do Tipo'
            #swagger.description = 'Consulta todas as agendas associadas a um tipo de ação específico pelo ID do Tipo'
            #swagger.parameters['tipo_id'] = {
                in: 'path',
                description: 'ID do Tipo de Ação',
                required: true,
                type: 'integer'
            }
            #swagger.responses[200] = {
                description: "Lista de agendas do tipo de ação",
                schema: [{
                    "agenda_id": 1,
                    "agenda_tipo_acao": 1,
                    "agenda_dept_id": 1,
                    "agenda_cli_cod": 1,
                    "agenda_criado_em": "2024-06-13",
                    "agenda_alterado_em": "2024-06-14",
                    "agenda_finalizado_em": "2024-06-15",
                    "agenda_criado_por": 1,
                    "agenda_fechado_por": 2,
                    "agenda_descricao": "Descrição da agenda",
                    "agenda_status": 1
                }]
            }
            #swagger.responses[404] = {
                description: 'Nenhuma agenda encontrada para o tipo especificado',
                schema: {
                    mensagem: 'Nenhuma agenda encontrada para o tipo especificado'
                }
            }
            #swagger.responses[500] = {
                description: 'Erro ao tentar buscar as agendas do tipo',
                schema: {
                    mensagem: 'Erro no servidor!'
                }
            }
        */
    );
    app.put('/agenda/:id', agendaController.updateAgenda
        /**
            #swagger.tags = ["Agenda"]
            #swagger.summary = 'Atualiza uma agenda'
            #swagger.description = 'Atualiza uma agenda existente com os dados fornecidos'
            #swagger.parameters['id'] = {
                in: 'path',
                description: 'ID da Agenda',
                required: true,
                type: 'integer'
            }
            #swagger.parameters['agenda'] = {
                in: 'body',
                description: 'Dados da agenda a serem atualizados',
                required: true,
                schema: {
                    "agenda_tipo_acao": 1,
                    "agenda_dept_id": 1,
                    "agenda_cli_cod": 1,
                    "agenda_criado_em": "2024-06-13",
                    "agenda_alterado_em": "2024-06-14",
                    "agenda_finalizado_em": "2024-06-15",
                    "agenda_criado_por": 1,
                    "agenda_fechado_por": 2,
                    "agenda_descricao": "Descrição da agenda",
                    "agenda_status": 1
                }
            }
            #swagger.responses[200] = {
                description: 'Agenda atualizada com sucesso',
                schema: {
                    "agenda_id": 1,
                    "agenda_tipo_acao": 1,
                    "agenda_dept_id": 1,
                    "agenda_cli_cod": 1,
                    "agenda_criado_em": "2024-06-13",
                    "agenda_alterado_em": "2024-06-14",
                    "agenda_finalizado_em": "2024-06-15",
                    "agenda_criado_por": 1,
                    "agenda_fechado_por": 2,
                    "agenda_descricao": "Descrição da agenda",
                    "agenda_status": 1
                }
            }
            #swagger.responses[404] = {
                description: 'Agenda não encontrada',
                schema: {
                    mensagem: 'Agenda não encontrada'
                }
            }
            #swagger.responses[500] = {
                description: 'Erro ao atualizar a agenda',
                schema: {
                    mensagem: 'Erro no servidor!'
                }
            }
        */
    );


    app.delete('/agenda/:agenda_id', agendaController.deleteAgenda
        /**
            #swagger.tags = ["Agenda"]
            #swagger.summary = 'Deleta uma agenda'
            #swagger.description = 'Deleta uma agenda existente pelo ID'
            #swagger.parameters['agenda_id'] = {
                in: 'path',
                description: 'ID da Agenda',
                required: true,
                type: 'integer'
            }
            #swagger.responses[200] = {
                description: 'Agenda deletada com sucesso',
                schema: {
                    mensagem: 'Agenda deletada com sucesso'
                }
            }
            #swagger.responses[404] = {
                description: 'Agenda não encontrada',
                schema: {
                    mensagem: 'Agenda não encontrada'
                }
            }
            #swagger.responses[500] = {
                description: 'Erro ao deletar a agenda',
                schema: {
                    mensagem: 'Erro no servidor!'
                }
            }
        */
    );
    app.patch('/agenda/:agenda_id', agendaController.patchAgenda
    /**
        #swagger.tags = ["Agenda"]
        #swagger.summary = 'Atualiza parcialmente uma agenda'
        #swagger.description = 'Atualiza parcialmente uma agenda existente com os dados fornecidos'
        #swagger.parameters['agenda_id'] = {
            in: 'path',
            description: 'ID da Agenda',
            required: true,
            type: 'integer'
        }
        #swagger.parameters['agenda'] = {
            in: 'body',
            description: 'Dados da agenda a serem atualizados',
            required: true,
            schema: {
                "agenda_tipo_acao": 1,
                "agenda_dept_id": 1,
                "agenda_cli_cod": 1,
                "agenda_criado_em": "2024-06-13",
                "agenda_alterado_em": "2024-06-14",
                "agenda_finalizado_em": "2024-06-15",
                "agenda_criado_por": 1,
                "agenda_fechado_por": 2,
                "agenda_descricao": "Descrição da agenda",
                "agenda_status": 1
            }
        }
        #swagger.responses[200] = {
            description: 'Agenda atualizada com sucesso',
            schema: {
                "agenda_id": 1,
                "agenda_tipo_acao": 1,
                "agenda_dept_id": 1,
                "agenda_cli_cod": 1,
                "agenda_criado_em": "2024-06-13",
                "agenda_alterado_em": "2024-06-14",
                "agenda_finalizado_em": "2024-06-15",
                "agenda_criado_por": 1,
                "agenda_fechado_por": 2,
                "agenda_descricao": "Descrição da agenda",
                "agenda_status": 1
            }
        }
        #swagger.responses[404] = {
            description: 'Agenda não encontrada',
            schema: {
                mensagem: 'Agenda não encontrada'
            }
        }
        #swagger.responses[500] = {
            description: 'Erro ao atualizar a agenda',
            schema: {
                mensagem: 'Erro no servidor!'
            }
        }
    */
);

};
