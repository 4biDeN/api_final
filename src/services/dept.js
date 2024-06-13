const db = require('../configs/pg')

const sql_insert = 
` insert into departamento (dep_nome, dep_sigla, dep_descricao, dep_localizacao, dep_resp)
    values ($1, $2, $3, $4, $5) RETURNING dep_id `

const newDept = async(params) => {
    const { dep_nome, dep_sigla, dep_descricao, dep_localizacao, dep_resp } = params
    try {
        const result = await db.query(sql_insert, [dep_nome, dep_sigla, dep_descricao, dep_localizacao, dep_resp]);
        return { message: 'Departamento Criado com Sucesso', id: result.rows[0].dep_id };
    } catch (err) {
        throw { status: 500, message: 'Erro ao tentar criar Departamento'};
    }
};

const sql_get = 
    ` select dep_id,
        dep_nome,
        dep_sigla,
        dep_descricao,
        dep_localizacao,
        dep_resp from departamento `

const getDept = async () => {
    try {
        const result = await db.query(sql_get, []);
        if (result.rows.length === 0) {
            return { status: 204 };
        }
        return {
            status: 200,
            total: result.rows.length,
            usuarios: result.rows
        }
    } catch (err){
        console.log(err.message);
        throw err;
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
        return { error: 'An error occurred while trying to delete the department.' };
    }
};

const sql_update = `
    UPDATE departamento
    SET dep_nome = $2,
        dep_sigla = $3,
        dep_descricao = $4,
        dep_localizacao = $5,
        dep_resp = $6
    WHERE dep_id = $1
    RETURNING dep_id, dep_nome, dep_sigla, dep_descricao, dep_localizacao, dep_resp
`;

const updateDept = async (params) => {
    try {
        const {dep_id, dep_nome, dep_sigla, dep_descricao, dep_localizacao, dep_resp} = params
        const result = await db.query(sql_update, [dep_id, dep_nome, dep_sigla, dep_descricao, dep_localizacao, dep_resp]);
        if (result.rows.length === 0) {
            throw new Error(`Departamento com ID ${dep_id} não encontrado.`);
        }
        return result.rows[0];
    } catch (err) {
        console.error('Error in updateDept:', err);
        throw err;
    }
};

const patchDept = async (params) => {
    let fields = '';
    let binds = [];
    let countParams = 1;

    if (params.dep_nome) {
        fields += ` dep_nome = $${countParams} `;
        binds.push(params.dep_nome);
        countParams++;
    }
    if (params.dep_sigla) {
        fields += (fields ? ', ' : '') + ` dep_sigla = $${countParams} `;
        binds.push(params.dep_sigla);
        countParams++;
    }
    if (params.dep_descricao) {
        fields += (fields ? ', ' : '') + ` dep_descricao = $${countParams} `;
        binds.push(params.dep_descricao);
        countParams++;
    }
    if (params.dep_localizacao) {
        fields += (fields ? ', ' : '') + ` dep_localizacao = $${countParams} `;
        binds.push(params.dep_localizacao);
        countParams++;
    }
    if (params.dep_resp !== undefined) {
        fields += (fields ? ', ' : '') + ` dep_resp = $${countParams} `;
        binds.push(params.dep_resp);
        countParams++;
    }

    if (!fields) {
        throw new Error('No fields to update');
    }

    const sql_patch = 'UPDATE departamento SET ';
    let sql = sql_patch + fields + ' WHERE dep_id = $' + countParams + ' RETURNING dep_id, dep_nome, dep_sigla, dep_descricao, dep_localizacao, dep_resp';
    binds.push(params.dep_id);

    try {
        const result = await db.query(sql, binds);
        if (result.rows.length === 0) {
            throw new Error(`Departamento com ID ${params.dep_id} não encontrado.`);
        }
        return result.rows[0];
    } catch (err) {
        console.error('Error in patchDept:', err);
        throw err;
    }
};

module.exports = { newDept, getDept, deleteDept, updateDept, patchDept }