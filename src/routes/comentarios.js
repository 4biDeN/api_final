const comentariosController = require('../controllers/comentarios');

module.exports = (app) => {
    app.get('/comentarios', comentariosController.getComentarios
    /**
        #swagger.tags = ["Comentários"]
        #swagger.summary = 'Consulta Lista de Comentários'
        #swagger.description = 'Consulta lista de todos os Comentários'
    */
    );

    app.post('/comentarios', comentariosController.postComentario
    /**
        #swagger.tags = ["Comentários"]
        #swagger.summary = 'Cadastra um novo Comentário'
        #swagger.description = 'Cadastra um novo Comentário no sistema'
        #swagger.parameters['newComentario'] = {
            in: 'body',
            description: 'Informações do novo Comentário',
            required: true,
            schema: {
                    com_agenda_id: 1,
                    com_user: 1,
                    com_responsavel: 1,
                    com_descricao: 'descrição do comentário',
                    com_resultado: 1
            }
        }
    */
    );

    app.delete('/comentarios/:com_id', comentariosController.deleteComentario
    /*
        #swagger.tags = ["Comentários"]
        #swagger.summary = 'Deleta um Comentário'
        #swagger.description = 'Deleta um Comentário baseado no ID fornecido'
        #swagger.parameters['com_id'] = {
            in: 'path',
            description: 'ID do Comentário',
            required: true,
            type: 'integer'
        }
    */
    );

    app.put('/comentarios/:com_id', comentariosController.updateComentario
    /**
        #swagger.tags = ["Comentários"]
        #swagger.summary = 'Atualiza um Comentário pelo ID'
        #swagger.description = 'Atualiza todas as informações de um Comentário existente no sistema'
        #swagger.parameters['com_id'] = {
            in: 'path',
            description: 'ID do Comentário',
            required: true,
            type: 'integer'
        }
        #swagger.parameters['updateComentario'] = {
            in: 'body',
            description: 'Informações atualizadas do Comentário',
            required: true,
            schema: {
                    com_agenda_id: 1,
                    com_user: 1,
                    com_responsavel: 1,
                    com_descricao: 'descrição do comentário',
                    com_resultado: 1
            }
        }
        #swagger.responses[200] = {
            description: 'Comentário atualizado com sucesso',
            schema: {
                    com_agenda_id: 1,
                    com_user: 1,
                    com_responsavel: 1,
                    com_descricao: 'descrição do comentário',
                    com_resultado: 1
            }
        }
        #swagger.responses[400] = {
            description: 'Dados inválidos'
        }
        #swagger.responses[404] = {
            description: 'Comentário não encontrado'
        }
        #swagger.responses[500] = {
            description: 'Erro ao atualizar comentário'
        }
    */
    );

    app.patch('/comentarios/:com_id', comentariosController.patchComentario
    /**
        #swagger.tags = ["Comentários"]
        #swagger.summary = 'Atualiza um Comentário pelo ID'
        #swagger.description = 'Atualiza as informações de um Comentário existente no sistema'
        #swagger.parameters['com_id'] = {
            in: 'path',
            description: 'ID do Comentário',
            required: true,
            type: 'integer'
        }
        #swagger.parameters['updateComentario'] = {
            in: 'body',
            description: 'Informações atualizadas do Comentário',
            required: true,
            schema: {
                    com_agenda_id: 1,
                    com_user: 1,
                    com_responsavel: 1,
                    com_descricao: 'descrição do comentário',
                    com_resultado: 1
            }
        }
        #swagger.responses[200] = {
            description: 'Comentário atualizado com sucesso',
            schema: {
                    com_agenda_id: 1,
                    com_user: 1,
                    com_responsavel: 1,
                    com_descricao: 'descrição do comentário',
                    com_resultado: 1
            }
        }
        #swagger.responses[400] = {
            description: 'Dados inválidos'
        }
        #swagger.responses[404] = {
            description: 'Comentário não encontrado'
        }
        #swagger.responses[500] = {
            description: 'Erro ao atualizar comentário'
        }
    */
    );
};
