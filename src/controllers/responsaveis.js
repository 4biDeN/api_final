const agendaRespService = require('../services/responsaveis');

const postAgendaResp = async (req, res, next) => {
    try {
        const retorno = await agendaRespService.newAgendaResp(req.body);
        console.log(retorno);
        res.status(201).json(retorno);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const getAgendaResp = async (req, res, next) => {
    try {
        const retorno = await agendaRespService.getAgendaResp();
        if (retorno.status === 204) {
            return res.status(204).end();
        }
        res.status(200).json(retorno);
    } catch (err) {
        res.status(500).send('Internal Server Error');
    }
};

const deleteAgendaResp = async (req, res, next) => {
    const { agenda_responsaveis, agenda_agenda_id } = req.params;
    try {
        const result = await agendaRespService.deleteAgendaResp({ agenda_responsaveis, agenda_agenda_id });
        if (result.error) {
            return res.status(400).json(result);
        }
        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

const updateAgendaResp = async (req, res, next) => {
    try {
        let params = req.body;
        params.old_agenda_responsaveis = req.params.agenda_responsaveis;
        params.old_agenda_agenda_id = req.params.agenda_agenda_id;
        const updatedAgendaResp = await agendaRespService.updateAgendaResp(params);
        return res.status(200).json(updatedAgendaResp);
    } catch (err) {
        return res.status(500).send('Internal Server Error');
    }
};

const patchAgendaResp = async (req, res) => {
    try {
        let params = req.body;
        params.old_agenda_responsaveis = req.params.agenda_responsaveis;
        params.old_agenda_agenda_id = req.params.agenda_agenda_id;
        const result = await agendaRespService.patchAgendaResp(params);
        return res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the agenda responsibility.' });
    }
};

module.exports = { postAgendaResp, getAgendaResp, deleteAgendaResp, updateAgendaResp, patchAgendaResp };
