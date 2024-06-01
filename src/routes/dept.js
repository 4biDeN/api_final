const deptController = require('../controllers/dept');

module.exports = (app) => {
    /**
        #swagger.tags = ["Departamento"]
        #swagger.summary = 'Consulta Lista de Departamentos'
        #swagger.description = 'Consulta lista de Departamentos, todos cadastrados'
    */
    app.get('/dept', deptController.getDept);

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
    */
    app.post('/dept', deptController.postDept);

    /**
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
    app.delete('/dept/:dept_id', deptController.deleteDept);
};
