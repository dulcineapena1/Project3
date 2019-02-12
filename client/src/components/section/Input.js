import React from "react";

export const InformacionAMostrar = props => {
  return (
        <div className="form-group">
            <label className="labelInputModal">{props.label}</label>
            <input {...props}  id="exampleFormControlInput1"/>
        </div>
  );
}

export const InformacionAMostrarenProyecto = props => {
  return (
        <div className="form-group">
            <label className="labelInputModal">{props.label}</label>
            <p {...props}  id="exampleFormControlInput1">
              {props.texto}
            </p>
        </div>
  );
}

