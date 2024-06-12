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

module.exports = { postClientes, getClientes, getClienteById, deleteCliente };