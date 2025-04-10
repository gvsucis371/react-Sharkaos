import { useState } from 'react'
import UnitBox from './unitBox2'
import ElementSort from './elementSort'

export default function Sidebar(){
    const unitList = [
        {
            id: 0,
            name: "item1",
            no: 0,
            class: "default",
            sling: "sling",
            bias: "bias",
            element:"el"
        },
        {
            id: 1,
            name: "item2",
            no: 1,
            class: "default",
            sling: "sling",
            bias: "bias",
            element: "el"
        },
        {
            id: 2,
            name: "item2",
            no: 1,
            class: "default",
            sling: "sling",
            bias: "bias",
            element: "el"
        },
        {
            id: 3,
            name: "item2",
            no: 1,
            class: "default",
            sling: "sling",
            bias: "bias",
            element: "el"
        },
        {
            id: 4,
            name: "item2",
            no: 1,
            class: "default",
            sling: "sling",
            bias: "bias",
            element: "el"
        },
        {
            id: 5,
            name: "item2",
            no: 1,
            class: "default",
            sling: "sling",
            bias: "bias",
            element: "el"
        }
    ]

    const [isOpen, setIsOpen] = useState(true);
    return (
        <>
            
                <ElementSort/>
                <UnitBox unitHC={unitList} />
           

          


        </>





    );


}