import { useState } from 'react';
import Square from './unit';


export default function UnitBox({ unitHC, selectUnit }) {
    return (
        <>

            <div className="row">
                <Square setUnit={selectUnit} unit={unitHC[0]} /> {/**/}
                <Square setUnit={selectUnit} unit={unitHC[1]}/>
                <Square setUnit={selectUnit}/>
                <Square setUnit={selectUnit}/>
                <Square setUnit={selectUnit}/>

            </div>
            <div className="row">
                <Square setUnit={selectUnit} />
                <Square setUnit={selectUnit} />
                <Square setUnit={selectUnit} />
                <Square setUnit={selectUnit} />
                <Square setUnit={selectUnit} />
            </div>
            <div className="row">
                <Square setUnit={selectUnit} />
                <Square setUnit={selectUnit} />
                <Square setUnit={selectUnit} />
                <Square setUnit={selectUnit} />
                <Square setUnit={selectUnit} />
            </div>
            <div className="row">
                <Square setUnit={selectUnit} />
                <Square setUnit={selectUnit} />
                <Square setUnit={selectUnit} />
                <Square setUnit={selectUnit} />
                <Square setUnit={selectUnit} />
            </div>
            <div className="row">
                <Square setUnit={selectUnit} />
                <Square setUnit={selectUnit} />
                <Square setUnit={selectUnit} />
                <Square setUnit={selectUnit} />
                <Square setUnit={selectUnit} />

            </div>

        </>
    )
}