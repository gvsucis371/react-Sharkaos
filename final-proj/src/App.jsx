//import logo from './logo.svg';
//import './App.css';
import './index.css'
import ElementSort from './components/elementSort'
import UnitBox from './components/unitBox'
import DetailsBar from './components/detailsbar'
import React, { useState } from "react";

import Add from './components/addButton';
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
        const newList = units.filter(item => {//filter method
            return item.id !== id
        })

        setUnits(newList);
    }
    const updateHandler = (updatedUnit) => {
        var updatedUnitList = []
        //This section will be scrapped when the units are pulled from the database
        if (updatedUnit.id==="") {
            updatedUnit.id =units.length
            updatedUnitList=[updatedUnit,...units]
        } else {
             updatedUnitList = units.map((unit) =>
                unit.id === updatedUnit.id ? updatedUnit : unit //map new array
            );
        }
        setUnits(updatedUnitList); // Update main unit list
        setActiveSquare(updatedUnit); // Update active unit
    };
        //MainBox
        //  new
        //  elementsort (currently vaporware)
        //  UnitBox
        //      Square
        //  Details
        return (

            <div id="mainbox" className="row" >
                <div className="col">
                    <div className="row">
                        <ElementSort />
                        <Add setActiveUnit={setActiveSquare} />

                    </div>
                     <UnitBox unitHC={units} selectUnit={setActiveSquare} />  
                </div>
                <div className="col">
                    <DetailsBar activeUnit={activeSquare} deleteHandler={deleteHandler} updateHandler={updateHandler}/>
                </div>
            </div>)
    }

