const connection = require("../../db/connection");

exports.selectCards = (username) => {
  return connection
    .query(
      `
  SELECT * FROM cards
  WHERE username = $1
  `,
      [username]
    )
    .then((result) => {
      return result.rows;
    });
};

exports.insertCard = (newCard) => {
  const { name, price, quantity, username } = newCard;
  if (name && price && quantity && username) {
    return connection
      .query(
        `INSERT INTO categories
            (name, price, quantity, username)
            VALUES
            ($1, $2, $3, $4)
            RETURNING *`,
        [name, price, quantity, username]
      )
      .then((result) => {
        return result.rows[0];
      });
  } else {
    return Promise.reject({
      status: 400,
      errorMessage: "Bad Request - Missing fields",
    });
  }
};
