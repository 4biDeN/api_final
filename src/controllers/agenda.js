const agendaService = require('../services/agenda');

const postAgenda = async (req, res) => {
    try {
        const newAgenda = await agendaService.postAgenda(req.body);
        res.status(201).json(newAgenda);
    } catch (error) {
        res.status(500).json({ error: 'Erro no Servidor' });
    }
};

const getAgenda = async (req, res) => {
    try {
        const agenda = await agendaService.getAgenda(req.params.agenda_id);
        res.status(200).json(agenda);
    } catch (error) {
        res.status(500).json({ error: 'Erro no Servidor' });
    }
};

const getAgendaByClienteId = async (req, res) => {
    try {
        const agendas = await agendaService.getAgendaByClienteId(req.params.cliente_id);
        res.status(200).json(agendas);
    } catch (error) {
        res.status(500).json({ error: 'Erro no Servidor' });
    }
};

const getAgendaByDeptId = async (req, res) => {
    try {
        const agendas = await agendaService.getAgendaByDeptId(req.params.dept_id);
        res.status(200).json(agendas);
    } catch (error) {
        res.status(500).json({ error: 'Erro no Servidor' });
    }
};

const getAgendaByTipoId = async (req, res) => {
    try {
        const agendas = await agendaService.getAgendaByTipoId(req.params.tipo_id);
        res.status(200).json(agendas);
    } catch (error) {
        res.status(500).json({ error: 'Erro no Servidor' });
    }
};

const updateAgenda = async (req, res) => {
    try {
        const agenda_id = req.params.agenda_id;
        const agendaData = req.body;
        const updatedAgenda = await agendaService.updateAgenda(agenda_id, agendaData);
        res.status(200).json(updatedAgenda);
    } catch (error) {
        res.status(500).json({ error: 'Erro no Servidor' });
    }
};

const deleteAgenda = async (req, res) => {
    try {
        const agenda_id = req.params.agenda_id;
        const deletedAgenda = await agendaService.deleteAgenda(agenda_id);
        res.status(200).json(deletedAgenda);
    } catch (error) {
        res.status(500).json({ error: 'Erro no Servidor' });
    }
};

const patchAgenda = async (req, res) => {
    try {
        let params = req.body;
        params.agenda_id = req.params.agenda_id
        const updatedAgenda = await agendaService.patchAgenda(params);
        res.status(200).json(updatedAgenda);
    } catch (error) {
        res.status(500).json({ error: 'Erro no Servidor' });
    }
};

module.exports = { postAgenda, getAgenda, getAgendaByClienteId, getAgendaByDeptId, getAgendaByTipoId, updateAgenda, deleteAgenda, patchAgenda };
