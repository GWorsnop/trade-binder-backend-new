exports.getWelcomeMessage = (req, res, next) => {
  res.status(200).send({
    message: "Welcome to tradebinder, this is currently undergoing development",
  });
};
