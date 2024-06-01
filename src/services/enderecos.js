const db = require('../configs/pg');

const postEndereco = async (enderecoData) => {
    const { end_cli_cod, end_cep, end_logradouro, end_bairro, end_numero, end_uf, end_complemento, end_contato, end_tipo, end_status } = enderecoData;
    const sql_insert_endereco = `
        INSERT INTO enderecos (end_cli_cod, end_cep, end_logradouro, end_bairro, end_numero, end_uf, end_complemento, end_contato, end_tipo, end_status)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING *`;

    try {
        const result = await db.query(sql_insert_endereco, [
            end_cli_cod, end_cep, end_logradouro, end_bairro, end_numero, end_uf, end_complemento, end_contato, end_tipo, end_status
        ]);
        return result.rows[0];
    } catch (error) {
        console.error('Error inserting endereco:', error);
        throw new Error('An error occurred while trying to insert the endereco.');
    }
};

const sql_get = `
    select end_cod, end_cep, end_logradouro, end_bairro, end_numero, end_uf, end_complemento, end_contato, end_status 
        from enderecos `

const getEndereco = async() => {
    try {
        result = await db.query(sql_get, [])
        return {
            total: result.rows.length,
            enderecos: result.rows
        }
    } catch (err){
        console.log(err.message);
    }
}

const getByCliente = async(end_cli_cod) => {
    const query = sql_get + ` where end_cli_cod = $1 and end_status = 1 `
    result = await db.query(query, [end_cli_cod])
    if (result.rows.length === 0) {
        throw new Error(` Não encontrados endereços para o Cliente ${end_cli_cod} `)
    }
    return {
        total: result.rows.length,
        enderecos: result.rows
    }
}

const sql_delete = ` delete from enderecos where end_cod = $1 `

const deleteEndereco = async (params) => {
    try {
        await db.query(sql_delete, [params])
        return { message: `Endereço deletado com Sucesso`}
    } catch (err) {
        return { err: `Erro ao Deletar Endereço`}
    }
}

const patchEndereco = async (end_cod, updateData) => {
    const {
        end_cli_cod,
        end_cep,
        end_logradouro,
        end_bairro,
        end_numero,
        end_uf,
        end_complemento,
        end_contato,
        end_tipo,
        end_status
    } = updateData;

    const sql_update = `
        UPDATE enderecos
        SET
            end_cli_cod = COALESCE($1, end_cli_cod),
            end_cep = COALESCE($2, end_cep),
            end_logradouro = COALESCE($3, end_logradouro),
            end_bairro = COALESCE($4, end_bairro),
            end_numero = COALESCE($5, end_numero),
            end_uf = COALESCE($6, end_uf),
            end_complemento = COALESCE($7, end_complemento),
            end_contato = COALESCE($8, end_contato),
            end_tipo = COALESCE($9, end_tipo),
            end_status = COALESCE($10, end_status)
        WHERE end_cod = $11
        RETURNING *;
    `;

    try {
        const result = await db.query(sql_update, [
            end_cli_cod,
            end_cep,
            end_logradouro,
            end_bairro,
            end_numero,
            end_uf,
            end_complemento,
            end_contato,
            end_tipo,
            end_status,
            end_cod
        ]);

        return result.rows[0];
    } catch (error) {
        console.error('Error updating endereco:', error);
        throw error;
    }
};



module.exports = { postEndereco, getEndereco, getByCliente, deleteEndereco, patchEndereco }