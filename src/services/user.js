const db = require('../configs/pg');
const cript = require('../utils/salt');

const sql_insert = ` 
        insert into users (
            user_username, 
            user_email, 
            user_dept, 
            user_password, 
            user_salt)
        values ($1, $2, $3, $4, $5) `

const newUser = async(params) => {
        const {user_username, user_email, user_dept, user_password} = params;
        const {user_salt, hashedPassword} = cript.criarUsuario(user_password);
        result = await db.query(sql_insert, [user_username, user_email, user_dept, hashedPassword, user_salt])
    return result
}

const sql_get = `
    select user_id,
        user_username,
        user_email,
        user_dept
    from users `

const getUserById = async (user_id) =>{
    const query = ` select user_username, user_salt, user_password from users where user_id = $1`
    result = await db.query(query, [user_id])
    if (result.rows.length === 0) {
        throw new Error(`Usuário com o ID ${user_id} Não Encontrado`);
    }
    return result.rows[0];
}

const getUser = async () => {
    try {
    result = await db.query(sql_get, [])
    return {
        total: result.rows.length,
        usuarios: result.rows
        }
    } catch (err){
        console.log(err.message);
    }
}

const sql_patch = `
    update users
        set `

const patchPassword = async (params) => {
    const {user_id, user_username, user_password, newpass} = params
    let binds = [user_id];
    const user_data = await getUserById(user_id)
    let validatePassword = cript.comparePassword(user_data.user_password, user_data.user_salt, user_password);
    if (validatePassword){
        let sql = sql_patch
        if (newpass) {
            const {user_salt, hashedPassword} = cript.criarUsuario(newpass)
            sql += ` user_password = $2, user_salt = $3 `
            binds.push(hashedPassword)
            binds.push(user_salt)
        }
        if (user_username) {
            sql += ` , user_username = $4 `
            binds.push(user_username)
        }
        return await db.query(sql + ` where user_id = $1 `, binds)
    } else {
        return "Senha Inválida.";
    }
}

module.exports.newUser = newUser
module.exports.getUser = getUser
module.exports.getUserById = getUserById
module.exports.patchPassword = patchPassword