const clienteService = require('../services/clientes');

const postCliente = async (req, res) => {
    try {
        const newCliente = await clienteService.postClientes(req.body);
        res.status(201).json(newCliente);
    }catch (error) {
        console.error('teste', error);
        res.status(500).json({ error: "deu erro"});
    }
};

module.exports = { postCliente }