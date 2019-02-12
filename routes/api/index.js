const router = require("express").Router()

const ordenesController = require("../../controllers/ordenesController")
const proyectosController = require("../../controllers/proyectosController")
const tipoEstudioController = require("../../controllers/tipodestudioController")
const signatarioController = require("../../controllers/nuevosignatariocontroller")
router.route("/ordenes/add").post(ordenesController.create)
router
  .route("/ordenes/checkavailability")
  .get(ordenesController.findAvailability)
router.route("/proyectos/add").post(proyectosController.create)
router.route("/tipoestudio/").get(tipoEstudioController.findAll)
//Find one tipo de estudio
router.route("/tipoestudio/:id").get(tipoEstudioController.findOneTipodeEstudio)
//Find metodos en signatarios
router
  .route("/filtrarsignatarios")
  .get(signatarioController.findMetodoEnSignatario)
//DULCINEA AGREGÓ:
router.route("/proyectos/add").get(proyectosController.findAllProyectos)
//DULCINEA AGREGÓ:
router.route("/ordenes/add").get(ordenesController.findAllOrdenes)

module.exports = router
