const db = require("../connection");
const format = require("pg-format");

const seed = async (data) => {
  const { cardData, userData } = data;
  await db.query(`DROP TABLE IF EXISTS cards;`);
  await db.query(`DROP TABLE IF EXISTS users;`);

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
  image VARCHAR NOT NULL,
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

  const insertCardsQueryStr = format(
    "INSERT INTO cards ( name, price, quantity, image, username) VALUES %L RETURNING *;",
    cardData.map(({ name, price, quantity, image, username }) => [
      name,
      price,
      quantity,
      image,
      username,
    ])
  );

  const usersPromise = db
    .query(insertUsersQueryStr)
    .then((result) => result.rows);

  const cardsPromise = db
    .query(insertCardsQueryStr)
    .then((result) => result.rows);

  await Promise.all([usersPromise, cardsPromise]);
};

module.exports = seed;
