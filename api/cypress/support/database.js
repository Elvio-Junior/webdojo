const pgp = require('pg-promise')
const connectionDB = {
    host: 'localhost',
    port: 5432,
    database: 'UserDB',
    user: 'dba',
    password: 'dba'
}

const db = pgp(process.env.DATABASE_URL)

function deleteUserByEmail(email) {
    return db.none('delete from public."User" where email = $1', [email])
}

module.exports = {
    deleteUserByEmail   
}