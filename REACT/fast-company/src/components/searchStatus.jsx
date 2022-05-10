import React from "react";
import "bootstrap/dist/css/bootstrap.css"

const SearchStatus = ({ number }) => {         
    const spanClass = () =>{
        const bg_name = number === 0 ? "danger" : "primary";
        return `badge bg-${bg_name} fs-5`;
    }
    const sklon = (number, txt) => {
        const cases = [2, 0, 1, 1, 1, 2];
        return txt[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
    }

    return (
        <span className={spanClass()}>
            {number === 0 ? "Никто с тобой не тусанёт" : `${number} челове${sklon(number, ["к", "ка", "к"])} тусуется с тобой сегодня`}
        </span> 
    );
}

export default SearchStatus;