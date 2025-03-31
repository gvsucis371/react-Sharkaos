//import logo from './logo.svg';
//import './App.css';
import './index.css'
import ElementSort from './components/elementSort'
import UnitBox from './components/unitBox'
import Details from './components/detailsbar'
import React, { useState } from "react";
import Todos from './components/buttons';
//import SQLite from 'react-native-sqlite-storage';


function toggleButtonState(elementId) {
    const button = document.getElementById(elementId);
    const hiddenInput = document.getElementById(`${elementId}ButtonState`);
    const currentState = hiddenInput.value === "true";
    const newState = !currentState;

    hiddenInput.value = newState.toString();

    if (newState) {
        button.classList.add("active");
    } else {
        button.classList.remove("active");
    }
};
function New() {
    return (
    
            <button className="square">+</button>
     );
}








export default function Mainbox() {
    //Mainbox manages the useState of a <Square/> which is passed
    //the setter is passed props to unitBox then to Square. 
    //<Details/> loads the object stored in its {activeSquare} props
    const unitHC = [
        {
            "id": 0,
            "name": "Masamune",
            "no": 4032,
            "element": "Fire",
            "class": "Demihume",
            "bias": "Blast"
        },
        {
            "id": 1,
            "name": "Masamune2",
            "no": 4033,
            "element": "Fire",
            "class": "Demihume",
            "bias": "Speed"
        },

    ];
    const [units, setUnits] = useState(unitHC);
    const [activeSquare, setActiveSquare] = useState(null);
    const deleteHandler = id => {//perform callback function on each item
        const newList = unitHC.filter(item => {//filter method
            return item.id !== id
        })

        setUnits(newList);
    }
        //MainBox
        //  new
        //  elementsort
        //  UnitBox
        //      Square
        //  Details
        return (

            <div id="mainbox" className="" >
                <div className="col">
                    <div className="row">
                        <New />
                        <ElementSort />
                    </div>
                    <div className="col">
                        <UnitBox unitHC={units} selectUnit={setActiveSquare} />

                    </div>
                </div>
                <div className="col">
                    <Details activeUnit={activeSquare} deleteHandler={deleteHandler}/>
                    <Todos />


                </div>
            </div>)
    }

