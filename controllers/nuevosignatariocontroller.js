const db = require("../models")

module.exports = {
  //Métodos
  findAll: function(req, res) {
    db.Metodos.find(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },

  //Crea nuevo signatario y en métodos lo popula en sus métodos correspondientes
  createSignatarioEnMetodo: function(req, res) {
    // console.log("ESTE REQ PARAMS", req.params.id),
    // console.log("elbody", req.body)
    db.Signatarios.create(req.body.data)
      .then(function(elSignatario) {
        return db.Metodos.updateMany(
          { _id: { $in: req.params.id.split(",") } },
          { $push: { signatariopopulado: elSignatario._id } },
          { new: true }
        )
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
  //POPULATE
  findSignatarioEnMetodo: function(req, res) {
    db.Metodos.findOne({ _id: req.params.id })
      .populate("signatario")
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },

  updateOneSignatario: function(req, res) {
    // console.log("ESTE REQ PARAMS DE UPDATEONESIGNATARIO", req.params.id),
    // console.log("elbody", req.body)
    console.log("elsig", req.body.data.id)
    db.Signatarios.findOneAndUpdate({ _id: req.body.data.id }, req.body.data)
      .then(function(elSignatario) {
        return db.Metodos.updateMany(
          { _id: { $in: req.params.id.split(",") } },
          { $push: { signatariopopulado: elSignatario._id } },
          { new: true }
        )
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },

  //ESTA ES LA QUE USABAS ANTES QUE SIIIIIII FUNCIONA
  // create: function(req, res) {
  //   db.Signatarios
  //     .create(req.body)
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },
  findMetodoEnSignatario: function(req, res) {
    let methods
    try {
      methods = JSON.parse(req.query.methods)
    } catch (e) {
      return res.status(400).json({
        error: true,
        message: 'Invalid request type, must be a stringifed array of "metodos"'
      })
    }

    return (
      db.Signatarios.find({ metodospornombre: { $all: methods } })
        //db.Signatarios.find({})
        .then(dbModel =>
          res.json(
            dbModel.map(signatario => ({
              _id: signatario._id,
              clave: signatario.clave,
              name: signatario.nombresignatario
            }))
          )
        )
        .catch(err => res.status(422).json(err))
    )
  },
  findAllSignatarios: function(req, res) {
    db.Signatarios.find(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },

  findOneSignatario: function(req, res) {
    db.Signatarios.find({ _id: req.params.id })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  }
}
