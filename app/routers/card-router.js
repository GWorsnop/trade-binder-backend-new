const cardRouter = require("express").Router();
const {
  getCards,
  postCard,
  getCardsByUser,
  patchCardQuantity,
} = require("../controllers/card-controller");
const { methodNotAllowed } = require("../error-middleware");
const { removeCard } = require("../models/card-model");

cardRouter
  .route("/")
  .get(getCards)
  .post(postCard)
  .patch(patchCardQuantity)
  .delete(removeCard)
  .all(methodNotAllowed);

cardRouter.route("/:user").get(getCardsByUser);

module.exports = { cardRouter };
