const db = require('../configs/pg');

const sql_insert = `
    INSERT INTO clientes (cli_doc, cli_nome, cli_email, cli_telefone, cli_status) 
    VALUES ($1, $2, $3, $4, $5)
`;


const postClientes = async (params) => {
    const { cli_doc, cli_nome, cli_email, cli_telefone, cli_status } = params;
    await db.query(sql_insert, [cli_doc, cli_nome, cli_email, cli_telefone, cli_status]);
};

const sql_select = `
    SELECT * FROM clientes WHERE cli_status = 1
`;

const getClientes = async () => {
    const result = await db.query(sql_select);
    return result.rows;
};

const sql_select_id = `
    SELECT * FROM clientes WHERE cli_cod = $1
`

const getClienteById = async (cli_cod) => {
    const result = await db.query(sql_select_id, [cli_cod]);
    if (result.rows.length === 0) {
        throw new Error(`Cliente com ID ${cli_cod} não encontrado.`);
    }
    return result.rows[0];
};

const sql_delete = `
    UPDATE clientes 
        SET cli_status = $1 
        WHERE cli_cod = $2
`;

const deleteCliente = async (cli_cod) => {
    const statusInativo = 2;
    const result = await db.query(sql_delete, [statusInativo, cli_cod]);
    if (result.rowCount === 0) {
        throw new Error(`Cliente com ID ${cli_cod} não encontrado.`);
    }
    return { message: `Cliente com ID ${cli_cod} foi inativado com sucesso.` };
};

const sql_update = `
    UPDATE clientes
    SET
        cli_doc = $1,
        cli_nome = $2,
        cli_email = $3,
        cli_telefone = $4,
        cli_status = $5
    WHERE cli_cod = $6
    RETURNING *;
`;

const updateCliente = async (params) => {
    const {cli_cod, cli_doc, cli_nome, cli_email, cli_telefone, cli_status } = params

    try {
        const result = await db.query(sql_update, [
            cli_doc,
            cli_nome,
            cli_email,
            cli_telefone,
            cli_status,
            cli_cod
        ]);

        if (result.rows.length === 0) {
            throw new Error(`Cliente com ID ${cli_cod} não encontrado.`);
        }

        return result.rows[0];
    } catch (error) {
        console.error('Error updating cliente:', error);
        throw error;
    }
};

const patchCliente = async (params) => {
    let fields = '';
    let binds = [];
    let countParams = 1;

    if (params.cli_doc) {
        fields += ` cli_doc = $${countParams} `;
        binds.push(params.cli_doc);
        countParams++;
    }
    if (params.cli_nome) {
        fields += (fields ? ', ' : '') + ` cli_nome = $${countParams} `;
        binds.push(params.cli_nome);
        countParams++;
    }
    if (params.cli_email) {
        fields += (fields ? ', ' : '') + ` cli_email = $${countParams} `;
        binds.push(params.cli_email);
        countParams++;
    }
    if (params.cli_telefone) {
        fields += (fields ? ', ' : '') + ` cli_telefone = $${countParams} `;
        binds.push(params.cli_telefone);
        countParams++;
    }
    if (params.cli_status !== undefined) {
        fields += (fields ? ', ' : '') + ` cli_status = $${countParams} `;
        binds.push(params.cli_status);
        countParams++;
    }

    if (!fields) {
        throw new Error('No fields to update');
    }
    const sql_patch = 'UPDATE clientes SET ';
    let sql = sql_patch + fields + ' WHERE cli_cod = $' + countParams + ' RETURNING *';
    binds.push(params.cli_cod);
    try {
        const result = await db.query(sql, binds);
        if (result.rows.length === 0) {
            throw new Error(`Cliente com ID ${params.cli_cod} não encontrado.`);
        }
        return result.rows[0];
    } catch (err) {
        console.error('Error in patchCliente:', err);
        throw err;
    }
};



module.exports = { postClientes, getClientes, getClienteById, deleteCliente, updateCliente, patchCliente };