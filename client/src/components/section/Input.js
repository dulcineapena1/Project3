import React from "react";

export const InformacionAMostrar = props => {
  return (
        <div className="form-group">
            <label {...props} >{props.label}</label>
            <input {...props} className={props.classinput} id="exampleFormControlInput1"/>
        </div>
  );
}


