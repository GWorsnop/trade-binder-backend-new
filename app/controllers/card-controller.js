const { selectCards, insertCard } = require("../models/card-model");

exports.getCards = (req, res) => {
  selectCards().then((cards) => {
    console.log(cards);
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
