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

export default function Details({ activeUnit, deleteHandler, updateHandler }) {

    const [editData, setEditData] = useState(activeUnit)//
    //checks if edited data and no fields empty
    const checkForChanges = () => {
        if (!activeUnit) {
            return false
        }
        //prevent empty fields
        if (editData.name === "" || editData.element === "" || editData.class=== "") {
            return false
        }
        return (editData.name !== activeUnit.name || editData.element !== activeUnit.element || editData.class !== activeUnit.class)
    };
    //Saves changes in editData upon input
    useEffect(() => {
        setEditData(activeUnit);
    }, [activeUnit]);

    const handleEdit = (e) => {
        e.preventDefault(); //prevent rerender
       
        if (checkForChanges()) {
            updateHandler(editData);
        }
        else {
            console.log("Nochanges detected")
        }
    }

    return (
        <>      
            <div>
            <h4>{editData?.id===""? "Create Unit" :"Edit Unit"}</h4>
            <form onSubmit={handleEdit}>
                <label> Name:
                    <input
                        type="text"
                        value={editData?.name || ""}
                        onChange={(e) =>
                            setEditData({ ...editData, name: e.target.value })
                        }
                    />
                </label>
                <br />
                <label> Class:  
                    <input
                        type="text"
                        value={editData?.class || ""}
                        onChange={(e) =>
                            setEditData({ ...editData, class: e.target.value })
                        }
                    />
                </label>
                <br />
                <label> Element:
                    <input
                        type="text"
                        value={editData?.element || ""}
                        onChange={(e) =>
                            setEditData({ ...editData, element: e.target.value })
                        }
                    />
                </label>
                <br />
                <button type="submit">SAVE</button>
            </form>
                <button onClick={() => deleteHandler(activeUnit.id)}>DELETE</button>
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