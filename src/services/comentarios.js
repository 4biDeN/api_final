const db = require('../configs/pg');

const sql_insert = `
  INSERT INTO comentario (com_agenda_id, com_user, com_responsavel, com_descricao, com_resultado)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING com_id, com_agenda_id, com_user, com_responsavel, com_descricao, com_resultado
`;

const newComentario = async (params) => {
    const { com_agenda_id, com_user, com_responsavel, com_descricao, com_resultado } = params;
    
    try {
        const result = await db.query(sql_insert, [com_agenda_id, com_user, com_responsavel, com_descricao, com_resultado]);
        return { message: 'Comentário Criado com Sucesso', data: result.rows[0] };
    } catch (err) {
        throw { status: 500, message: 'Erro ao tentar criar Comentário' };
    }
};

const sql_get_all = `
  SELECT com_id, com_agenda_id, com_user, com_responsavel, com_descricao, com_resultado
  FROM comentario
`;

const getComentarios = async () => {
    try {
        const result = await db.query(sql_get_all, []);
        if (result.rows.length === 0) {
            return { status: 204 };
        }
        return {
            status: 200,
            total: result.rows.length,
            data: result.rows
        };
    } catch (err) {
        throw { status: 500, message: 'Erro ao tentar buscar Comentários' };
    }
};

const sql_delete = `
  DELETE FROM comentario
  WHERE com_id = $1
  RETURNING com_id
`;

const deleteComentario = async (params) => {
    const { com_id } = params;
    try {
        const result = await db.query(sql_delete, [com_id]);
        if (result.rowCount === 0) {
            return { error: 'Comentário não encontrado' };
        }
        return { message: 'Comentário deletado com sucesso', data: result.rows[0] };
    } catch (err) {
        throw { status: 500, message: 'Erro ao tentar deletar Comentário' };
    }
};

const sql_update = `
  UPDATE comentario
  SET com_agenda_id = $1, com_user = $2, com_responsavel = $3, com_descricao = $4, com_resultado = $5
  WHERE com_id = $6
  RETURNING com_id, com_agenda_id, com_user, com_responsavel, com_descricao, com_resultado
`;

const updateComentario = async (params) => {
    const { com_agenda_id, com_user, com_responsavel, com_descricao, com_resultado, com_id } = params;
    try {
        const result = await db.query(sql_update, [com_agenda_id, com_user, com_responsavel, com_descricao, com_resultado, com_id]);
        return { message: 'Comentário atualizado com sucesso', data: result.rows[0] };
    } catch (err) {
        throw { status: 500, message: 'Erro ao tentar atualizar Comentário' };
    }
};

const patchComentario = async (params) => {
    let fields = '';
    let binds = [];
    let countParams = 1;

    if (params.com_agenda_id !== undefined) {
        fields += ` com_agenda_id = $${countParams} `;
        binds.push(params.com_agenda_id);
        countParams++;
    }
    if (params.com_user !== undefined) {
        fields += (fields ? ', ' : '') + ` com_user = $${countParams} `;
        binds.push(params.com_user);
        countParams++;
    }
    if (params.com_responsavel !== undefined) {
        fields += (fields ? ', ' : '') + ` com_responsavel = $${countParams} `;
        binds.push(params.com_responsavel);
        countParams++;
    }
    if (params.com_descricao !== undefined) {
        fields += (fields ? ', ' : '') + ` com_descricao = $${countParams} `;
        binds.push(params.com_descricao);
        countParams++;
    }
    if (params.com_resultado !== undefined) {
        fields += (fields ? ', ' : '') + ` com_resultado = $${countParams} `;
        binds.push(params.com_resultado);
        countParams++;
    }

    if (!fields) {
        throw new Error('No fields to update');
    }

    const sql_update = 'UPDATE comentario SET ';
    let sql = sql_update + fields + ' WHERE com_id = $' + countParams + ' RETURNING *';
    binds.push(params.com_id);

    try {
        const result = await db.query(sql, binds);
        if (result.rows.length === 0) {
            throw new Error(`Comentário com ID ${params.com_id} não encontrado.`);
        }
        return result.rows[0];
    } catch (err) {
        console.error('Error in patchComentario:', err);
        throw err;
    }
};

module.exports = { newComentario, getComentarios, deleteComentario, updateComentario, patchComentario };
