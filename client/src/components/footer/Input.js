import React from "react";

export const Input = props => {
  return (
    
     
        <div className="form-group">
            <label>{props.label}</label>
            <input {...props} className="form-control" id="exampleFormControlInput1"/>
        </div>
       

  );
}
