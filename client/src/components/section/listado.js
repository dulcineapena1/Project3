import React from "react";

export const ListadoAgrupado = (props) => {
    return (
      <div>    
            <li onClick={()=>props.mostrarDetalle({...props})} className={props.lidesplieguelistadoagrupado}>{props.nombre}</li>
      </div>
    );
}

