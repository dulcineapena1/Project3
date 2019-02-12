const mongoose = require("mongoose")
const Schema = mongoose.Schema

const TipodeestudioSchema = new Schema({
  clave: { type: String, required: true }, //Este es el id que pusiste en el excel, lo pongo como "clave" para que no se confunda con el id que genera automáticamente mongo, el unique:true evita que se genere contenido duplicado
  nombretipodeestudio: { type: String, required: true },
  descripcion: { type: String },
  nombrerama: { type: String }, //ESTE CAMPO SE TIENE QUE BORRAR
  metodos: { type: [String] }
  // Lo de abajo es para popular:
  // metodos: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: "Metodos"
  //   }
  // ]
})

const Tipodeestudio = mongoose.model("Tipodeestudio", TipodeestudioSchema)

module.exports = Tipodeestudio
