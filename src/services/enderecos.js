const db = require('../configs/pg');

const sql_insert_endereco = `
        INSERT INTO enderecos (end_cli_cod, end_cep, end_logradouro, end_bairro, end_numero, end_uf, end_complemento, end_contato, end_tipo, end_status)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING *`;
        
const postEndereco = async (enderecoData) => {
    const { end_cli_cod, end_cep, end_logradouro, end_bairro, end_numero, end_uf, end_complemento, end_contato, end_tipo, end_status } = enderecoData;
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
    select end_cod, end_cli_cod, end_cep, end_logradouro, end_bairro, end_numero, end_uf, end_complemento, end_contato, end_tipo, end_status 
        from enderecos WHERE end_status = 1 `

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

const sql_get_bycliente = `
select end_cod, end_cli_cod, end_cep, end_logradouro, end_bairro, end_numero, end_uf, end_complemento, end_contato, end_tipo, end_status 
    from enderecos
`

const getByCliente = async(end_cli_cod) => {
    const query = sql_get_bycliente + ` where end_cli_cod = $1 `
    result = await db.query(query, [end_cli_cod])
    if (result.rows.length === 0) {
        throw new Error(` Não encontrados endereços para o Cliente ${end_cli_cod} `)
    }
    return {
        total: result.rows.length,
        enderecos: result.rows
    }
}

const sql_delete = ` UPDATE enderecos SET end_status = 2 WHERE end_cod = $1 `

const deleteEndereco = async (params) => {
    try {
        await db.query(sql_delete, [params])
        return { message: `Endereço deletado com Sucesso`}
    } catch (err) {
        return { err: `Erro ao Deletar Endereço`}
    }
};

const putEndereco = async (end_cod, updateData) => {
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
            end_cli_cod = $1,
            end_cep = $2,
            end_logradouro = $3,
            end_bairro = $4,
            end_numero = $5,
            end_uf = $6,
            end_complemento = $7,
            end_contato = $8,
            end_tipo = $9,
            end_status = $10
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

const patchEndereco = async (params) => {
    let fields = '';
    let binds = [];
    let countParams = 1;

    if (params.end_cli_cod !== undefined) {
        fields += ` end_cli_cod = $${countParams} `;
        binds.push(params.end_cli_cod);
        countParams++;
    }
    if (params.end_cep !== undefined) {
        fields += (fields ? ', ' : '') + ` end_cep = $${countParams} `;
        binds.push(params.end_cep);
        countParams++;
    }
    if (params.end_logradouro !== undefined) {
        fields += (fields ? ', ' : '') + ` end_logradouro = $${countParams} `;
        binds.push(params.end_logradouro);
        countParams++;
    }
    if (params.end_bairro !== undefined) {
        fields += (fields ? ', ' : '') + ` end_bairro = $${countParams} `;
        binds.push(params.end_bairro);
        countParams++;
    }
    if (params.end_numero !== undefined) {
        fields += (fields ? ', ' : '') + ` end_numero = $${countParams} `;
        binds.push(params.end_numero);
        countParams++;
    }
    if (params.end_uf !== undefined) {
        fields += (fields ? ', ' : '') + ` end_uf = $${countParams} `;
        binds.push(params.end_uf);
        countParams++;
    }
    if (params.end_complemento !== undefined) {
        fields += (fields ? ', ' : '') + ` end_complemento = $${countParams} `;
        binds.push(params.end_complemento);
        countParams++;
    }
    if (params.end_contato !== undefined) {
        fields += (fields ? ', ' : '') + ` end_contato = $${countParams} `;
        binds.push(params.end_contato);
        countParams++;
    }
    if (params.end_tipo !== undefined) {
        fields += (fields ? ', ' : '') + ` end_tipo = $${countParams} `;
        binds.push(params.end_tipo);
        countParams++;
    }
    if (params.end_status !== undefined) {
        fields += (fields ? ', ' : '') + ` end_status = $${countParams} `;
        binds.push(params.end_status);
        countParams++;
    }

    if (!fields) {
        throw new Error('No fields to update');
    }

    const sql_update = 'UPDATE enderecos SET ';
    let sql = sql_update + fields + ' WHERE end_cod = $' + countParams + ' RETURNING *';
    binds.push(params.end_cod);

    try {
        const result = await db.query(sql, binds);
        if (result.rows.length === 0) {
            throw new Error(`Endereço com ID ${params.end_cod} não encontrado.`);
        }
        return result.rows[0];
    } catch (err) {
        console.error('Error in patchEndereco:', err);
        throw err;
    }
};


module.exports = { postEndereco, getEndereco, getByCliente, deleteEndereco, patchEndereco, putEndereco }