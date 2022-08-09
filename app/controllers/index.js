const { getCards, postCard } = require("./card-controller");
const { getUsers, getUserByName } = require("./users-controller");

module.exports = {
  getCards,
  postCard,
  getUsers,
  getUserByName,
};
