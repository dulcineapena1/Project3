import React from "react";

export const Input = props => {
  return (
        <div className="form-group">
            <label className={props.className}>{props.label}</label>
            <input {...props} className={props.classnameinputmodal} id="exampleFormControlInput1"/>
            
        </div>
  );
}




export const InputEditable = props => {
  return (
        <div className="form-group">
            <label className={props.className}>{props.label}</label>
            <input {...props} className={props.classnameinputmodal} id="exampleFormControlInput1"/>

        </div>
  );
}
