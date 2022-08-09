exports.methodNotAllowed = (req, res, next) => {
  res.status(405).send({
    message: "Not Allowed - Method not allowed on this endpoint",
  });
};

exports.notFound = (req, res) => {
  res.status(404).send({ message: "Path not found" });
};

exports.customError = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ message: err.errorMessage });
  } else next(err);
};

exports.psqlError = (err, req, res, next) => {
  if (err.code === "22P02") {
    console.log("error found here");
    res.status(422).send({ message: "Unprocessable Entity", error: err });
  } else if (err.code === "23503") {
    res.status(400).send({ message: "Bad Request" });
  } else next(err);
};

exports.genericError = (err, req, res) => {
  console.log(err);
  res.status(500).send({ message: "Something went wrong" });
};
