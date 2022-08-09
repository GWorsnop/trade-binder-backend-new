const cardRouter = require("express").Router();
const { getCards, postCard } = require("../controllers/card-controller");
const { methodNotAllowed } = require("../error-middleware");

cardRouter.route("/").get(getCards).post(postCard).all(methodNotAllowed);

module.exports = { cardRouter };
