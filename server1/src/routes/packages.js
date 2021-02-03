module.exports = (app) => {
  const Package = app.db.models.package;

  app
    .route("/packages")
    .get(async (req, res) => {
      await Package.findAll({
        include: [{ model: Pakckage, attributes: ["name", "publisher"] }],
      })
        .then((result) => res.json(result))
        .catch((error) => res.status(500).json({ error: error.message }));
    })
    .post(async (req, res) => {
      await Package.create(req.body)
        .then((result) => {
          if (req.body.id != null) {
            Package.create({
              name: req.body.package.name,
              publisher: req.body.package.publisher,
              binary: req.body.package.package,
              id: result.id,
            })
          } else {
            res.json(result);
          }
        })
        .catch((error) => res.status(500).json({ error: error.message }));
    });
};
