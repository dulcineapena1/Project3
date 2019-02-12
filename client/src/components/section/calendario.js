import React, { Component as Compo } from "react"
import { Link } from "react-router-dom"
import "./calendario.css"
import API from "../../utils/API"
import { InformacionAMostrar } from "./Input"
import { InformacionAMostrarenProyecto } from "./Input"
import { Card } from "./card"
import {ListadoAgrupado} from "./listado"
import {Nav} from "./nav"

import Calendar from "react-big-calendar"
import moment from "moment"
import "react-big-calendar/lib/css/react-big-calendar.css"
import "react-big-calendar/lib/addons/dragAndDrop/styles.css"

import "moment/locale/es"
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop"
import ReactModal from "react-modal"
import { scaleDown as Menu } from 'react-burger-menu'
ReactModal.setAppElement("#root")

const DnDCalendar = withDragAndDrop(Calendar)
//Calendar.setLocalizer(Calendar.momentLocalizer(moment)); Esto es igual a la línea de abajo, pero sin requerir llamarlo más abajo en el render
const localizer = Calendar.momentLocalizer(moment)

class Section extends Compo {
  state = {
    showModal: false,
    eventoSeleccionado:"", //Este state es importante para poder hacer updateOrden y addOrden desde modal
    proyectoSeleccionado: {
      title:"",
      clave:null,
      nombreempresa:"",
      direccion:"",
      start:"",
      end:"",
      preciototal:null,
    },
    ordenesDeEsteProyecto:[],
    elementoABuscarEnSearch: "",
    encontradoEnSearch:[],
    menuOpen: false,
    events: [
      // {
      //   id: 1,
      //   title: 'MS training',
      //   start: new Date(2018, 0, 29, 14, 0, 0),
      //   end: new Date(2018, 0, 29, 16, 30, 0),

      // },
      // {
      //   start: new Date(),
      //   end: new Date(moment().add(1, "days")),
      //   color: "",
      //   title: "Some title",
       
      //   //allDay: true     Para eventos de todo el día
      //   //desc: 'Big conference for important people'   Para agregar info adicional
      // },
     
    ]
  }


  

  componentDidMount = () => {
    console.log("Fecha de hoy",new Date().toISOString())
    const seleccionarColorRandom = "#" + Math.floor(Math.random() * 16777215).toString(16)
    console.log("color random", seleccionarColorRandom)
    API.getOrden()
      .then(res => this.setState({ events: this.state.events.concat(res.data) }) )
      .catch(err => console.log(err))
  }
  
  //------------------------->MODAL
  handleOpenModal = event => {
    console.log("event modal",event)
    this.setState({ showModal: true, eventoSeleccionado: event.clave.slice(0,3) },
      () => { this.buscarProyecto() })
  }

  handleCloseModal = () => {
    this.setState({ showModal: false, eventoSeleccionado:[]})
  }

  buscarProyecto = () => {
    API.getProyect()
    .then(res =>  this.buscarProyecto2(res.data))
    .catch(err => console.log(err))
  }

  buscarProyecto2 = (data) => {
    console.log("Todos los proyectos:",data)
    Array.prototype.findByValueOfObject = function(key, value) {
      return data.filter(function(item) {
        return (item[key] === value);
      })
    }
    console.log("Proyecto relacionado a esta orden:",Array.prototype.findByValueOfObject("clave", parseInt(this.state.eventoSeleccionado)))
    let result= Array.prototype.findByValueOfObject("clave", parseInt(this.state.eventoSeleccionado))
    this.setState({ proyectoSeleccionado:{ 
      clave: result[0].clave,
      nombreempresa: result[0].nombreempresa,
      direccion: result[0].direccion
      } 
      },()=>{
          let eventosDeEsteProyecto = this.state.events.filter(( elemento => parseInt(elemento.clave.slice(0,3)) == this.state.proyectoSeleccionado.clave  ))
          console.log("Eventos de este proyecto:",eventosDeEsteProyecto)
          this.setState({ ordenesDeEsteProyecto: eventosDeEsteProyecto })
        },
    )
  }

  //----------------------->BUSCADOR
  handleOnChangeBuscador = event => {
    const { value, name } = event.target
    this.setState({ [name]: value}, () =>
      API.getProyect()
        .then(res =>  this.filtrarBusquedaSearch(res.data))
        .catch(err => console.log(err))
    )
  }

  filtrarBusquedaSearch = (data) => {
   let proyectoEncontrado = data.filter((encontrado) => {
     return encontrado.nombreempresa.toLowerCase().indexOf( this.state.elementoABuscarEnSearch.toLowerCase() ) !==-1;
    })
    console.log("PROYECTO ENCONTRADO:", proyectoEncontrado)
    this.state.elementoABuscarEnSearch ? (
      this.setState({ encontradoEnSearch: proyectoEncontrado }) 
      ):( this.setState({ encontradoEnSearch:[] }) )
  }
  
  mostrarDetalleDelSeleccionadoEnSearch = (seleccionado) => {
    let proyectoFiltrado = this.state.encontradoEnSearch.filter( encontrado =>
      encontrado._id === seleccionado.id
    )
    console.log("Información proyecto de click:", proyectoFiltrado)
    this.setState({ showModal: true, 
      eventoSeleccionado: proyectoFiltrado[0].clave,
      proyectoSeleccionado:{ 
        clave: proyectoFiltrado[0].clave,
        nombreempresa: proyectoFiltrado[0].nombreempresa,
        direccion: proyectoFiltrado[0].direccion
        } 
      },()=>{
        let eventosDeEsteProyecto = this.state.events.filter(( elemento => parseInt(elemento.clave.slice(0,3)) == this.state.proyectoSeleccionado.clave  ))
          console.log("Eventos de este proyecto:",eventosDeEsteProyecto)
          this.setState({ ordenesDeEsteProyecto: eventosDeEsteProyecto })
        },
    )
  }



  //----------------------->PROPIEDADES DEL CALENDARIO QUE PODRÍAN IMPLEMENTARSE A FUTURO 
  //-----------------------(eventDrop, eventResize)

  //Para arrastrar y cambiar el start y end del evento
  // El "event" contiene todo el evento
  // onEventDrop = ({ event, start, end }) => {
  //   this.setState(state => {
  //     state.events[0].start = start
  //     state.events[0].end = end
  //     return { events: state.events }
  //   })
  //   console.log("ESTO onEventDrop", start, event)
  // }

  // //-->Para extender la fecha del evento arrastrando a los lados
  // onEventResize = ({ event, start, end }) => {
  //   this.setState(state => {
  //     state.events[0].start = start
  //     state.events[0].end = end
  //     return { events: state.events }
  //   })
  // }

  // //-->Para crear evento seleccionando la fecha en calendario
  // handleSelect = ({ start, end }) => {
  //   const title = window.prompt("Nuevo nombre de evento")
  //   if (title)
  //     this.setState(state => {
  //       state.events[0].start = start
  //       state.events[0].end = end
  //       state.events[0].title = title
  //       return { events: state.events } //En el state events, pondrás lo que aquí seteaste state.events
  //     })
  // }

  //----------------------->MENU LATERAL 
  showSettings (event) {
    event.preventDefault();

  }

  handleStateChange (state) {
    this.setState({menuOpen: state.isOpen})  
  }

  toggleMenu () {
    this.setState({menuOpen: !this.state.menuOpen})
  }


  render() {
  
   
    return (
  <div>
    <Nav>
      <ul>
        <li className="navegacion" onClick={() => this.toggleMenu()}>
          <span style={{color: '#03A9F4', fontSize: '23px'}}>
            <i className="fas fa-search"></i>
          </span>
          <a className="texto-navegacion">
            BUSCAR
          </a>
        </li>
        <li className="navegacion">
          <span style={{color: '#03A9F4', fontSize: '23px'}}>
            <i className="fas fa-edit"></i>
          </span>
          {this.props.engrane}{/* Aquí saldrá <Engrane/> de el component children */}
        </li>
        <li className="navegacion">
          <span style={{color: '#03A9F4', fontSize: '23px'}}>
            <i className="far fa-file-alt"></i>
          </span>
          {this.props.consulta}
        </li>
      </ul>
      {this.props.proyecto}
    </Nav>
    
    <div id="outer-container">
      <Menu 
        isOpen={this.state.menuOpen}
        onStateChange={(state) => this.handleStateChange(state)}  
        pageWrapId={ "page-wrap" }  
        outerContainerId={ "outer-container" } 
        customBurgerIcon={<img alt="" src="" />} 
      >
        {/* ----------->BUSCADOR */}
        <div className="menu-itema">
        <InformacionAMostrar 
          className="labelInputModal4"
          label="Ingresa un proyecto"
          name="elementoABuscarEnSearch"
          onChange={this.handleOnChangeBuscador}
        />
        <ul className="list-group list-group-flush">
          {this.state.encontradoEnSearch.length ? (
            <div>
              {this.state.encontradoEnSearch.map(
                encontrado => (
                  <ListadoAgrupado
                    key={encontrado._id}
                    id={encontrado._id}
                    nombre={encontrado.nombreempresa}
                    mostrarDetalle={
                      this.mostrarDetalleDelSeleccionadoEnSearch
                    }
                  />
                )
              )}
            </div>
          ) : this.state.elementoABuscarEnSearch ? (
            <p className="labelInputModal">...Buscando</p>
          ) : (
            <p className="labelInputModal">
              No hay infomación para mostrar
            </p>
          )}
        </ul>
        </div>
     
      </Menu>

        <div id="page-wrap"> {/* div forzoso para menu lateral */}
          <div className="contenedorcalendario">
            
            {/*------------------>CALENDARIO */}
            <DnDCalendar
              popup //Para extender cuando hay varios eventos en un mismo día
              selectable //Hace posible que se pueda seleccionar
              // onSelectSlot={this.handleSelect} // ÉSTAS TRES SON PROPIEDADES A IMPLEMENTARSE A FUTURO
              // onEventDrop={this.onEventDrop}
              // onEventResize={this.onEventResize}
              onSelectEvent={event=>this.handleOpenModal(event)} //Al hacer click sobre el evento, despliega info del evento
              localizer={localizer}
              defaultDate={new Date()}
              defaultView="month"
              events={this.state.events}
              style={{ height: "70vh" }} 
              eventPropGetter={event => ({style: { backgroundColor: event.color } })} //Añadir props a los events, ej. cambiar color
              views={["month"]}
              messages={{next:">",previous:"<",today:"Actual",showMore: total => `+ ${total} estudios más`}}
              culture={"es"}
            />

            {/*------------------>MODALES */}
            <ReactModal
              isOpen={this.state.showModal}
              contentLabel="onRequestClose Example"
              onRequestClose={this.handleCloseModal}
              shouldCloseOnOverlayClick={false}
              ariaHideApp={true}
              shouldFocusAfterRender={true}
            >
              <div className="row">
                <div className="col-md-8 modalsectionA">
                  <label className="tituloModal">Proyecto</label>
                  <form className="formdelinputcomotexto">
                    <InformacionAMostrarenProyecto
                      className="inputcomotexto"
                      label="CLAVE"
                      name="laClave"
                      texto={this.state.proyectoSeleccionado.clave}
                    />
                    <InformacionAMostrarenProyecto 
                      className="inputcomotexto"
                      label="EMPRESA"
                      name="laEmpresa"
                      texto={this.state.proyectoSeleccionado.nombreempresa}
                    />
                    <InformacionAMostrarenProyecto 
                      className="inputcomotexto"
                      label="DIRECCIÓN"
                      name="laDireccion"
                      texto={this.state.proyectoSeleccionado.direccion}
                    />
                  </form>
                </div>
              </div>
              {this.state.ordenesDeEsteProyecto ? (
                <div className="row">
                  {this.state.ordenesDeEsteProyecto.map(elementos => (
                    <div key={Math.floor(Math.random() * 10000 + 1)} className="col-sm-4">
                      <Card
                        key={elementos.id}
                        clave={elementos.clave}
                        tipodeestudio={elementos.tipodeestudio}
                        // src={"http://www.fundacionunam.org.mx/wp-content/uploads/2015/07/residuales_portada.jpg"}
                        rama={elementos.rama}
                        signatario={elementos.signatario}
                        equipo={elementos.equipo}
                        comentarios={elementos.comentarios}
                        status={elementos.status}
                        preciosubtotal={elementos.preciosubtotal}
                        start={(elementos.start).substring(0, 10)}
                        end={elementos.end.substring(0, 10)}
                      />
                      <div>
                        <Link to = {{
                          pathname: `/updateorden/${this.state.eventoSeleccionado}`,
                          state: { 
                            clave: elementos.clave,
                            rama: elementos.rama,
                            tipodeestudio: elementos.tipodeestudio,
                            signatarios:elementos.signatario,
                            start: elementos.start,
                            end: elementos.end,
                            preciosubtotal:elementos.preciosubtotal,
                            status: elementos.status,
                            comentarios:elementos.comentarios
                            }
                          }}
                        > 
                          Editar  
                        </Link>     
                      </div>
                    </div>
                  ))}
                </div>
              ) : (null) }
              <div className="row">
                <button className="cerrarModal" onClick={this.handleCloseModal} >
                  <span style={{color: '#03A9F4', fontSize: '23px'}}>
                    <i className="far fa-window-close"></i>
                  </span>
                </button>
                <div className="col-sm-4 botonesFooter">
                  <a href={`${window.location.origin}/addorder/${this.state.eventoSeleccionado}`} target="_blank" rel="noopener noreferrer" className="botonEnAncla2">Agregar orden</a>
                </div>
                
              </div>
            </ReactModal>
        </div>{/* ID page wrap */}

            
            
          </div> {/*classname contenedorcalendario*/}
    </div>{/* id outer container */}
  </div>
    )
  }
}

export default Section
