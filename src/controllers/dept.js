const deptService = require('../services/dept');

const postDept = async (req, res, next) => {
    try {
        const retorno = await deptService.newDept(req.body);
        res.status(201).send(retorno);
    }catch(e) {
        res.status(500).send(e.message);
    }
}

const getDept = async (req, res, next) => {
    try {
        const retorno = await deptService.getDept()
        res.status(200).json(retorno)
    } catch (err){
        res.status(500).send(err.message)
    }
}

const deleteDept = async (req, res, next) => {
    const dept_id = req.params.dept_id;
    try {
        const result = await deptService.deleteDept(dept_id);
        if (result.error) {
            return res.status(400).json(result);
        }
        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

module.exports.postDept = postDept;
module.exports.getDept = getDept;
module.exports.deleteDept = deleteDept;