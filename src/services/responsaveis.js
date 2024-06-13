const db = require('../configs/pg');

const sql_insert = 
` INSERT INTO agenda_resp (agenda_responsaveis, agenda_agenda_id)
  VALUES ($1, $2) RETURNING agenda_responsaveis, agenda_agenda_id `;

const newAgendaResp = async (params) => {
    const { agenda_responsaveis, agenda_agenda_id } = params;
    try {
        const result = await db.query(sql_insert, [agenda_responsaveis, agenda_agenda_id]);
        return { message: 'Responsável da Agenda Criado com Sucesso', data: result.rows[0] };
    } catch (err) {
        throw { status: 500, message: 'Erro ao tentar criar Responsável da Agenda' };
    }
};

const sql_get = 
` SELECT agenda_responsaveis, agenda_agenda_id
  FROM agenda_resp `;

const getAgendaResp = async () => {
    try {
        const result = await db.query(sql_get, []);
        if (result.rows.length === 0) {
            return { status: 204 };
        }
        return {
            status: 200,
            total: result.rows.length,
            data: result.rows
        };
    } catch (err) {
        console.log(err.message);
        throw err;
    }
};

const sql_delete = `DELETE FROM agenda_resp WHERE agenda_responsaveis = $1 AND agenda_agenda_id = $2`;

const deleteAgendaResp = async (params) => {
    try {
        await db.query(sql_delete, [params.agenda_responsaveis, params.agenda_agenda_id]);
        return { message: 'Responsável da Agenda deletado com sucesso.' };
    } catch (error) {
        return { error: 'Ocorreu um erro ao tentar deletar o Responsável da Agenda.' };
    }
};

const sql_update = `
    UPDATE agenda_resp
    SET agenda_responsaveis = $1,
        agenda_agenda_id = $2
    WHERE agenda_responsaveis = $3 AND agenda_agenda_id = $4
    RETURNING agenda_responsaveis, agenda_agenda_id
`;

const updateAgendaResp = async (params) => {
    try {
        const { old_agenda_responsaveis, old_agenda_agenda_id, agenda_responsaveis, agenda_agenda_id } = params;
        const result = await db.query(sql_update, [agenda_responsaveis, agenda_agenda_id, old_agenda_responsaveis, old_agenda_agenda_id]);
        if (result.rows.length === 0) {
            throw new Error(`Responsável da Agenda não encontrado.`);
        }
        return result.rows[0];
    } catch (err) {
        console.error('Error in updateAgendaResp:', err);
        throw err;
    }
};

const patchAgendaResp = async (params) => {
    let fields = '';
    let binds = [];
    let countParams = 1;

    if (params.agenda_responsaveis) {
        fields += ` agenda_responsaveis = $${countParams} `;
        binds.push(params.agenda_responsaveis);
        countParams++;
    }
    if (params.agenda_agenda_id) {
        fields += (fields ? ', ' : '') + ` agenda_agenda_id = $${countParams} `;
        binds.push(params.agenda_agenda_id);
        countParams++;
    }

    if (!fields) {
        throw new Error('No fields to update');
    }

    const sql_patch = 'UPDATE agenda_resp SET ';
    let sql = sql_patch + fields + ' WHERE agenda_responsaveis = $' + countParams + ' AND agenda_agenda_id = $' + (countParams + 1) + ' RETURNING agenda_responsaveis, agenda_agenda_id';
    binds.push(params.old_agenda_responsaveis, params.old_agenda_agenda_id);

    try {
        const result = await db.query(sql, binds);
        if (result.rows.length === 0) {
            throw new Error(`Responsável da Agenda não encontrado.`);
        }
        return result.rows[0];
    } catch (err) {
        console.error('Error in patchAgendaResp:', err);
        throw err;
    }
};

module.exports = { newAgendaResp, getAgendaResp, deleteAgendaResp, updateAgendaResp, patchAgendaResp };
