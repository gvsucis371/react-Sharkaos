export default function Add({ setActiveUnit }) {
    const newUnit = {
        "id": "",
        "name": "",
        "no": null,
        "element": "",
        "class": "",
        "bias": ""
    }
    return (

        <button className="square" onClick={() => setActiveUnit(newUnit)}>+</button>
    );
}