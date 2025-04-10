import { useState } from 'react';

export default function ElementSort({  filter, handleFilter }) {

    const [on, setOn] = useState({ filter }
    );
    const handleOn=()=>{
        console.log(on)
        handleFilter(on);
    }
    const toggle=(key) => {
        setOn((prev) => ({
            ...prev,
            [key]: !prev[key],
        }))
        console.log("set ",key," to ",on[key])
    }
    return (
        <div id="" className="self-end h-max grid-rows-2 bg-gradient-to-b from-slate-600/40  to-slate-400/ bg-slate-400 border-2 border-gray-700 rounded-md w-max p-2">
            <div className="row-start-1 ">
                <button id="to"className="p-1 text-blue-900 border-grey-500 border-2 bg-gray-300 rounded-md" >Toggle all</button>
                <button  className=" text-white   h-8 w-8 bg-red-500 border-red-400 border-2 rounded-md">X </button>
            </div>
            <div className="row">
                <button key="fire" className={`round ${on["fire"] ? "active" : ""}`} id="fire-button" onClick={() => toggle("fire")} >火</button>
                <button key="water" className={`round ${on["water"] ? "active" : ""}`} id="water-button" onClick={() => toggle("water")}>水</button>
                <button key="wood" className={`round ${on["wood"] ? "active" : ""}`} id="wood-button" onClick={() => toggle("wood")}>木</button>
                <button key="light" className={`round ${on["light"] ? "active" : ""}`} id="light-button" onClick={() => toggle("light")}>光</button>
                <button key="dark" className={`round ${on["dark"] ? "active" : ""}`} id="dark-button" onClick={() => toggle("dark")}>闇</button>
            </div>
            <div className="row">
                <button className="row-start-3 bg-green-300 border-2 font-semibold border-emerald-600 rounded-md  p-1" onClick={handleOn}>confirm</button>
                </div>
        </div>
        )




}