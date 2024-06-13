const db = require('../configs/pg');

const sql_insert_agenda = `
    INSERT INTO agenda (agenda_tipo_acao, agenda_dept_id, agenda_cli_cod, agenda_criado_em, agenda_alterado_em, agenda_finalizado_em, agenda_criado_por, agenda_fechado_por, agenda_descricao, agenda_status)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING *`;

const postAgenda = async (agendaData) => {
    const { agenda_tipo_acao, agenda_dept_id, agenda_cli_cod, agenda_criado_em, agenda_alterado_em, agenda_finalizado_em, agenda_criado_por, agenda_fechado_por, agenda_descricao, agenda_status } = agendaData;
    try {
        const result = await db.query(sql_insert_agenda, [
            agenda_tipo_acao, agenda_dept_id, agenda_cli_cod, agenda_criado_em, agenda_alterado_em, agenda_finalizado_em, agenda_criado_por, agenda_fechado_por, agenda_descricao, agenda_status
        ]);
        return result.rows[0];
    } catch (error) {
        throw new Error('Ocorreu um erro ao tentar inserir a agenda.');
    }
};

const sql_get_agenda = 'SELECT * FROM agenda WHERE agenda_id = $1';

const getAgenda = async (agenda_id) => {
    try {
        const result = await db.query(sql_get_agenda, [agenda_id]);
        if (result.rows.length === 0) {
            throw new Error('Agenda não encontrada');
        }
        return result.rows[0];
    } catch (error) {
        throw new Error('Ocorreu um erro ao tentar buscar a agenda.');
    }
};

const sql_get_agenda_by_cliente_id = 'SELECT * FROM agenda WHERE agenda_cli_cod = $1';

const getAgendaByClienteId = async (cliente_id) => {
    try {
        const result = await db.query(sql_get_agenda_by_cliente_id, [cliente_id]);
        if (result.rows.length === 0) {
            throw new Error('Nenhuma agenda encontrada para o cliente especificado');
        }
        return result.rows;
    } catch (error) {
        throw new Error('Ocorreu um erro ao tentar buscar as agendas do cliente.');
    }
};

const sql_get_agenda_by_dept_id = 'SELECT * FROM agenda WHERE agenda_dept_id = $1';

const getAgendaByDeptId = async (dept_id) => {
    try {
        const result = await db.query(sql_get_agenda_by_dept_id, [dept_id]);
        if (result.rows.length === 0) {
            throw new Error('Nenhuma agenda encontrada para o departamento especificado');
        }
        return result.rows;
    } catch (error) {
        throw new Error('Ocorreu um erro ao tentar buscar as agendas do departamento.');
    }
};

const sql_get_agenda_by_tipo_id = 'SELECT * FROM agenda WHERE agenda_tipo_acao = $1';

const getAgendaByTipoId = async (tipo_id) => {
    try {
        const result = await db.query(sql_get_agenda_by_tipo_id, [tipo_id]);
        if (result.rows.length === 0) {
            throw new Error('Nenhuma agenda encontrada para o tipo especificado');
        }
        return result.rows;
    } catch (error) {
        throw new Error('Ocorreu um erro ao tentar buscar as agendas do tipo.');
    }
};

const sql_update_agenda = `
UPDATE agenda
SET agenda_tipo_acao = $1, agenda_dept_id = $2, agenda_cli_cod = $3, agenda_criado_em = $4, agenda_alterado_em = $5, agenda_finalizado_em = $6, agenda_criado_por = $7, agenda_fechado_por = $8, agenda_descricao = $9, agenda_status = $10
WHERE agenda_id = $11
RETURNING *`;

const updateAgenda = async (agenda_id, agendaData) => {
    const { agenda_tipo_acao, agenda_dept_id, agenda_cli_cod, agenda_criado_em, agenda_alterado_em, agenda_finalizado_em, agenda_criado_por, agenda_fechado_por, agenda_descricao, agenda_status } = agendaData;
    try {
        const result = await db.query(sql_update_agenda, [
            agenda_tipo_acao, agenda_dept_id, agenda_cli_cod, agenda_criado_em, agenda_alterado_em, agenda_finalizado_em, agenda_criado_por, agenda_fechado_por, agenda_descricao, agenda_status, agenda_id
        ]);
        if (result.rows.length === 0) {
            throw new Error('Agenda não encontrada');
        }
        return result.rows[0];
    } catch (error) {
        throw new Error('Ocorreu um erro ao tentar atualizar a agenda.');
    }
};

const sql_delete_agenda_resp = 'DELETE FROM agenda_resp WHERE agenda_agenda_id = $1';
const sql_delete_agenda_obser = 'DELETE FROM agenda_obser WHERE agenda_agenda_id = $1';
const sql_delete_agenda_comentario = 'DELETE FROM comentario com_id WHERE com_agenda_id = $1';
const sql_delete_agenda = 'DELETE FROM agenda WHERE agenda_id = $1 RETURNING *';

const deleteAgenda = async (agenda_id) => {
    try {
        await db.query(sql_delete_agenda_resp, [agenda_id]);
        await db.query(sql_delete_agenda_obser, [agenda_id]);
        await db.query(sql_delete_agenda_comentario, [agenda_id]);

        const result = await db.query(sql_delete_agenda, [agenda_id]);
        if (result.rows.length === 0) {
            throw new Error('Agenda não encontrada');
        }
        return result.rows[0];
    } catch (error) {
        throw new Error('Ocorreu um erro ao tentar deletar a agenda.');
    }
};
const patchAgenda = async (params) => {
    let fields = '';
    let binds = [];
    let countParams = 1;

    if (params.agenda_tipo_acao !== undefined) {
        fields += ` agenda_tipo_acao = $${countParams} `;
        binds.push(params.agenda_tipo_acao);
        countParams++;
    }
    if (params.agenda_dept_id !== undefined) {
        fields += (fields ? ', ' : '') + ` agenda_dept_id = $${countParams} `;
        binds.push(params.agenda_dept_id);
        countParams++;
    }
    if (params.agenda_cli_cod !== undefined) {
        fields += (fields ? ', ' : '') + ` agenda_cli_cod = $${countParams} `;
        binds.push(params.agenda_cli_cod);
        countParams++;
    }
    if (params.agenda_criado_em !== undefined) {
        fields += (fields ? ', ' : '') + ` agenda_criado_em = $${countParams} `;
        binds.push(params.agenda_criado_em);
        countParams++;
    }
    if (params.agenda_alterado_em !== undefined) {
        fields += (fields ? ', ' : '') + ` agenda_alterado_em = $${countParams} `;
        binds.push(params.agenda_alterado_em);
        countParams++;
    }
    if (params.agenda_finalizado_em !== undefined) {
        fields += (fields ? ', ' : '') + ` agenda_finalizado_em = $${countParams} `;
        binds.push(params.agenda_finalizado_em);
        countParams++;
    }
    if (params.agenda_criado_por !== undefined) {
        fields += (fields ? ', ' : '') + ` agenda_criado_por = $${countParams} `;
        binds.push(params.agenda_criado_por);
        countParams++;
    }
    if (params.agenda_fechado_por !== undefined) {
        fields += (fields ? ', ' : '') + ` agenda_fechado_por = $${countParams} `;
        binds.push(params.agenda_fechado_por);
        countParams++;
    }
    if (params.agenda_descricao !== undefined) {
        fields += (fields ? ', ' : '') + ` agenda_descricao = $${countParams} `;
        binds.push(params.agenda_descricao);
        countParams++;
    }
    if (params.agenda_status !== undefined) {
        fields += (fields ? ', ' : '') + ` agenda_status = $${countParams} `;
        binds.push(params.agenda_status);
        countParams++;
    }

    if (!fields) {
        throw new Error('No fields to update');
    }

    const sql_update_agenda = 'UPDATE agenda SET ';
    let sql = sql_update_agenda + fields + ' WHERE agenda_id = $' + countParams + ' RETURNING *';
    binds.push(params.agenda_id);

    try {
        const result = await db.query(sql, binds);
        if (result.rows.length === 0) {
            throw new Error('Agenda não encontrada');
        }
        return result.rows[0];
    } catch (error) {
        console.error('Error in patchAgenda:', error);
        throw new Error('Ocorreu um erro ao tentar atualizar a agenda.');
    }
};


module.exports = { postAgenda, getAgenda, getAgendaByClienteId, getAgendaByDeptId, getAgendaByTipoId, updateAgenda, deleteAgenda, patchAgenda };