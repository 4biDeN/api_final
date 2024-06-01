const db = require('../configs/pg')

const postAgenda = async (agendaData, responsaveis, observadores) => {
    console.log('teste')
    const { agenda_tipo_acao, agenda_dept_id, agenda_cli_cod, agenda_descricao, agenda_criado_por } = agendaData;
    const agenda_criado_em = new Date(); // Define a data de criação como o momento atual
    const agenda_alterado_em = new Date(); // Define a data de alteração como o momento atual
    const agenda_status = 0; // Define o status inicial (por exemplo, 0 para pendente)

    const client = await db.connect(); // Inicia uma transação

    try {
        await client.query('BEGIN'); // Inicia a transação

        // Insere o registro na tabela agenda
        const agendaQuery = `
            INSERT INTO agenda 
                (agenda_tipo_acao, agenda_dept_id, agenda_cli_cod, agenda_criado_em, agenda_alterado_em, 
                agenda_criado_por, agenda_descricao, agenda_status) 
            VALUES 
                ($1, $2, $3, $4, $5, $6, $7, $8) 
            RETURNING *`; // Utilize RETURNING * para obter os dados do novo registro inserido

        const agendaResult = await client.query(agendaQuery, [agenda_tipo_acao, agenda_dept_id, agenda_cli_cod, 
            agenda_criado_em, agenda_alterado_em, agenda_criado_por, agenda_descricao, agenda_status]);

        const newAgenda = agendaResult.rows[0];

        // Insere os registros na tabela agenda_resp
        const respValues = responsaveis.map(resp_id => [resp_id, newAgenda.agenda_id]);
        const respQuery = db.pgp.helpers.insert(respValues, ['agenda_responsaveis', 'agenda_agenda_id']);
        await client.query(respQuery);

        // Insere os registros na tabela agenda_obser
        const obsValues = observadores.map(obs_id => [obs_id, newAgenda.agenda_id]);
        const obsQuery = db.pgp.helpers.insert(obsValues, ['agenda_observador', 'agenda_agenda_id']);
        await client.query(obsQuery);

        await client.query('COMMIT'); // Confirma a transação

        return newAgenda; // Retorna o novo registro inserido na tabela agenda
    } catch (error) {
        await client.query('ROLLBACK'); // Reverte a transação em caso de erro
        console.error('Error creating agenda:', error);
        throw new Error('An error occurred while trying to create the agenda.');
    } finally {
        client.release(); // Libera o cliente de volta ao pool
    }
};

module.exports = { postAgenda };