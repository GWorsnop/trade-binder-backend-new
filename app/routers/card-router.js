const cardRouter = require("express").Router();
const {
  getCards,
  postCard,
  getCardsByUser,
  patchCardQuantity,
} = require("../controllers/card-controller");
const { methodNotAllowed } = require("../error-middleware");

cardRouter
  .route("/")
  .get(getCards)
  .post(postCard)
  .patch(patchCardQuantity)
  .all(methodNotAllowed);

cardRouter.route("/:user").get(getCardsByUser);

module.exports = { cardRouter };
