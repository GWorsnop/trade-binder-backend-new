const cardRouter = require("express").Router();
const {
  getCards,
  postCard,
  getCardsByUser,
  patchCardQuantity,
  deleteCard,
} = require("../controllers/card-controller");
const { methodNotAllowed } = require("../error-middleware");

cardRouter
  .route("/")
  .get(getCards)
  .post(postCard)
  .patch(patchCardQuantity)
  .delete(deleteCard)
  .all(methodNotAllowed);

cardRouter.route("/:user").get(getCardsByUser);

module.exports = { cardRouter };
