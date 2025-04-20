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
        <div className="px-2 self-end justify-items-center grid grid-rows-2  h-max align-self-bottom ">
            <p className="text-white font-semibold self-end align-self-bottom  w-[30px]">ADD NEW</p>
            <button className=" bg-white mx-2 hover:border-teal-400 text-2xl hover:bg-cyan-50 text-teal-600 hover:bg-hover:border-blue-300  font-semibold  border-2 p-4 aspect-[1/1] rounded-md border-slate-600 " class id="" onClick={() => setActiveUnit(newUnit)}>+</button>
        </div>
    );
}