const users = require('./user');
const dept = require('./dept');
const agenda = require('./agenda');
const enderecos = require('./enderecos');
const clientes = require('./clientes');

module.exports = (app) => {
    users(app)
    dept(app)
    agenda(app)
    enderecos(app)
    clientes(app)
//    Login(app)
}