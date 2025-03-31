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
            {mappedUnits.map((row, rowIndex) => {
                return (
                    <div key={rowIndex} className="row">
                        {row.map((unit) => (
                            <Square key={unit.id} setUnit={selectUnit} unit={unit} />
                        ))}
                    </div>
                );
            })}
        </>
    );
}
