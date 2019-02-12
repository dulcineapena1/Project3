const db = require("../models")

module.exports = {
  findAll: function(req, res) {
    db.Tipodeestudio.find(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
  findOneTipodeEstudio: function(req, res) {
    //console.log("ESTE REQ PARAMS", req.params.id),
    //console.log("elbody", req.body)
    db.Tipodeestudio.find({ _id: req.params.id })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  }
}
