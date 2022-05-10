import React from "react";
import "bootstrap/dist/css/bootstrap.css";

const Quality = ({ color, name, _id }) => {
    const class_name = `badge bg-${color} m-1`;
     return (
                <span 
                    className={class_name}>
                    {name}
                </span>    
            );
}

export default Quality;