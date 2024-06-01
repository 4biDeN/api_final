const userService = require('../services/user');

const newUser = async (req, res, next) => {
    try {
        const retorno = await userService.newUser(req.body)
        res.status(201).json(retorno)
    } catch (e){
        res.status(500).send(e.message)
    }
}

const getUser = async (req, res, next) => {
    try {
        const retorno = await userService.getUser()
        res.status(200).json(retorno)
    } catch (err){
        res.status(500).send(err.message)
    }
}

const getUserById = async (req, res, next) => {
    let params = req.params.user_id

    if (isNaN(params)) {
        return res.status(400).send('Campo "user_id" Inválido');
    }
    try {
        const retorno = await userService.getUserById(params)
        res.status(200).json(retorno)
    }catch (err){
        if (err.message.includes('Usuário com o ID')){
            return res.status(404).send(err.message);
        }
        res.status(500).send(err.message)
    }
};

const patchPassword = async (req, res, next) => {
    try {
        let params = req.body
        params.user_id = req.params.user_id
        
        let ret = await userService.patchPassword(params)
        res.status(201).send(ret)

    } catch (err){
        if (err.message.includes('Usuário com o ID')){
            return res.status(404).send(err.message);
        }
        res.status(500).send(err.message)
    }
}

module.exports.newUser = newUser
module.exports.getUser = getUser
module.exports.getUserById = getUserById
module.exports.patchPassword = patchPassword