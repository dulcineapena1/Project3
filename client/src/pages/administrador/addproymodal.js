import React, { Component } from "react"
import { Redirect } from "react-router-dom"
import Helmet from "react-helmet"
import DayPicker, { DateUtils } from "react-day-picker"
import "react-day-picker/lib/style.css"
import API from "../../utils/API"
import { withAlert } from "react-alert"
import { Link } from "react-router-dom"
import "./style.css"

class Addproyect extends Component {
  static defaultProps = {
    numberOfMonths: 2
  }
  state = {
    success: false,
    title: "",
    clave: "",
    nombreempresa: "",
    direccion: "",
    start: "",
    end: "",
    preciototal: "",
    cantidad: ""
  }
  handleChange = event => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }
  handleFormSubmit = async event => {
    event.preventDefault()
    const {
      props: { alert }
    } = this

    const res = await API.saveProyect({
      title: this.state.nombreempresa,
      clave: this.state.clave,
      nombreempresa: this.state.nombreempresa,
      direccion: this.state.direccion,
      start: this.state.from.toLocaleDateString(),
      end: this.state.to.toLocaleDateString(),
      preciototal: this.state.preciototal,
      cantidad: this.state.cantidad
    })
    if (res.status === 200) {
      // we successfully added it
      alert.success("Proyecto añadido exitosamente")
      console.log(res)
      this.setState({ success: true })
    } else {
      console.log()
      // show error information
      alert.error("Problem adding")
    }
  }

  constructor(props) {
    super(props)
    this.handleDayClick = this.handleDayClick.bind(this)
    this.handleResetClick = this.handleResetClick.bind(this)
    this.state = this.getInitialState()
  }
  getInitialState() {
    return {
      from: undefined,
      to: undefined
    }
  }
  handleDayClick(day) {
    const range = DateUtils.addDayToRange(day, this.state)
    this.setState(range)
  }
  handleResetClick() {
    this.setState(this.getInitialState())
  }

  render() {
    const { from, to, success, clave } = this.state
    const modifiers = { start: from, end: to }
    return (
      <div className="container">
        {success && <Redirect to={`/addorder/${clave}`} />}
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1 className="display-4">Añadir Proyecto</h1>
            <p className="lead">
              Añade un proyecto nuevo y después sus estudios correspondientes
            </p>
          </div>
        </div>
        <form>
          <div className="form-row">
            <div className="form-group col-md-4">
              <label>Numero de proyecto</label>
              <input
                onChange={this.handleChange}
                className="form-control"
                name="clave"
                placeholder="750"
              />
            </div>
            <div className="form-group col-md-4">
              <label>Razon Social</label>
              <input
                onChange={this.handleChange}
                className="form-control"
                name="nombreempresa"
                placeholder="Aimex, Ingenieria y Construcción, S.A DE C.V"
              />
            </div>
            <div className="form-group col-md-4">
              <label>Direccion</label>
              <input
                onChange={this.handleChange}
                className="form-control"
                name="direccion"
                placeholder="Calle, Col, C.P"
              />
            </div>
          </div>
          <div className="RangeExample">
            <p>
              {!from && !to && "Por favor selecciona el primer día."}
              {from && !to && "Por favor selecciona el ultimo día."}
              {from &&
                to &&
                `Seleccionado del ${from.toLocaleDateString()} al
                ${to.toLocaleDateString()}`}{" "}
              {from && to && (
                <button
                  className="link btn btn-outline-danger"
                  onClick={this.handleResetClick}
                >
                  Borrar
                </button>
              )}
            </p>
            <DayPicker
              className="Selectable"
              numberOfMonths={this.props.numberOfMonths}
              selectedDays={[from, { from, to }]}
              modifiers={modifiers}
              onDayClick={this.handleDayClick}
            />
            <Helmet>
              <style>{`
  .Selectable .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
    background-color: #f0f8ff !important;
    color: #4a90e2;
  }
  .Selectable .DayPicker-Day {
    border-radius: 0 !important;
  }
  .Selectable .DayPicker-Day--start {
    border-top-left-radius: 50% !important;
    border-bottom-left-radius: 50% !important;
  }
  .Selectable .DayPicker-Day--end {
    border-top-right-radius: 50% !important;
    border-bottom-right-radius: 50% !important;
  }
`}</style>
            </Helmet>
          </div>

          <div className="form-row">
            <div className="form-group col-md-4">
              <label>Precio</label>
              <input
                onChange={this.handleChange}
                className="form-control"
                name="preciototal"
                placeholder="2000"
              />
            </div>
            <div className="form-group col-md-4">
              <label>Cantidad de estudios</label>
              <input
                onChange={this.handleChange}
                className="form-control"
                name="cantidad"
                placeholder="3"
              />
            </div>
          </div>

          <button
            onClick={this.handleFormSubmit}
            type="submit"
            className="btn btn-primary"
          >
            Dar de alta proyecto
          </button>
          <Link to="/">
            <button className="btn btn-danger">Salir a calendario</button>
          </Link>
        </form>
      </div>
    )
  }
}
export default withAlert(Addproyect)
