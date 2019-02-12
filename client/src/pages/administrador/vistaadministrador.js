import React, { Component } from "react"
import Section from "../../components/section"
import Engrane from "../../components/footer/engrane"
import { Link } from "react-router-dom"
import "./administradorCSS.css"
import "./style.css"


class VistaAdministrador extends Component {
  render() {
    return (
      <div className="contenedor">  
        <Section
          engrane={<Engrane/>}
          consulta={<a href={`/ordenes/consulta`} target="_blank" rel="noopener noreferrer" className="texto-navegacion">ORDENES DEL MES</a>}
          proyecto={
            <Link to="/addproyect">
              <button className="saveButton5">
                +  Proyecto
              </button>
            </Link> 
          }
        >
        </Section>
      </div>
    )
  }
}

export default VistaAdministrador
