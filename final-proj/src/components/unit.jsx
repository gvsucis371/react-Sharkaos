import { useState } from 'react';

export default function Square({ setUnit, unit }) {
    const [value, setValue] = useState(null);
    //Sets the clicked unit into details bar
    function handleClick() {
        setUnit(unit)

    }
    return <button className="border-slate-400 border-2 focus:ring-4 focus:ring-cyan-300 border-black break-words align-top aspect-[1/1] min-w-[15%] min-h-[15%] mt-3 mr-3 text-[0.6em] rounded-[10px] bg-sky-100" onClick={handleClick}>{unit?.name || ""}</button>; //Prints unit name on button if not null
};

//return <button className="focus:ring-4 focus:ring-cyan-300 border-black break-words align-top aspect-[1/1] w-[65px] min-h-[65px] mt-1 mr-1 text-[0.6em] rounded-[10px] bg-sky-100" onClick={handleClick}>{unit?.name || ""}</button>; //Prints unit name on button if not null
