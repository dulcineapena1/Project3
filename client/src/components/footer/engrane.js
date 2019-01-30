import React, { Component } from "react"
import "./modal.css"
import API from "../../utils/APIuna"
//import {Listado} from "./listado"
import { Input, InputEditable } from "./Input"
import { BotonGuardar } from "./botonGuardar"
import { ListadoAgrupado, Listado, ListadoConBotonDelete } from "./listado"

import ReactModal from "react-modal"
ReactModal.setAppElement("#root")

class Engrane extends Component {
  state = {
    showMenu: false,
    showModal: false,
    showFormularioAgregarSignatario: false,
    showFormularioEditarSignatario: false,
    hideAllButtons: false,
    mostrarCamposDeDetalleEditar: false,
    liClass: "",
    metodosdisponibles: [],
    metodosSeleccionados: [],
    metodosSeleccionadosPorNombre: [],
    claveNuevoSignatario: "",
    nombreNuevoSignatario: "",
    contrasenaNuevoSignatario: "",
    nombreBuscarEditarSignatario: "",
    todosSignatarios: [],
    encontradosSignatarios: [],
    filtrarSignatario: false,
    detalleUnSignatario: {
      clave: "",
      nombre: "",
      contrasena: "",
      metodos: [],
      metodospornombre: []
    },
    metodoIdANombre: []
  }

  //--------------->MENÚ TIPO TOGGLE
  showMenu = event => {
    event.preventDefault()
    this.setState({ showMenu: true }, () => {
      document.addEventListener("click", this.closeMenu)
    })
  }

  // Cierra el menú al dar click afuera
  closeMenu = event => {
    if (!this.dropdownMenu.contains(event.target)) {
      // "contains" es para referenciarlo
      this.setState({ showMenu: false }, () => {
        document.removeEventListener("click", this.closeMenu)
      })
    }
  }

  //--------------->MODAL SIGNATARIO NUEVO
  handleOpenModal = () => {
    this.setState({ showModal: true })
  }

  handleCloseModal = () => {
    this.setState({
      showModal: false,
      showFormularioAgregarSignatario: false,
      showFormularioEditarSignatario: false,
      hideAllButtons: false
    })
  }

  empezaragregarsignatario = () => {
    this.setState({
      showFormularioAgregarSignatario: true,
      hideAllButtons: true
    })
    this.cargarmetodos()
  }

  cargarmetodos = () => {
    API.getMetodos()
      .then(res => this.setState({ metodosdisponibles: res.data }))
      .catch(err => console.log(err))
  }

  handleMetodoClick = valorLiClick => {
    this.setState({
      metodosSeleccionadosPorNombre: this.state.metodosSeleccionadosPorNombre.concat(
        valorLiClick.nombremetodo
      ),
      metodosSeleccionados: this.state.metodosSeleccionados.concat(
        valorLiClick._id
      ),
      liClass: "limetodosselect"
    })
  }

  handleOnChangeInputNuevoSignatario = event => {
    const { value, name } = event.target
    this.setState({ [name]: value })
  }

  botonGuardarEmpleadoNuevo = event => {
    event.preventDefault()
    //API.saveSignatarioNuevo({   ESTE FUNCIONA ANTES
    API.postMetodosConSignatarios({
      clave: this.state.claveNuevoSignatario,
      nombresignatario: this.state.nombreNuevoSignatario,
      metodos: this.state.metodosSeleccionados,
      contrasena: this.state.contrasenaNuevoSignatario,
      metodospornombre: this.state.metodosSeleccionadosPorNombre
    })
      .then(res =>
        this.setState({
          showModal: false,
          showFormularioAgregarSignatario: false,
          hideAllButtons: false
        })
      )
      .catch(err => console.log(err, "ERROR API.SAVEsIGNATARIOnUEVO"))
  }

  //--------------->MODAL SIGNATARIO EDITAR
  empezareditarsignatario = () => {
    this.setState({
      showFormularioEditarSignatario: true,
      hideAllButtons: true,
      metodosSeleccionados: []
    })
    this.getTodosSignatarios()
    this.cargarmetodos()
  }

  getTodosSignatarios = () => {
    API.getSignatarios()
      .then(res =>
        this.setState({ todosSignatarios: res.data }, () =>
          this.filtrarBusquedaSignatarios()
        )
      )
      .catch(err => console.log(err, "ERROR API.GETtODOSsIGNATARIOS"))
  }

  handleOnChangeBuscarEditarSignatario = event => {
    const { value, name } = event.target
    this.setState({ [name]: value, mostrarCamposDeDetalleEditar: false }, () =>
      //El name es nombreBuscarEditarSignatario
      this.filtrarBusquedaSignatarios()
    )
  }

  filtrarBusquedaSignatarios = () => {
    // this.setState((state) => { return {mensaje:
    const signatarioEncontrado = this.state.todosSignatarios.filter(
      encontrado =>
        encontrado.nombresignatario.toLowerCase() ===
        this.state.nombreBuscarEditarSignatario.toLowerCase()
    )
    console.log("SIGNATARIO ENCONTRADO:", signatarioEncontrado)

    this.setState({ encontradosSignatarios: signatarioEncontrado })
  }

  mostrarDetalleSignatario = nombreEsteSignatario => {
    console.log("DETALLE DE", nombreEsteSignatario.id)
    API.getSignatarioSeleccionado(nombreEsteSignatario.id)
      //.then(res => this.setState({ detalleUnSignatario:  res.data   }) )

      .then(res =>
        this.setState({
          mostrarCamposDeDetalleEditar: true,
          detalleUnSignatario: {
            nombre: res.data[0].nombresignatario,
            clave: res.data[0].clave,
            contrasena: res.data[0].contrasena,
            metodos: res.data[0].metodos,
            metodospornombre: res.data[0].metodospornombre
          }
        })
      )
      .catch(err => console.log(err))
  }

  // conversionMetodoIdANombre = () => {
  //     let concidenciasEnNombreMetodo= []
  //    for (let i=0; i<this.state.detalleUnSignatario.metodos.length; i++) {
  //         let ca= this.state.detalleUnSignatario.metodos[i]
  //         console.log(ca)
  //         for(let i=0; i<this.state.metodosdisponibles.length; i++){
  //            let ki= this.state.metodosdisponibles[i]
  //             if(ki._id===ca){
  //                 console.log("di",ki.nombremetodo)
  //                 concidenciasEnNombreMetodo.push(ki.nombremetodo)
  //                 console.log(concidenciasEnNombreMetodo)
  //             }
  //         }
  //     }
  // }

  borrarMetodoDeUnSignatario = metodoABorrar => {
    const elindex = this.state.detalleUnSignatario.metodos.findIndex(
      esindex => esindex === metodoABorrar.nombre
    )
    console.log("elindex", elindex)
    const elindex2 = this.state.detalleUnSignatario.metodospornombre.splice(
      elindex,
      1
    )
    const elindex3 = this.state.detalleUnSignatario.metodos.splice(elindex, 1)
    this.setState({
      detalleUnSignatario: {
        clave: this.state.detalleUnSignatario.clave,
        nombre: this.state.detalleUnSignatario.nombre,
        contrasena: this.state.detalleUnSignatario.contrasena,
        metodos: this.state.detalleUnSignatario.metodos,
        //FILTRADO EN CASO DE QUE PUSIERAS EN FRONT UNA ALERTA SI LE DAN CLICK A UN MÉTODO QUE YA EXISTÍA
        // metodos: this.state.detalleUnSignatario.metodos.filter(function(person) {
        //     return person !== metodoABorrar.nombre
        //     }),
        metodospornombre: this.state.detalleUnSignatario.metodospornombre
      }
    })
  }

  handleMetodoClickenEditar = valorLiClick => {
    this.setState({
      detalleUnSignatario: {
        clave: this.state.detalleUnSignatario.clave,
        nombre: this.state.detalleUnSignatario.nombre,
        contrasena: this.state.detalleUnSignatario.contrasena,
        metodos: this.state.detalleUnSignatario.metodos.concat(
          valorLiClick._id
        ),
        metodospornombre: this.state.detalleUnSignatario.metodospornombre.concat(
          valorLiClick.nombremetodo
        )
      }
    })
  }

  handleOnChangeAgregarMetodoEnEditarSignatario = event => {
    const { value, name } = event.target
    this.setState({ [name]: value })
  }

  agregarMetodoEscritoAUnSignatario = event => {
    event.preventDefault()
    this.setState(
      {
        detalleUnSignatario: {
          clave: this.state.detalleUnSignatario.clave,
          nombre: this.state.detalleUnSignatario.nombre,
          contrasena: this.state.detalleUnSignatario.contrasena,
          metodos: this.state.detalleUnSignatario.metodos.concat(
            this.state.metodosSeleccionados
          )
        }
      },
      () => {
        this.setState({ metodosSeleccionados: [] })
      }
    )
  }

  // API.borrarMetodoDeUnSignatario(metodoABorrar.nombre)
  // .then(res => this.loadBooks())
  // .catch(err=>console.log(err));

  // getSignatarioSeleccionado = () => {
  //     API.getSignatarioSeleccionado(this.state.nombreBuscarEditarSignatario)
  //     //.then(res => this.loadBooks())
  //     .catch(err => console.log(err));
  // }

  render() {
    return (
      <div>
        <button
          className="menu-editar btn btn-secondary btn-lg active"
          onClick={this.showMenu}
        >
          {" "}
          Editar{" "}
        </button>

        {this.state.showMenu ? (
          <div
            className="interiormenu-editar"
            ref={element => {
              this.dropdownMenu = element
            }}
          >
            <button
              className="boton-baseeditar btn btn-primary btn-lg active"
              onClick={this.handleOpenModal}
            >
              {" "}
              Empleado{" "}
            </button>
            {/* <button className="boton-baseeditar" onClick={()=>props.editarbaseequipo}> Equipo </button> */}
            {/* <Editarempleadomodal/> */}
          </div>
        ) : null}

        {/*--------- Modal signatarios */}
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="onRequestClose Example"
          onRequestClose={this.handleCloseModal}
          shouldCloseOnOverlayClick={false}
          ariaHideApp={true}
          shouldFocusAfterRender={true}
        >
          {this.state.hideAllButtons ? null : (
            <button
              className="btn btn-success btn-lg active"
              onClick={this.empezaragregarsignatario}
            >
              {" "}
              Agregar empleado{" "}
            </button>
          )}
          {this.state.hideAllButtons ? null : (
            <button
              className="btn btn-secondary btn-lg active"
              onClick={this.empezareditarsignatario}
            >
              {" "}
              Editar empleado{" "}
            </button>
          )}

          {/*--------- Agregar signatarios */}
          {this.state.showFormularioAgregarSignatario ? (
            <form>
              <div className="form-group">
                <label>Agrega un nuevo empleado</label>
                <Input
                  label="Clave"
                  name="claveNuevoSignatario"
                  value={this.state.claveNuevoSignatario}
                  onChange={this.handleOnChangeInputNuevoSignatario}
                />
                <Input
                  label="Nombre"
                  name="nombreNuevoSignatario"
                  value={this.state.nombreNuevoSignatario}
                  onChange={this.handleOnChangeInputNuevoSignatario}
                />
                <Input
                  label="Contraseña"
                  name="contrasenaNuevoSignatario"
                  value={this.state.contrasenaNuevoSignatario}
                  onChange={this.handleOnChangeInputNuevoSignatario}
                />
                <Listado>
                  {this.state.metodosdisponibles.map(mapmetodosdisponibles => (
                    <li
                      className={`${this.state.liClass}` || "limetodos"}
                      onClick={() =>
                        this.handleMetodoClick(mapmetodosdisponibles)
                      }
                      name={mapmetodosdisponibles.nombremetodo}
                      id={mapmetodosdisponibles._id}
                      key={mapmetodosdisponibles._id}
                    >
                      {mapmetodosdisponibles.nombremetodo}
                    </li>
                  ))}
                </Listado>
                <BotonGuardar
                  className="btn btn-success btn-lg active"
                  onClick={this.botonGuardarEmpleadoNuevo}
                >
                  Guardar empleado nuevo
                </BotonGuardar>
              </div>
            </form>
          ) : null}

          {/*--------- Editar signatarios */}
          {this.state.showFormularioEditarSignatario ? (
            <form>
              <div className="form-group">
                <label>Editar empleados</label>
                <Input
                  label="Buscar empleado por nombre"
                  name="nombreBuscarEditarSignatario"
                  value={this.state.nombreBuscarEditarSignatario}
                  onChange={this.handleOnChangeBuscarEditarSignatario}
                />
                <ul className="list-group list-group-flush">
                  {this.state.encontradosSignatarios.length ? (
                    <div>
                      {this.state.encontradosSignatarios.map(
                        signatarioEncontrado => (
                          <ListadoAgrupado
                            key={signatarioEncontrado._id}
                            id={signatarioEncontrado._id}
                            nombre={signatarioEncontrado.nombresignatario}
                            mostrarDetalleSignatario={
                              this.mostrarDetalleSignatario
                            }
                          />
                        )
                      )}
                    </div>
                  ) : this.state.nombreBuscarEditarSignatario ? (
                    <p>...Buscando</p>
                  ) : (
                    <p>No hay infomación para mostrar</p>
                  )}
                </ul>

                {this.state.mostrarCamposDeDetalleEditar ? (
                  <div>
                    <InputEditable
                      label="Clave"
                      name="claveSignatarioAEditar"
                      defaultValue={this.state.detalleUnSignatario.clave}
                    />
                    <InputEditable
                      label="Nombre"
                      name="nombreSignatarioAEditar"
                      defaultValue={this.state.detalleUnSignatario.nombre}
                    />
                    <InputEditable
                      label="Contrasena"
                      name="contrasenaSignatarioAEditar"
                      defaultValue={this.state.detalleUnSignatario.contrasena}
                    />
                    {this.state.detalleUnSignatario.metodospornombre.map(
                      (mapSusMetodos, index) => (
                        <ListadoConBotonDelete
                          key={Math.floor(Math.random() * 10000 + 1)}
                          nombre={mapSusMetodos}
                          BotonBorrarMetodo={this.borrarMetodoDeUnSignatario}
                        />
                      )
                    )}
                    <Listado>
                      {this.state.metodosdisponibles.map(
                        mapmetodosdisponibles => (
                          <li
                            className={`${this.state.liClass}` || "limetodos"}
                            onClick={() =>
                              this.handleMetodoClickenEditar(
                                mapmetodosdisponibles
                              )
                            }
                            name={mapmetodosdisponibles.nombremetodo}
                            id={mapmetodosdisponibles._id}
                            key={mapmetodosdisponibles._id}
                          >
                            {mapmetodosdisponibles.nombremetodo}
                          </li>
                        )
                      )}
                    </Listado>
                    {/* AGREGAR MÉTODO INEXISTENTE, SI FUNCIONA 
                            <Input
                                label="Agrega un nuevo método"
                                name="metodosSeleccionados"
                                value={this.state.metodosSeleccionados}
                                onChange={this.handleOnChangeAgregarMetodoEnEditarSignatario}
                            />
                            <button onClick={this.agregarMetodoEscritoAUnSignatario}>Agregar Método</button> */}
                    <BotonGuardar>Actualizar empleado</BotonGuardar>
                  </div>
                ) : null}
              </div>
            </form>
          ) : null}

          <button
            className="btn btn-danger btn-lg active"
            onClick={this.handleCloseModal}
          >
            Cerrar
          </button>
        </ReactModal>

        {/*--------- Modal equipo */}
      </div>
    )
  }
}

export default Engrane
