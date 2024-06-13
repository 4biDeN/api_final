const deptService = require('../services/dept');

const postDept = async (req, res, next) => {
    try {
        const retorno = await deptService.newDept(req.body);
        res.status(201).json(retorno);
    } catch(err) {
        res.status(500).send(err.message);
    }
};

const getDept = async (req, res, next) => {
    try {
        const retorno = await deptService.getDept()
        if (retorno.status === 204) {
            return res.status(204).end();
        }
        res.status(200).json(retorno)
    } catch (err) {
        res.status(500).send('Internal Server Error');
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

const updateDept = async (req, res, next) => {
    try {
        let params = req.body;
        params.dep_id = req.params.dep_id
        const updatedDepartment = await deptService.updateDept(params);
        return res.status(200).json(updatedDepartment);
    } catch (err) {
        return res.status(500).send('Internal Server Error');
    }
};

const patchDept = async (req, res) => {
    try {
        let params = req.body;
        params.dep_id = req.params.dep_id
        const result = await deptService.patchDept(params);
        return res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the department.' });
    }
};



module.exports = { postDept, getDept, deleteDept, updateDept, patchDept }