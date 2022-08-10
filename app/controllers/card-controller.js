const {
  selectCards,
  insertCard,
  selectCardsByUser,
  updateCardQuantity,
  removeCard,
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

exports.patchCardQuantity = (req, res, next) => {
  const { inc_quantity, card_id } = req.body;
  updateCardQuantity(inc_quantity, card_id)
    .then((card) => {
      res.status(200).send({ card });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteCard = (req, res, next) => {
  const card_id = req.body;
  removeCard(card_id)
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      next(err);
    });
};
