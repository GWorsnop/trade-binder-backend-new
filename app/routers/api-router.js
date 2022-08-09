const apiRouter = require("express").Router();
const { cardRouter } = require("./card-router");
const { usersRouter } = require("./users-router");
const { methodNotAllowed } = require("../error-middleware");
const { getWelcomeMessage } = require("../controllers/endpoints-controller");

apiRouter.route("/").get(getWelcomeMessage).all(methodNotAllowed);

apiRouter.use("/cards", cardRouter);
apiRouter.use("/users", usersRouter);

module.exports = apiRouter;
