const connection = require("../../db/connection");

exports.selectCards = () => {
  return connection
    .query(
      `
  SELECT * FROM cards
  `
    )
    .then((result) => {
      return result.rows;
    });
};

exports.selectCardsByUser = (user) => {
  return connection
    .query(
      `
    SELECT * FROM cards
    WHERE username = $1
    `,
      [user]
    )
    .then((result) => {
      return result.rows;
    });
};

exports.insertCard = (newCard) => {
  const { name, price, quantity, image, username } = newCard;
  if (name && price && quantity && image && username) {
    return connection
      .query(
        `INSERT INTO cards
            (name, price, quantity, image, username)
            VALUES
            ($1, $2, $3, $4, $5)
            RETURNING *`,
        [name, price, quantity, image, username]
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

exports.updateCardQuantity = (inc_quantity, card_id) => {
  return connection
    .query(
      "UPDATE cards SET quantity = quantity + $1 WHERE card_id = $2 RETURNING *",
      [inc_quantity, card_id]
    )
    .then((result) => {
      if (result.rows.length > 0) {
        return result.rows[0];
      } else {
        return Promise.reject({
          status: 404,
          errorMessage: "Not Found - card_id does not exist",
          data: result,
        });
      }
    });
};
