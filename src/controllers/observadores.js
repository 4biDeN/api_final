const agendaObserService = require('../services/observadores');

const postAgendaObser = async (req, res, next) => {
    try {
        const retorno = await agendaObserService.newAgendaObser(req.body);
        console.log(retorno);
        res.status(201).json(retorno);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const getAgendaObser = async (req, res, next) => {
    try {
        const retorno = await agendaObserService.getAgendaObser();
        if (retorno.status === 204) {
            return res.status(204).end();
        }
        res.status(200).json(retorno);
    } catch (err) {
        res.status(500).send('Internal Server Error');
    }
};

const deleteAgendaObser = async (req, res, next) => {
    const { agenda_observador, agenda_agenda_id } = req.params;
    try {
        const result = await agendaObserService.deleteAgendaObser({ agenda_observador, agenda_agenda_id });
        if (result.error) {
            return res.status(400).json(result);
        }
        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

const updateAgendaObser = async (req, res, next) => {
    try {
        let params = req.body;
        params.old_agenda_observador = req.params.agenda_observador;
        params.old_agenda_agenda_id = req.params.agenda_agenda_id;
        const updatedAgendaObser = await agendaObserService.updateAgendaObser(params);
        return res.status(200).json(updatedAgendaObser);
    } catch (err) {
        return res.status(500).send('Internal Server Error');
    }
};

const patchAgendaObser = async (req, res) => {
    try {
        let params = req.body;
        params.old_agenda_observador = req.params.agenda_observador;
        params.old_agenda_agenda_id = req.params.agenda_agenda_id;
        const result = await agendaObserService.patchAgendaObser(params);
        return res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the agenda observer.' });
    }
};

module.exports = { postAgendaObser, getAgendaObser, deleteAgendaObser, updateAgendaObser, patchAgendaObser };
