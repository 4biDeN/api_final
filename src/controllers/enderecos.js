const enderecoService = require('../services/enderecos');

const postEnderecos = async (req, res) => {
    try {
        const newEndereco = await enderecoService.postEndereco(req.body);
        res.status(201).json(newEndereco);
    } catch (error) {
        console.error('Error creating endereco:', error);
        res.status(500).json({ error: 'taldo do erro' });
    }
};

const getEnderecos = async (req, res, next) => {
    try {
        const retorno = await enderecoService.getEndereco()
        res.status(200).json(retorno)
    } catch (e){
        res.status(500).send(e.message)
    }
}

const getEnderecoByCliente = async (req, res, next) => {
    let params = req.params.end_cli_cod

    if (isNaN(params)) {
        return res.status(400).send('Campo "end_cli_cod" Inválido.' )
    }
    try {
        const retorno = await enderecoService.getByCliente(params);
        res.status(200).json(retorno) 
    }catch (err){
        return res.status(404).send(err.message);
    }
}

const deleteEndereco = async (req, res, next) => {
    const params = req.params.end_cod;
    try {
        const result = await enderecoService.deleteEndereco(params);
        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

const patchEnderecos = async (req, res) => {
    const { end_cod } = req.params;
    const updateData = req.body;

    try {
        const updatedEndereco = await enderecoService.patchEndereco(end_cod, updateData);
        res.status(200).json(updatedEndereco);
    } catch (error) {
        console.error('Error updating endereco:', error);
        res.status(500).json({ error: 'An error occurred while trying to update the endereco.' });
    }
};


module.exports = { postEnderecos, getEnderecos, getEnderecoByCliente, deleteEndereco, patchEnderecos };