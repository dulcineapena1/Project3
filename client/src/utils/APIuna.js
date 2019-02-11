import axios from "axios"
//axios.defaults.baseURL= "http://localhost:5000";
//Este archivo es similar al ajax que tenías antes en un .js del front
export default {
  // Gets all metodos saved in database
  getMetodos: function() {
    return axios.get("/api/metodos")
  },
  // Post signatarios en el método seleccionado
  postMetodosConSignatarios: function(idsignatario) {
    return axios.post("/api/metodos/signatario/" + idsignatario.metodos, {
      data: idsignatario
    })
  },
  // Get ONE método seleccionado
  getMetodosConSignatarios: function(idsignatario) {
    return axios.get("/api/metodos/signatario/" + idsignatario.metodos)
  },

  //SI FUNCIONAAA
  // Saves a new signatario to the database
  // saveSignatarioNuevo: function(signatarioData) {
  //   return axios.post("/api/signatarios", signatarioData);
  // },
  //Get all signatarios
  getSignatarios: function() {
    return axios.get("/api/signatarios")
  },
  // Get one signatario by nombre
  getSignatarioSeleccionado: function(id) {
    return axios.get("/api/signatarios/" + id)
  },
  // Deletes un método de un signatario
  // deleteBook: function(metodo) {
  //   return axios.delete("/api/signatarios/" + metodo)
  // },

  // updateInformacionSignatario:function(informacion) {
  //   return axios.put("/api/signatarios/" + informacion.id,{data:informacion} )
  // }
  updateInformacionSignatario:function(informacion) {
    return axios.put("/api/metodos/signatario/"  + informacion.metodos,{data:informacion} )
  }
}
