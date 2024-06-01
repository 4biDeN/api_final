const agendaController = require('../controllers/agenda');

module.exports = (app) => {
    app.post('agenda', agendaController.postAgenda)

}