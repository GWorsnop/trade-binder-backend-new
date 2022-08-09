const { selectCards, insertCard } = require("../models/card-model");

exports.getCards = (req, res) => {
  const { username } = req.params;
  selectCards(username).then((cards) => {
    res.status(200).send({ cards });
  });
};

exports.postCard = (req, res, next) => {
  const newCard = req.body;
  insertCard(newCard)
    .then((createdCard) => {
      res.status(201).send({ newCard: createdCard });
    })
    .catch((err) => {
      next(err);
    });
};
