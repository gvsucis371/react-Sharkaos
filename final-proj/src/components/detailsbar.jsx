//function buttons({ activeUnit }) {
//     function handleClick(type, unit) {

//    }
//    return (
//		<button id="delete" className = "square" onClick = {() => handleClick("delete", activeUnit)}> </button>
//		<button id="edit" className=  "square" onClick=  {() => handleClick("create",activeUnit)} >+</button>
//    )
//}
//activeUnit is the props data of the clicked Square component
export default function Details({ activeUnit, deleteHandler }) {
    return (
    <>
            <p>Name:{activeUnit?.name || ""}</p>
            <p>Class:{activeUnit?.class|| ""}</p>
            <p>Element:{activeUnit?.element || ""}</p>
            <button onClick={()=>deleteHandler(activeUnit.id)}>DELETE</button>
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