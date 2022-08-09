const db = require("../connection");
const format = require("pg-format");

const seed = async (data) => {
  const { cardData, userData } = data;
  await db.query(`DROP TABLE IF EXISTS users;`);
  await db.query(`DROP TABLE IF EXISTS cards;`);

  const usersTablePromise = db.query(`
  CREATE TABLE users (
	username VARCHAR PRIMARY KEY,
	name VARCHAR NOT NULL,
	avatar_url VARCHAR,
	votes INT DEFAULT 0 NOT NULL
  );`);

  await Promise.all([usersTablePromise]);

  await db.query(`
  CREATE TABLE cards (
    card_id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
	price INT NOT NULL,
	quantity INT NOT NULL,
	username VARCHAR REFERENCES users(username)
  );`);

  const insertUsersQueryStr = format(
    "INSERT INTO users ( username, name, avatar_url) VALUES %L RETURNING *;",
    userData.map(({ username, name, avatar_url }) => [
      username,
      name,
      avatar_url,
    ])
  );

  const usersPromise = db
    .query(insertUsersQueryStr)
    .then((result) => result.rows);

  await Promise.all([usersPromise]);
};

module.exports = seed;
