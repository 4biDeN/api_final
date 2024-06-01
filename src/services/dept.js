const db = require('../configs/pg')

const sql_insert = 
` insert into departamento (dep_nome, dep_sigla, dep_descricao, dep_localizacao, dep_resp)
    values ($1, $2, $3, $4, $5) `

const newDept = async(params) => {
    const {dep_nome, dep_sigla, dep_descricao, dep_localizacao, dep_resp} = params
    await db.query(sql_insert, [dep_nome, dep_sigla, dep_descricao, dep_localizacao, dep_resp])
}

const sql_get = 
    ` select dep_id,
        dep_nome,
        dep_sigla,
        dep_descricao,
        dep_localizacao,
        dep_resp from departamento `

const getDept = async () => {
    try {
    result = await db.query(sql_get, [])
    return {
        total: result.rows.length,
        usuarios: result.rows
        }
    } catch (err){
        console.log(err.message);
    }
}

const sql_delete = `DELETE FROM departamento WHERE dep_id = $1`;

const deleteDept = async (params) => {
    const sql_check_users = 'SELECT * FROM users WHERE user_dept = $1';
    try {
        const result = await db.query(sql_check_users, [params]);
        const userCount = result.rowCount;
        if (userCount > 0) {
            return { error: 'Cannot delete department, there are users linked to it.' };
        } else {
            await db.query(sql_delete, [params]);
            return { message: 'Department deleted successfully.' };
        }
    } catch (error) {
        console.error('Error deleting department:', error);
        return { error: 'An error occurred while trying to delete the department.' };
    }
};


module.exports.newDept = newDept
module.exports.getDept = getDept
module.exports.deleteDept = deleteDept