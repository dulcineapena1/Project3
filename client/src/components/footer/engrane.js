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
      id: "",
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

  borrarMetodoEnAgregarSignatario = metodoABorrar => {
    const elindex = this.state.metodosSeleccionadosPorNombre.findIndex(
      esindex => esindex === metodoABorrar.nombre
    )
    console.log("elindex", elindex)
    const elindex2 = this.state.metodosSeleccionados.splice(elindex, 1)
    const elindex3 = this.state.metodosSeleccionadosPorNombre.splice(elindex, 1)
    console.log(metodoABorrar,elindex2,elindex3)
    this.setState({
      metodosSeleccionados: this.state.metodosSeleccionados,
      metodosSeleccionadosPorNombre: this.state.metodosSeleccionadosPorNombre
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
      .then(res =>
        this.setState({
          mostrarCamposDeDetalleEditar: true,
          detalleUnSignatario: {
            id: nombreEsteSignatario.id,
            nombre: res.data[0].nombresignatario,
            clave: res.data[0].clave,
            contrasena: res.data[0].contrasena,
            metodos: res.data[0].metodos,
            metodospornombre: res.data[0].metodospornombre
          },
          claveNuevoSignatario: res.data[0].clave, //Estos tres campos son porque esto ayuda a hacer un update, de estos campos jala la info para el update
          nombreNuevoSignatario: res.data[0].nombresignatario,
          contrasenaNuevoSignatario: res.data[0].contrasena
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
    const elindex = this.state.detalleUnSignatario.metodospornombre.findIndex(
      esindex => esindex === metodoABorrar.nombre
    )
    console.log(metodoABorrar)
    console.log("elindex", elindex)
    const elindex2 = this.state.detalleUnSignatario.metodospornombre.splice(elindex,1)
    const elindex3 = this.state.detalleUnSignatario.metodos.splice(elindex, 1)
    console.log("bases", elindex2,elindex3)
    this.setState({
      detalleUnSignatario: {
        id: this.state.detalleUnSignatario.id,
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
        id: this.state.detalleUnSignatario.id,
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
          id: this.state.detalleUnSignatario.id,
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

  // getSignatarioSeleccionado = () => {
  //     API.getSignatarioSeleccionado(this.state.nombreBuscarEditarSignatario)
  //     //.then(res => this.loadBooks())
  //     .catch(err => console.log(err));
  // }

  handleOnChangeEditarInformacionSignatario = event => {
    const { value, name } = event.target
    this.setState({ [name]: value })
  }

  actualizarInformacionSignatario = event => {
    event.preventDefault()
    API.updateInformacionSignatario({
      id: this.state.detalleUnSignatario.id,
      clave: this.state.claveNuevoSignatario,
      nombresignatario: this.state.nombreNuevoSignatario,
      contrasena: this.state.contrasenaNuevoSignatario,
      metodos: this.state.detalleUnSignatario.metodos,
      metodospornombre: this.state.detalleUnSignatario.metodospornombre
    })
      .then(res =>
        this.setState({
          mostrarCamposDeDetalleEditar: false,
          detalleUnSignatario: {
            id: "",
            nombre: "",
            clave: "",
            contrasena: "",
            metodos: [],
            metodospornombre: []
          },
          claveNuevoSignatario: "",
          nombreNuevoSignatario: "",
          contrasenaNuevoSignatario: ""
        })
      )
      .catch(err => console.log(err, "ERROR API.ACTUALIZARsIGNATARIOeXISTENTE"))
  }

  render() {
    return (
      <div className="contenedorEngrane">
        <button className="buttonMenu" onClick={this.showMenu}>
          <a className="texto-navegacion">
            EDITAR
          </a>
        </button>

        {this.state.showMenu ? (
          <div
            className="interiormenu-editar"
            ref={element => {
              this.dropdownMenu = element
            }}
          >
            <button className="buttonMenuSubmenu" onClick={this.handleOpenModal}>
              {" "}Empleado{" "}
            </button>
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
          <div className="inicioModalcenter">
            <div className="row inicio">
              <div className="col-md-12 centradoCol">
                {this.state.hideAllButtons ? null : (
                  
                    <button
                      className="button2"
                      onClick={this.empezaragregarsignatario}
                    >
                      {" "}<span style={{color: '#03a9f4'}}>Agregar</span> empleado{" "}
                    </button>
                  
                )}
                {this.state.hideAllButtons ? null : (
                    <button
                      className="button2"
                      onClick={this.empezareditarsignatario}
                    >
                      {" "}<span style={{color: '#03a9f4'}}>Editar</span> empleado{" "}
                    </button>
                )}
              </div>
            </div>
          </div>

          {/*--------- Agregar signatarios */}
          {this.state.showFormularioAgregarSignatario ? (
            <form>
              <div className="row">
                <div className="col-md-10 modalsectionA">
                  <div className="form-group formheadmodal">
                    <label className="tituloModal">
                      Agrega un nuevo empleado
                    </label>
                    <Input
                      classnameinputmodal="formheadmodalinput"
                      className="labelInputModal"
                      label="Clave"
                      name="claveNuevoSignatario"
                      value={this.state.claveNuevoSignatario}
                      onChange={this.handleOnChangeInputNuevoSignatario}
                    />
                    <Input
                      classnameinputmodal="formheadmodalinput"
                      className="labelInputModal"
                      label="Nombre"
                      name="nombreNuevoSignatario"
                      value={this.state.nombreNuevoSignatario}
                      onChange={this.handleOnChangeInputNuevoSignatario}
                    />
                    <Input
                      classnameinputmodal="formheadmodalinput"
                      className="labelInputModal"
                      label="Contraseña"
                      name="contrasenaNuevoSignatario"
                      value={this.state.contrasenaNuevoSignatario}
                      onChange={this.handleOnChangeInputNuevoSignatario}
                    />
                  </div>
                  <br/> <br/>
                  <div className="row rowlistadometodos">
                    <div className="col-md-6 modalsectionC">
                      <label className="labelInputModal7">
                        Métodos disponibles
                      </label>
                      <Listado>
                        {this.state.metodosdisponibles.map(
                          mapmetodosdisponibles => (
                            <li
                              className="listaMetodosDisponibles"
                              onClick={() =>
                                this.handleMetodoClick(mapmetodosdisponibles)
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
                    </div>
                    <div className="col-md-6 modalsectionC">
                      <label className="labelInputModal7">
                        Métodos seleccionados
                      </label>

                      {this.state.metodosSeleccionadosPorNombre.map(
                        (mapSusMetodos, index) => (
                          <ListadoConBotonDelete
                            key={Math.floor(Math.random() * 10000 + 1)}
                            nombre={mapSusMetodos}
                            BotonBorrarMetodo={
                              this.borrarMetodoEnAgregarSignatario
                            }
                          />
                        )
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-5 botonesFooter">
                      <BotonGuardar
                        className="saveButton"
                        onClick={this.botonGuardarEmpleadoNuevo}
                      >
                        Guardar empleado nuevo
                      </BotonGuardar>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          ) : null}

          {/*--------- Editar signatarios */}
          {this.state.showFormularioEditarSignatario ? (
            <form>
              <div className="form-group">
                <label className="tituloModal">Editar empleados</label>
                <div className="row">
                  <div className="col-md-12 modalsectionD">
                    <Input
                      classnameinputmodal="formheadmodalinput2"
                      label="Buscar empleado por nombre"
                      className="labelInputModal2"
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
                        <p className="labelInputModal3">...Buscando</p>
                      ) : (
                        <p className="labelInputModal3">
                          No hay infomación para mostrar
                        </p>
                      )}
                    </ul>
                  </div>
                </div>
                
                {this.state.mostrarCamposDeDetalleEditar ? (
                  <div className="row centradoRow">
                    <label className="tituloModal2">
                      -Detalles-
                    </label>
                    <br/><br/>
                    <div className="col-md-9 centradoInput">
                      <InputEditable
                        classnameinputmodal="formheadmodalinput"
                        className="labelInputModal"
                        label="Clave"
                        name="claveNuevoSignatario"
                        value={this.props.value}
                        onChange={this.handleOnChangeEditarInformacionSignatario}
                        defaultValue={this.state.detalleUnSignatario.clave || ""}
                      />
                      <InputEditable
                        classnameinputmodal="formheadmodalinput"
                        className="labelInputModal"
                        label="Nombre"
                        name="nombreNuevoSignatario"
                        value={this.props.value}
                        onChange={this.handleOnChangeEditarInformacionSignatario}
                        defaultValue={this.state.detalleUnSignatario.nombre || ""}
                      />
                      <InputEditable
                        classnameinputmodal="formheadmodalinput"
                        className="labelInputModal"
                        label="Contraseña"
                        name="contrasenaNuevoSignatario"
                        value={this.props.value}
                        onChange={this.handleOnChangeEditarInformacionSignatario}
                        defaultValue={
                          this.state.detalleUnSignatario.contrasena || ""
                        }
                      />
                    </div>
                    <div className="row rowlistadometodos">
                      <div className="col-md-6 modalsectionC">
                        <label className="labelInputModal7">
                          Métodos disponibles
                        </label>
                        <Listado>
                          {this.state.metodosdisponibles.map(
                            mapmetodosdisponibles => (
                              <li
                                onClick={() =>
                                  this.handleMetodoClickenEditar(
                                    mapmetodosdisponibles
                                  )
                                }
                                name={mapmetodosdisponibles.nombremetodo}
                                id={mapmetodosdisponibles._id}
                                key={mapmetodosdisponibles._id}
                                className="listaMetodosDisponibles"
                              >
                                {mapmetodosdisponibles.nombremetodo}
                              </li>
                            )
                          )}
                        </Listado>
                      </div>
                      <div className="col-md-6 modalsectionC">
                        <label className="labelInputModal7">
                          Métodos de este empleado
                        </label>
                        {this.state.detalleUnSignatario.metodospornombre.map(
                          (mapSusMetodos, index) => (
                            <ListadoConBotonDelete
                              key={Math.floor(Math.random() * 10000 + 1)}
                              nombre={mapSusMetodos}
                              BotonBorrarMetodo={
                                this.borrarMetodoDeUnSignatario
                              }
                            />
                          )
                        )}
                      </div>
                    </div>
                    {/* AGREGAR MÉTODO INEXISTENTE, SI FUNCIONA 
                            <Input
                                label="Agrega un nuevo método"
                                name="metodosSeleccionados"
                                value={this.state.metodosSeleccionados}
                                onChange={this.handleOnChangeAgregarMetodoEnEditarSignatario}
                            />
                            <button onClick={this.agregarMetodoEscritoAUnSignatario}>Agregar Método</button> */}
                    <div className="row botonGuardar">
                      <div className="col-sm-5 botonesFooter">
                        <BotonGuardar
                          className="saveButton"
                          onClick={this.actualizarInformacionSignatario}
                        >
                          Actualizar empleado
                        </BotonGuardar>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </form>
          ) : null}
          
          
          <button className="cerrarModal" onClick={this.handleCloseModal}>
            <span style={{color: '#03A9F4', fontSize: '23px'}}>
              <i className="far fa-window-close"></i>
            </span>
          </button>
        </ReactModal>

        {/*--------- Modal equipo */}
      </div>
    )
  }
}

export default Engrane
