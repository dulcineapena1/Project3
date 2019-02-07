import React from "react"
import DayPickerInput from "react-day-picker/DayPickerInput"
import "react-day-picker/lib/style.css"
import API from "../../utils/API"
import APIuna from "../../utils/APIuna"
import { FormInline, Input, Label } from "../../components/signatarios"
import { withAlert } from "react-alert"
import { Link } from "react-router-dom"
import "./style.css"


class updateOrden extends React.PureComponent {
  state = {
    tipoEstOptions: [],
    signatOptions: [],
    title: "",
    clave: "",
    rama: "",
    tipodeestudio: "",
    signatarios: [],
    start: new Date(),
    end: new Date(),
    preciosubtotal: "",
    status: [],
    comentarios: "",
    unavailableEmployees: []
  }

  componentDidMount = () => {
    console.log("Datos a editar:",this.props.location.state)
    const {
      props: {
        match: {
          params: { id: proyecto }
        },
      },
      loadMethods,
      loadSignatarios
    } = this
    this.setState({ proyecto })
    loadMethods()
    loadSignatarios()
  }
  
  handleChange = event => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }
  loadMethods = () => {
    API.findMethods()
      .then(res =>
        this.setState({
          tipoEstOptions: res.data,
          clave: "",
          nombretipodeestudio: ""
        })
      )
      .catch(err => console.log(err))
  }
  loadSignatarios = () => {
    APIuna.getSignatarios().then(res =>
      this.setState({
        signatOptions: res.data,
        nombresignatario: "",
        clave: ""
      })
    )
  }
  onSelectSignatario = e => {
    const signatarioClicked = e.target.value
    const checked = e.target.checked
    const { signatarios } = this.state
    let newSignatrios
    if (checked) {
      // add them to the list
      newSignatrios = [...signatarios, signatarioClicked]
    } else {
      // remove them from the list
      const thisIndex = signatarios.indexOf(signatarioClicked)
      // if we didnt find it in the list there is something really wrong, and we shouldnt continue
      if (thisIndex === -1) {
        return console.error("did not find signatario when we should have")
      }
      newSignatrios = [
        ...signatarios.slice(0, thisIndex),
        ...signatarios.slice(thisIndex + 1)
      ]
    }
    this.setState({ signatarios: newSignatrios })
  }
  checkAvailability = async () => {
    const {
      state: { start, end }
    } = this

    const unavailableEmployees = await API.checkAvailability(start, end).then(
      r => r.data
    )
    this.setState({ unavailableEmployees })
  }
  handleFormSubmit = async event => {
    event.preventDefault()
    const {
      props: { alert }
    } = this

    const res = await API.saveOrden({
      title: this.state.tipodeestudio,
      proyecto: this.state.proyecto,
      clave: this.state.clave,
      rama: this.state.rama,
      tipodeestudio: this.state.tipodeestudio,
      signatario: this.state.signatarios,
      start: this.state.start,
      end: this.state.end,
      comentarios: this.state.comentarios,
      status: this.state.status,
      preciosubtotal: this.state.preciosubtotal
    }).catch(err => console.log(err))
    if (res.status === 200) {
      // we successfully added it
      alert.success("Estudio añadido exitosamente")
      console.log(res)
      this.setState({ success: true })
    } else {
      console.log()
      // show error information
      alert.error("Problem adding")
    }
  }

  render() {
    const {
      onSelectSignatario,
      checkAvailability,
      state: { unavailableEmployees }
    } = this
    return (
      <div className="container">
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1 className="display-4">Editar estudio</h1>
            <p className="lead">
              Añade los estudios del proyecto correspondiente
            </p>
          </div>
        </div>
        <form>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label>Id</label>
              <input
                onChange={this.handleChange}
                className="form-control"
                name="clave"
                placeholder="200-FF-19-1"
                defaultValue={this.props.location.state.clave || ""}
              />
            </div>
            <div className="form-group col-md-6">
              <label>Rama</label>
              <select
                onChange={this.handleChange}
                className="form-control"
                name="rama"
                defaultValue={this.props.location.state.rama || ""}
              >
                <option>Fuentes Fijas</option>
                <option>Aguas Residuales</option>
              </select>
            </div>
          </div>
          <div className="form-group col-md-12">
            <label>Tipo de Estudio</label>
            <select
              onChange={this.handleChange}
              className="form-control"
              name="tipodeestudio"
            >
              {this.state.tipoEstOptions.map(option => (
                <option key={option.clave} value={option.clave}>
                  {option.nombretipodeestudio}
                </option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <h5>Signatario</h5>
            <hr />
            {this.state.signatOptions.map(option => {
              const unavailable = unavailableEmployees.includes(option.clave)
              return (
                <FormInline key={option.clave}>
                  <Input
                    unavailable={unavailable}
                    onChange={onSelectSignatario}
                    value={option.clave}
                  />
                  <Label unavailable={unavailable}>
                    {option.nombresignatario}
                  </Label>
                </FormInline>
              )
            })}
          </div>

          <div>
            <p>Por favor escoge un día:</p>
            <DayPickerInput
              onDayChange={day => {
                const start = new Date(day)
                const end = new Date(day)
                end.setDate(start.getDate() + 1)
                this.setState({ start, end }, checkAvailability)
              }}
            />
          </div>
          <div className="form-group">
            <label>Precio</label>
            <input
              onChange={this.handleChange}
              className="form-control"
              name="preciosubtotal"
              placeholder="2500"
              defaultValue={this.props.location.state.preciosubtotal || ""}
            />
          </div>
          <h2>Status</h2>

          <div className="form-check form-check-inline">
            <input
              onChange={this.handleChange}
              className="form-check-input"
              type="checkbox"
              name="status"
              value="Progress"
            />
            <label className="form-check-label">En progreso</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              onChange={this.handleChange}
              className="form-check-input"
              type="checkbox"
              name="status"
              value="AntPayment"
            />
            <label className="form-check-label">Pago en anticipo</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              onChange={this.handleChange}
              className="form-check-input"
              type="checkbox"
              name="status"
              value="FieldDone"
            />
            <label className="form-check-label">Ya fueron a campo</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              onChange={this.handleChange}
              className="form-check-input"
              type="checkbox"
              name="status"
              value="Concluded"
            />
            <label className="form-check-label">Concluido</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              onChange={this.handleChange}
              className="form-check-input"
              type="checkbox"
              name="status"
              value="Payed"
            />
            <label className="form-check-label">Pagado</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              onChange={this.handleChange}
              className="form-check-input"
              type="checkbox"
              name="status"
              value="Cancelled"
            />
            <label className="form-check-label">
              <div className="badge badge-danger text-wrap">Cancelado</div>
            </label>
          </div>

          <div className="form-group">
            <label>Comentarios</label>
            <textarea
              onChange={this.handleChange}
              className="form-control"
              name="comentarios"
              placeholder="Comentarios"
              rows="3"
            />
          </div>
          <button
            onClick={this.handleFormSubmit}
            type="submit"
            className="btn btn-primary"
          >
            Crear Nuevo Estudio
          </button>
          <Link to="/">
            <button className="btn btn-danger">Salir</button>
          </Link>
        </form>
      </div>
    )
  }
}

export default withAlert(updateOrden)
