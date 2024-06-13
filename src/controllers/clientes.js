const clientesSerivce = require('../services/clientes');

const postCliente = async (req, res) => {
    try {
        await clientesSerivce.postClientes(req.body);
        res.status(201).json({ message: 'Cliente criado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar cliente' });
    }
};

const getClientes = async (req, res) => {
    try {
        const clientes = await clientesSerivce.getClientes();
        res.status(200).json(clientes);
    } catch (error) {
        console.error('Error in getClientesController:', error);
        res.status(500).json({ error: 'Erro ao buscar clientes' });
    }
};

const getClienteById = async (req, res) => {
    try {
        const cliente = await clientesSerivce.getClienteById(req.params.cli_cod);
        res.status(200).json(cliente);
    } catch (error) {
        res.status(404).json({ error: 'Cliente não encontrado' });
    }
};

const deleteCliente = async (req, res) => {
    try {
        const message = await clientesSerivce.deleteCliente(req.params.cli_cod);
        res.status(200).json(message);
    } catch (error) {
        res.status(404).json({ error: 'Cliente não encontrado' });
    }
};

const updateCliente = async (req, res) => {
    try {
        let params = req.body;
        params.cli_cod = req.params.cli_cod
        const cliente = await clientesSerivce.updateCliente(params);
        res.status(200).json(cliente);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar cliente' });
    }
};

const patchCliente = async (req, res) => {
    try {
        let params = req.body;
        params.cli_cod = req.params.cli_cod
        console.log(params)
        const cliente = await clientesSerivce.patchCliente(params);
        return res.status(200).json(cliente);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the department.' });
    }
};


module.exports = { postCliente, getClientes, getClienteById, deleteCliente, updateCliente, patchCliente };