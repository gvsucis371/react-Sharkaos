//function buttons({ activeUnit }) {
//     function handleClick(type, unit) {

//    }
//    return (
//		<button id="delete" className = "square" onClick = {() => handleClick("delete", activeUnit)}> </button>
//		<button id="edit" className=  "square" onClick=  {() => handleClick("create",activeUnit)} >+</button>
//    )
//}
//activeUnit is the props data of the clicked Square component

import { useState, useEffect } from "react";


//Form'S SAVE  button calls handleEdit(), 
//     handleEdit calls check for changes and updateHandler 
//updateHandler propagates back to App.jsx to set changes to units


export default function Details({ activeUnit, deleteHandler, updateHandler }) {

    const [editData, setEditData] = useState(activeUnit)
//--FORM VALIDATION FUNCTION
    const checkForChanges = () => {    //checks if edited data and no fields empty
        if (!activeUnit) {
            return false
        }
        //prevent empty fields
        if (editData.name === "" || editData.element === "" || editData.class=== "") {
            return false
        }
        return (editData.name !== activeUnit.name || editData.element !== activeUnit.element || editData.class !== activeUnit.class || editData.bias !== activeUnit.bias || editData.sling !== activeUnit.sling || editData.no !== activeUnit.no )
    };



    //Saves changes in editData upon input so typed words appear in the box
    useEffect(() => {
        setEditData(activeUnit);
    }, [activeUnit]);

    //Save button click triggers this
    const handleEdit = (e) => {
        e.preventDefault(); //prevent rerender on default button trigger for form
       
        if (checkForChanges()) {
            console.log(editData)
            updateHandler(editData);
        }
        else {
            console.log("Nochanges detected")
        }
    }

    return (
        <>      
        <div className="w-full">
                <h4 className="m-4 text-xl">{editData?.id === "" ? "Create Unit" : "Edit Unit"}</h4>
                <hr className="border-t-4 border-gray-300 w-full  "></hr>
                <form className="flex flex-col items-center font-semibold bg-gray-400 p-2" onSubmit={handleEdit}>
                    <div className="m-2 flex flex-col items-center">
                        <label className="flex justify-end w-full"> Name:
                    <input
                        type="text"
                        value={editData?.name || ""}
                        onChange={(e) =>
                            setEditData({ ...editData, name: e.target.value })
                        }
                    />
                </label>
                        <label className="flex justify-end w-full"> No.
                    <input
                            type="text"
                            value={editData?.no || ""}
                            onChange={(e) =>
                                setEditData({ ...editData, no: e.target.value })
                            }
                        />
                    </label >
                        <label className="flex justify-end w-full"> Class:  
                    <input
                        type="text"
                        value={editData?.class || ""}
                        onChange={(e) =>
                            setEditData({ ...editData, class: e.target.value })
                        }
                    />
                </label>
                        <label className="flex justify-end w-full"> Element:
                    <input
                        type="text"
                        value={editData?.element || ""}
                        onChange={(e) =>
                            setEditData({ ...editData, element: e.target.value })
                        }
                    />
                </label>
                        <label className="flex justify-end w-full"> Sling:
                    <input
                            type="text"
                            value={editData?.sling || ""}
                            onChange={(e) =>
                                setEditData({ ...editData, sling: e.target.value })
                            }
                        />
                    </label>
                        <label className="flex justify-end w-full"> Bias:
                    <input
                            type="text"
                            value={editData?.bias || ""}
                            onChange={(e) =>
                                setEditData({ ...editData, bias: e.target.value })
                            }
                        />
                        </label>
                        </div>
                    <div className="m-2 pl-12 flex justify-center items-center space-x-2">
                    <button className="bg-white px-4 w-20 border-2 border-gray-600 rounded-xl" type="submit">SAVE</button>
                    <button className="bg-white px-2 w-20 border-2 border-gray-600 rounded-xl" onClick={() => deleteHandler(activeUnit.id)}>DELETE</button>
            </div> 
                        
               </form>
                <hr className="border-t-4 border-gray-500 w-full  "></hr>

                </div>
       </> 
    );


}

//SAVED COPY OF THE DETAILS BAR
//function buttons({ activeUnit }) {
//    static function handleClick(type, unit) {

//    }
//    return (
//		<button id="delete" className = "square" onClick = {() => handleClick("delete", activeUnit)}> </button>
//		<button id="edit" className=  "square" onClick=  {() => handleClick("create",activeUnit)} >+</button>
//    )
//}
////activeUnit is the props data of the clicked Square component
//export default function Details({ activeUnit }) {
//    return (
//        <>
//            <p>Name:{activeUnit?.name || ""}</p>
//            <p>Class:{activeUnit?.class || ""}</p>
//            <p>Element:{activeUnit?.element || ""}</p>
//        </>
//    );


//}