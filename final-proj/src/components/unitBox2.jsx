import Square from './unit';

export default function UnitBox({ unitHC }) {
    const mappedUnits = [];
    for (let i = 0; i < unitHC.length; i += 5) {
        mappedUnits.push(unitHC.slice(i, i + 5));
    }

    return (
        <>
            {mappedUnits.map((row, rowIndex) => {
                return (
                    <div key={rowIndex} className="">
                        {row.map((unit) => (
                            <Square key={unit.id}  unit={unit} />
                        ))}
                    </div>
                );
            })}
        </>
    );
}
