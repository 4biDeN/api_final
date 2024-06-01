const crypto = require('crypto');

function criarUsuario (senha){
    const user_salt = generateSalt()
    const hashedPassword = hashPassword(senha, user_salt)
    return {user_salt, hashedPassword}
}

function generateSalt(){
    return crypto.randomBytes(16).toString('hex');
}

function hashPassword(password, user_salt){
    return crypto.pbkdf2Sync(password, user_salt, 1000, 64, 'sha512').toString('hex');
}

function comparePassword(storedPassword, user_salt, providedPassword) {
    const hash = hashPassword(providedPassword, user_salt)
    return hash === storedPassword
}

module.exports.criarUsuario = criarUsuario;
module.exports.comparePassword = comparePassword;