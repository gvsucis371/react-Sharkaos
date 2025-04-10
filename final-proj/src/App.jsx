//import logo from './logo.svg';
//import './App.css';
import './index.css'
import ElementSort from './components/elementSort'
import UnitBox from './components/unitBox'
import DetailsBar from './components/detailsbar'
import React, { useState, useEffect } from "react";
import Sidebar from './components/newBar';
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
    //const unitHC = [
    //    {
    //        "id": 0,
    //        "name": "Masamune",
    //        "no": 4032,
    //        "element": "Fire",
    //        "class": "Demihume",
    //        "bias": "Blast"
    //    },
    //    {
    //        "id": 1,
    //        "name": "Masamune2",
    //        "no": 4033,
    //        "element": "Fire",
    //        "class": "Demihume",
    //        "bias": "Speed"
    //    },

    //];

    const unitHC = []
  
    const [units, setUnits] = useState([]);
    const [activeSquare, setActiveSquare] = useState(null);
    const [filteredUnits, setFilteredUnits] = useState(units)

    useEffect(() => {
        console.log(units)
        if (units.length === 0) {
            fetch('http://localhost:3001/units', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch from db');
                    }
                    return response.json();
                })
                .then(data => setUnits(data))
                .catch(error => console.error("Fetch error:", error));
        }
    }, [units]);  // Empty dependency array ensures it only runs on mount


    const deleteHandler = async (id) => {//perform callback function on each item
        //attempt delete from database
        try {
            //Attempt to call the delete in express which will ask the DB to delete
            const response = await fetch(`http://localhost:3001/delete/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Failed to delete from db");
            }

            //---------REACT CODE SECTION
            const newList = units.filter(item => {  //filter method
                return item.id !== id
            })

            ///THIS MAKES IT SO THE FILTERED UPDATES TOO
            setUnits(newList);
            const newList2 = filteredUnits.filter(item => {  //filter method
                return item.id !== id
            })
            setFilteredUnits(newList2);
            //----------REACT CODE END

        } catch (error) {
            console.error("Error deleting unit");
        }
    };

    //This section will be scrapped when the units are pulled from the database
    const addUnit = async (newUnit) => {
        var updatedUnitList = []
        try {
            const response = await fetch(`http://localhost:3001/new`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }, body: JSON.stringify(newUnit)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch from db');
                    }
                    return response.json();
                })
                .then(data => {
                    updatedUnitList = [data, ...units]
                    setUnits(updatedUnitList); // Update main unit list
                    setActiveSquare(data)
                })
        } catch (error) {
            console.log(error)
        }


    }


    async function updateHandler(updatedUnit) {
        var updatedUnitList = []

        if (updatedUnit.id === "" || updatedUnit.id === undefined) {
            try {
                const response = await fetch(`http://localhost:3001/new`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }, body: JSON.stringify(updatedUnit)
                });
                if (!response.ok) {
                    throw new Error('Failed create');
                }

                updatedUnitList = [updatedUnit, ...units]
                setUnits(updatedUnitList); // Update main unit list
                setActiveSquare(updatedUnit)
            } catch (error) {
                console.log(error)
            }

            //addUnit(updatedUnit)
        } else {
            //-----------FIX THIS SO IT CAN BE A FUNCTION

            try {
                const response = await fetch(`http://localhost:3001/update/:${updatedUnit.id}`, {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(updatedUnit)
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch from db');
                }

                //const updatedData = await response.json(); //

                // Update unit list
                updatedUnitList = units.map((unit) =>
                    unit.id === updatedUnit.id ? updatedUnit : unit
                );

                // Update state
                setUnits(updatedUnitList);
                setActiveSquare(updatedUnit);
            } catch (error) {
                console.error("Fetch error:", error);
            }
        }
    }




    //this could probably be elsewhere
    const [filter, setFilter] = useState([{fire: false,
        water: false,
        wood: false,
        dark: false,
        light: false,
    }])
    async function filterHandler(filter) {


        const filteredUnitList = units.filter((unit) => {
            return filter[unit.element] === true;
        });
        setFilteredUnits(filteredUnitList)
    }// <div id="sidebar" className="col-start-2 lg:col-span-2 lg:row-span-3" >
    //    <Sidebar />
    //</div>
        return (
            <>
                
                    
                    <div className="grid h-screen lg:grid-cols-[1fr_1fr_3fr_1fr] gap-2 lg:grid-rows-[auto_auto]  h-full grid-rows-[auto_auto_auto]">
                       <div className="h-0 overflow-hidden lg:h-screen lg:col-start-1 lg:col-span-2 bg-slate-500 lg:row-span-2 w-max px-10 border-2 border-slate-800"><Sidebar/></div>
                        <div className="lg:col-start-3 row-start-1 justify-self-center grid grid-cols-[auto_1fr] w-max">
                            <Add className="col-start-1 " setActiveUnit={setActiveSquare} />
                            <ElementSort className="col-start-2" handleFilter={filterHandler}filter={filter} />
                           
                        </div>

                        <div className="lg:row-start-2  row-start-3 lg:col-start-3 lg:col-span-1 align-self-end justify-items-center bg-gradient-to-b from-blue-200/20  via-gray-400/20 to-gray-400/30 bg-slate-200 border-2 p-2 border-gray-700">
                            <UnitBox unitHC={filteredUnits.length === 0 ? units : filteredUnits} selectUnit={setActiveSquare} />  
                            </div>
                        
                        <div className="lg:col-start-4 row-start-2 bg-gray-200 ">
                          
                                <DetailsBar activeUnit={activeSquare} deleteHandler={deleteHandler} updateHandler={updateHandler} />
                               
                           </div>
                    </div>
            </>)
    }


