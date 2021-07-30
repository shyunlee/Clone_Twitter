import { db } from '../db/database.js'

export async function findByUsername (username) {
    return db
        .execute('SELECT * FROM users WHERE username=?',[username])
        .then(result => {
            return result[0][0]
        })
}

export async function findById (id) {
    return db
        .execute('SELECT * FROM users WHERE id=?',[id])
        .then(result => {
            return result[0][0]
        })
}

export async function createUser (userInfo) {
    const {username, name, password, email, url} = userInfo
    return db
        .execute('INSERT INTO users (username, name, password, email, url) VALUES (?,?,?,?,?)', [username, name, password, email, url])
        .then(result => {
            return result[0].insertId
        })
}