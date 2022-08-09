const cardRouter = require("express").Router();
const {
  getCards,
  postCard,
  getCardsByUser,
} = require("../controllers/card-controller");
const { methodNotAllowed } = require("../error-middleware");

cardRouter.route("/").get(getCards).post(postCard).all(methodNotAllowed);

reviewsRouter.route("/:user").get(getCardsByUser);

module.exports = { cardRouter };
