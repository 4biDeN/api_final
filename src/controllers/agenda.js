const agendaService = require('../services/agenda');

const postAgenda = async (req, res, next) => {
    const { agendaData, responsaveis, observadores } = req.body;
    try {
        const newAgenda = await agendaService.postAgenda(agendaData, responsaveis, observadores);
        res.status(201).json(newAgenda);
    } catch (err) {
        console.error('Error creating agenda:', err);
        res.status(500).json({ error: 'An error occurred while trying to create the agenda.' });
    }
};

module.exports = { postAgenda };
