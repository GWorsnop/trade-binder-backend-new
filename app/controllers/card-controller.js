const {
  selectCards,
  insertCard,
  selectCardsByUser,
  updateCardQuantity,
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
  const { inc_quantity } = req.body;
  const { card_id } = req.params;
  if (inc_quantity === undefined) {
    selectReviewById(card_id).then((selectedCard) => {
      res.status(400).send({
        card: selectedCard,
        errorMessage: "Bad Request - Please provide inc_quantity in request",
      });
    });
  } else
    updateCardQuantity(inc_quantity, card_id)
      .then((card) => {
        res.status(200).send({ card });
      })
      .catch((err) => {
        next(err);
      });
};
