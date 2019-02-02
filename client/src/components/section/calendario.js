import React, { Component as Compo } from "react"
import "./calendario.css"
import API from "../../utils/API"
//import APIuna from "../../utils/APIuna";
import { InformacionAMostrar } from "./Input"
import { Card } from "./card"


import Calendar from "react-big-calendar"
import moment from "moment"
import "react-big-calendar/lib/css/react-big-calendar.css"
import "react-big-calendar/lib/addons/dragAndDrop/styles.css"
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop"
import ReactModal from "react-modal"
ReactModal.setAppElement("#root")

const DnDCalendar = withDragAndDrop(Calendar)
//Calendar.setLocalizer(Calendar.momentLocalizer(moment)); Esto es igual a la línea de abajo, pero sin requerir llamarlo más abajo en el render
const localizer = Calendar.momentLocalizer(moment)

class Section extends Compo {
  state = {
    showModal: false,
    eventoSeleccionado:"",
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
    events: [
      // {
      //   start: new Date(),
      //   end: new Date(moment().add(1, "days")),
      //   color: "",
      //   title: "Some title",
       
      //   //allDay: true     Para eventos de todo el día
      //   //desc: 'Big conference for important people'   Para agregar info adicional
      // },
     
      // {
      //   title: "has time",
      //   start: moment(new Date(2016, 11, 3))
      //     .add(5, "days")
      //     .subtract(5, "hours")
      //     .toDate(),
      //   end: moment(new Date(2016, 11, 3))
      //     .add(1, "days")
      //     .subtract(4, "hours")
      //     .toDate()
      // }
    ]
  }


  

  componentDidMount = () => {
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





  //----------------------->PROPIEDADES DEL CALENDARIO
  //Para arrastrar y cambiar el start y end del evento
  // El "event" contiene todo el evento
  onEventDrop = ({ event, start, end }) => {
    this.setState(state => {
      state.events[0].start = start
      state.events[0].end = end
      return { events: state.events }
    })
    console.log("ESTO onEventDrop", start, event)
  }

  //-->Para extender la fecha del evento arrastrando a los lados
  onEventResize = ({ event, start, end }) => {
    this.setState(state => {
      state.events[0].start = start
      state.events[0].end = end
      return { events: state.events }
    })
  }

  //-->Para crear evento seleccionando la fecha en calendario
  handleSelect = ({ start, end }) => {
    const title = window.prompt("Nuevo nombre de evento")
    if (title)
      this.setState(state => {
        state.events[0].start = start
        state.events[0].end = end
        state.events[0].title = title
        return { events: state.events } //En el state events, pondrás lo que aquí seteaste state.events
      })
    //console.log(event)
  }

  




  render() {
    // const culture="es"
    // let formats = {
    //   dateFormat: 'dd',

    //   dayFormat: (date,  localizer,culture) =>
    //     localizer.format(date, 'DDD', culture={culture:'es'}),

    //   dayRangeHeaderFormat: ({ start, end }, culture, localizer) =>
    //     localizer.format(start, { date: 'short' }, culture) + ' — ' +
    //     localizer.format(end, { date: 'short' }, culture)
    // }

    
    return (
      <div className="contenedorcalendario">
        <DnDCalendar
          popup //Para extender cuando hay varios eventos en un mismo día
          selectable //Hace posible que se pueda seleccionar
          onSelectSlot={this.handleSelect}
          onSelectEvent={event=>this.handleOpenModal(event)} //Al hacer click sobre el evento, despliega info del evento
          // onSelectEvent={event => alert(event.clave + event.tipodeestudio)} 
          onEventDrop={this.onEventDrop}
          onEventResize={this.onEventResize}
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={this.state.events}
          style={{ height: "70vh" }} //Sin esta línea no se muestra el calendario
          eventPropGetter={event => ({style: { backgroundColor: event.color } })} //Añadir props a los events, ej. cambiar color
          //  formats={formats}//Formato de fecha e idioma
          //   culture="es"
          views={["month"]}
         
        />
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
              <form>
                  <div className="form-group">
                    <label className="tituloModal">Proyecto</label>
                  </div>
                  <InformacionAMostrar 
                    className="labelInputModal"
                    label="CLAVE"
                    name="laClave"
                    defaultValue={this.state.proyectoSeleccionado.clave}
                  />
                  <InformacionAMostrar 
                    className="labelInputModal"
                    label="EMPRESA"
                    name="laEmpresa"
                    defaultValue={this.state.proyectoSeleccionado.nombreempresa}
                  />
                  <InformacionAMostrar 
                    className="labelInputModal"
                    label="DIRECCIÓN"
                    name="laDireccion"
                    defaultValue={this.state.proyectoSeleccionado.direccion}
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
                  src={"http://www.fundacionunam.org.mx/wp-content/uploads/2015/07/residuales_portada.jpg"}
                  rama={elementos.rama}
                  signatario={elementos.signatario}
                  equipo={elementos.equipo}
                  comentarios={elementos.comentarios}
                  status={elementos.status}
                  preciosubtotal={elementos.preciosubtotal}
                  start={(elementos.start).substring(0, 10)}
                  end={elementos.end.substring(0, 10)}
                />
                </div>
              ))}
            </div>
          ) : (null) }
          <div className="row">
            <div className="col-sm-4 botonesFooter">
              <a href={`${window.location.origin}/addorder/${this.state.eventoSeleccionado}`} target="_blank" className="botonEnAncla">Agregar orden</a>
              <button
                className="cerrarModal"
                onClick={this.handleCloseModal}
              >
                Cerrar
              </button>
            </div>
          </div>
        </ReactModal>

      </div>
    )
  }
}

export default Section
