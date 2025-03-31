import { useState } from 'react';

export default function Square({ setUnit, unit }) {
    const [value, setValue] = useState(null);
    //Sets the clicked unit
    function handleClick() {
        setUnit(unit)
        console.log(unit)

    }
    return <button className="square" onClick={handleClick}>{unit?.name || ""}</button>; //Prints unit name on button if not null
};