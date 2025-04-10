import { useState } from 'react';
import Square from './unit';

//    <div className="row">
//        <Square setUnit={selectUnit} unit={unitHC[0]} /> {/**/}
//        <Square setUnit={selectUnit} unit={unitHC[1]} />
//        <Square setUnit={selectUnit} unit={/>
//            < Square setUnit={selectUnit} />
//        <Square setUnit={selectUnit} />

//    </div>
//    <div className="row">
//        <Square setUnit={selectUnit} />
//        <Square setUnit={selectUnit} />
//        <Square setUnit={selectUnit} />
//        <Square setUnit={selectUnit} />
//        <Square setUnit={selectUnit} />
//    </div>
//    <div className="row">
//        <Square setUnit={selectUnit} />
//        <Square setUnit={selectUnit} />
//        <Square setUnit={selectUnit} />
//        <Square setUnit={selectUnit} />
//        <Square setUnit={selectUnit} />
//    </div>
//    <div className="row">
//        <Square setUnit={selectUnit} />
//        <Square setUnit={selectUnit} />
//        <Square setUnit={selectUnit} />
//        <Square setUnit={selectUnit} />
//        <Square setUnit={selectUnit} />
//    </div>
//    <div className="row">
//        <Square setUnit={selectUnit} />
//        <Square setUnit={selectUnit} />
//        <Square setUnit={selectUnit} />
//        <Square setUnit={selectUnit} />
//        <Square setUnit={selectUnit} />

//    </div>

//</>


export default function UnitBox({ unitHC, selectUnit }) {
    const mappedUnits = [];
    for (let i = 0; i < unitHC.length; i += 5) {
        mappedUnits.push(unitHC.slice(i, i + 5));
    }

    return (
        <>

            <p className="text-lg p-1 text-slate-500">- Table Name</p>
            <hr className="border-b-4 border-gray-300 w-full  "></hr>

            <div className="bg-slate-100 lg:pl-[15%] md:pl-[10%] pl-[5%] self-center w-full lg:min-h-[500px] lg:max-h-[500px] min-h-[350px] self-end overflow-y-scroll p-2">
            {mappedUnits.map((row, rowIndex) => {
                return (
                    <div className=" flex flex-col self-center items-center">
                    <div key={rowIndex} className="flex  justify-start w-full">
                        {row.map((unit) => (
                            <Square key={unit.id} setUnit={selectUnit} unit={unit} />
                        ))}
                        </div>
                    </div>
                );
                
            })}</div>
        </>
    );
}
