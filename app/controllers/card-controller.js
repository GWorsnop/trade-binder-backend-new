const {
  selectCards,
  insertCard,
  selectCardsByUser,
} = require("../models/card-model");

exports.getCards = (req, res) => {
  selectCards().then((cards) => {
    console.log(cards);
    res.status(200).send({ cards });
  });
};

exports.getCardsByUser = (req, res, next) => {
  const { user } = req.params;
  selectCardsByUser(user)
    .then((selectedCards) => {
      res.status(200).send({ cards: selectedCards });
    })
    .catch((err) => {
      next(err);
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
