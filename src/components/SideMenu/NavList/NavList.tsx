import {FaChevronDown} from "react-icons/fa";
import React, {useState} from "react";
import Thematic from "../../../interfaces/Thematic";
import NavButton from "../NavButton/NavButton";
import User from "../../../interfaces/User";

interface Props {
    dataArray: Thematic[] | User[]
    info: {
        title: string,
        baseUrl: string
    }
}

export default function NavList({dataArray, info}: Props) {
    const [show, setShow] = useState(false);
    const [filter, setFilter] = useState("");

    return <>
        <div onClick={() => setShow(!show)} className="flex cursor-pointer items-center justify-between group">
            <span className="text-lg font-bold text-blue-900">{info.title}</span>
            <button
                className={`text-blue-800 h-fit transition duration-500 group-hover:bg-blue-800 group-hover:text-white p-1 rounded-full ${show ? "rotate-180 " : ""}`}>
                <FaChevronDown/></button>
        </div>
        <div
            className={`overflow-y-scroll transition-all ease-in-out duration-500 ease-in-out ${show ? "max-h-80" : "max-h-0"}`}>
            <div className={`transition duration-700 text-blue-800 ${!show && "-translate-y-full"}`}>
                <section className="mt-2 flex items-center gap-2 px-2.5">
                    <label className="font-semibold" htmlFor="thematicFilter">Filtre</label>
                    <input type="text" name="thematicFilter" id="thematicFilter" placeholder="Taper votre recherche"
                           className="w-9/12 rounded p-1 ring-1 ring-blue-600" value={filter}
                           onChange={(event) => setFilter(event.target.value)}/>
                </section>
                <ul className={`flex flex-col py-2`}>
                    {dataArray.flatMap(data => {
                        if (filter.length < 2 || data.name.toUpperCase().includes(filter.toUpperCase())) {
                            return <NavButton key={data.id} name={data.name} id={data.id}/>
                        }
                        return [];
                    })}

                </ul>
            </div>
        </div>
    </>;
}