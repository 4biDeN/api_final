const userController = require('../controllers/user')

module.exports = (app) => {
    app.post('/users', userController.newUser
    /**
        #swagger.tags = ["Usuários"]
        #swagger.summary = 'Cria um novo Usuário'
        #swagger.description = 'Cria um novo usuário no sistema'
        #swagger.parameters['newUser'] = {
            in: 'body',
            description: 'Informações do novo Usuário',
            required: true,
            schema: {
                user_username: 'Nome de usuário',
                user_email: 'E-mail do usuário',
                user_dept: 3,
                user_password: 'Senha do usuário'
            }
        }
    */
    );

    app.get('/users', userController.getUser
    /**
        #swagger.tags = ["Usuários"]
        #swagger.summary = 'Lista de Usuários'
        #swagger.description = 'Retorna a lista de todos os usuários cadastrados'
    */
    );

    app.get('/users/:user_id', userController.getUserById
    /**
        #swagger.tags = ["Usuários"]
        #swagger.summary = 'Busca Usuário por ID'
        #swagger.description = 'Retorna as informações de um usuário específico, com base no ID fornecido'
        #swagger.parameters['user_id'] = {
            in: 'path',
            description: 'ID do usuário',
            required: true,
            type: 'integer'
        }
    */
    );

    app.patch('/users/:user_id', userController.patchPassword
    /**
        #swagger.tags = ["Usuários"]
        #swagger.summary = 'Atualiza a senha de um Usuário'
        #swagger.description = 'Atualiza a senha de um usuário existente no sistema'
        #swagger.parameters['user_id'] = {
            in: 'path',
            description: 'ID do usuário',
            required: true,
            type: 'integer'
        }
        #swagger.parameters['updatedUser'] = {
            in: 'body',
            description: 'Informações atualizadas do Usuário',
            required: true,
            schema: {
                user_username: 'Nome de usuário',
                user_password: 'Senha atual do usuário',
                newpass: 'Nova senha do usuário'
            }
        }
    */
    );
};
