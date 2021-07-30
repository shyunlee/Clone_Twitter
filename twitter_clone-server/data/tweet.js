import * as authRepo from "../data/auth.js";
import { db } from "../db/database.js";

const SELECT_JOIN = `SELECT tweets.id, tweets.text, tweets.userId, users.username, users.name, users.email, users.url FROM users INNER JOIN tweets ON users.id = tweets.userId`
const ORDER_BY = 'ORDER BY tweets.createdAt DESC'

export async function getAllTweets() {
  return db
    .execute(
      `${SELECT_JOIN} ${ORDER_BY}`
    )
    .then((result) => {
      return result[0];
    });
}

export async function getByUsername(username) {
  return db
    .execute(`${SELECT_JOIN} WHERE users.username = ? ${ORDER_BY}`, [username])
    .then((result) => {
      return result[0];
    });
}

export async function create({text, username}) {
  const { id } = await authRepo.findByUsername(username);
  return db
    .execute(`
      INSERT INTO tweets (text, createdAt, userId) VALUES (?, ?, ?)
    `, [text, new Date(), id])
    .then((result) => {
      return getById(result[0].insertId)
    })
}

export async function getById(tweetId) {
  return db
    .execute(`${SELECT_JOIN} WHERE tweets.id=? ${ORDER_BY}`, [tweetId])
    .then(result => {
      return result[0][0]
    })
}

export async function update(tweetId, text) {
  return db
    .execute(`
      UPDATE tweets
      SET text=?
      WHERE id=?
    `, [text, tweetId])
    .then(() => {
      return getById(tweetId)
    })
}

export async function remove(tweetId) {
  db.execute(`
    DELETE FROM tweets WHERE id=?
  `, [tweetId])
}
