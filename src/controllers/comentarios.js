const comentarioService = require('../services/comentarios');

const postComentario = async (req, res) => {
    try {
        const newComentario = await comentarioService.newComentario(req.body);
        res.status(201).json(newComentario);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao tentar criar o comentário.' });
    }
};

const getComentarios = async (req, res, next) => {
    try {
        const retorno = await comentarioService.getComentarios();
        res.status(200).json(retorno);
    } catch (e) {
        res.status(500).send(e.message);
    }
};

const deleteComentario = async (req, res, next) => {
    const { com_id } = req.params;
    try {
        const result = await comentarioService.deleteComentario({ com_id });
        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

const updateComentario = async (req, res) => {
    const { com_id } = req.params;
    const updateData = req.body;

    try {
        const updatedComentario = await comentarioService.updateComentario({ ...updateData, com_id });
        res.status(200).json(updatedComentario);
    } catch (error) {
        console.error('Error updating comentario:', error);
        res.status(500).json({ error: 'Erro ao tentar atualizar o comentário.' });
    }
};

const patchComentario = async (req, res) => {
    try {
        let params = req.body;
        params.com_id = req.params.com_id;
        const updatedComentario = await comentarioService.patchComentario(params);
        res.status(200).json(updatedComentario);
    } catch (error) {
        console.error('Error updating comentario:', error);
        res.status(500).json({ error: 'Erro ao tentar atualizar o comentário.' });
    }
};

module.exports = { postComentario, getComentarios, deleteComentario, updateComentario, patchComentario };
