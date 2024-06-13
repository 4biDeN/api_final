const db = require('../configs/pg');

const sql_insert =
    ` INSERT INTO agenda_obser (agenda_observador, agenda_agenda_id)
  VALUES ($1, $2) RETURNING agenda_observador, agenda_agenda_id `;

const newAgendaObser = async (params) => {
    const { agenda_observador, agenda_agenda_id } = params;
    try {
        const result = await db.query(sql_insert, [agenda_observador, agenda_agenda_id]);
        return { message: 'Observador da Agenda Criado com Sucesso', data: result.rows[0] };
    } catch (err) {
        throw { status: 500, message: 'Erro ao tentar criar Observador da Agenda' };
    }
};

const sql_get =
    ` SELECT agenda_observador, agenda_agenda_id
  FROM agenda_obser `;

const getAgendaObser = async () => {
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

const sql_delete = `DELETE FROM agenda_obser WHERE agenda_observador = $1 AND agenda_agenda_id = $2`;

const deleteAgendaObser = async (params) => {
    try {
        await db.query(sql_delete, [params.agenda_observador, params.agenda_agenda_id]);
        return { message: 'Observador da Agenda deletado com sucesso.' };
    } catch (error) {
        return { error: 'Ocorreu um erro ao tentar deletar o Observador da Agenda.' };
    }
};

const sql_update = `
    UPDATE agenda_obser
    SET agenda_observador = $1,
        agenda_agenda_id = $2
    WHERE agenda_observador = $3 AND agenda_agenda_id = $4
    RETURNING agenda_observador, agenda_agenda_id
`;

const updateAgendaObser = async (params) => {
    try {
        const { old_agenda_observador, old_agenda_agenda_id, agenda_observador, agenda_agenda_id } = params;
        const result = await db.query(sql_update, [agenda_observador, agenda_agenda_id, old_agenda_observador, old_agenda_agenda_id]);
        if (result.rows.length === 0) {
            throw new Error(`Observador da Agenda não encontrado.`);
        }
        return result.rows[0];
    } catch (err) {
        console.error('Error in updateAgendaObser:', err);
        throw err;
    }
};

const patchAgendaObser = async (params) => {
    let fields = '';
    let binds = [];
    let countParams = 1;

    if (params.agenda_observador) {
        fields += ` agenda_observador = $${countParams} `;
        binds.push(params.agenda_observador);
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

    const sql_patch = 'UPDATE agenda_obser SET ';
    let sql = sql_patch + fields + ' WHERE agenda_observador = $' + countParams + ' AND agenda_agenda_id = $' + (countParams + 1) + ' RETURNING agenda_observador, agenda_agenda_id';
    binds.push(params.old_agenda_observador, params.old_agenda_agenda_id);

    try {
        const result = await db.query(sql, binds);
        if (result.rows.length === 0) {
            throw new Error(`Observador da Agenda não encontrado.`);
        }
        return result.rows[0];
    } catch (err) {
        console.error('Error in patchAgendaObser:', err);
        throw err;
    }
};

module.exports = { newAgendaObser, getAgendaObser, deleteAgendaObser, updateAgendaObser, patchAgendaObser };
