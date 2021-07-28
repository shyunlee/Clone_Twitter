import mysql from 'mysql2'
import { config } from '../config.js'

const pool = mysql.createPool({
    user:config.db.user,
    password:config.db.password,
    database:config.db.database,
    host:config.db.host,
    port:config.db.port,
})

export const db = pool.promise()