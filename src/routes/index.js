const users = require('./user');
const dept = require('./dept');
const agenda = require('./agenda');
const enderecos = require('./enderecos');
const clientes = require('./clientes');
const responsaveis = require('./responsaveis');
const observadores = require('./observadores');
const comentarios = require('./comentarios');

module.exports = (app) => {
    users(app)
    dept(app)
    agenda(app)
    enderecos(app)
    clientes(app)
    responsaveis(app)
    observadores(app)
    comentarios(app)
//    Login(app)
}