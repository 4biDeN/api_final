const db = require('../configs/pg')

const sql_insert = 
` insert into clientes (cli_doc, cli_nome, cli_email, cli_telefone, cli_status) 
    values ($1, $2, $3, $4, $5) `

const postClientes = async(params) => {
    const {cli_doc, cli_nome, cli_email, cli_telefone, cli_status} = params 
    await db.query(sql_insert, [cli_doc, cli_nome, cli_email, cli_telefone, cli_status])
}

module.exports = { postClientes }