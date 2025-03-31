import { useState } from 'react';

export default function Square({ setUnit, unit }) {
    const [value, setValue] = useState(null);
    //Sets the clicked unit into details bar
    function handleClick() {
        setUnit(unit)

    }
    return <button className="square" onClick={handleClick}>{unit?.name || ""}</button>; //Prints unit name on button if not null
};