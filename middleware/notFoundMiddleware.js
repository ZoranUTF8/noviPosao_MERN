const notFoundMiddleware = (req, res) => {
  res.status(404).send(`Putanja ne postoji`);
};

module.exports = notFoundMiddleware;
