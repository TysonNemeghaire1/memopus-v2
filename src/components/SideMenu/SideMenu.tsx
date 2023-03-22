import React from 'react';
import {IoPeople,} from "react-icons/io5";
import {RiLogoutBoxFill} from "react-icons/ri";
import {IoMdPerson} from "react-icons/io";
import {FaHome} from "react-icons/fa";
import ThematicInterface from "../../interfaces/Thematic";
import {Link} from "react-router-dom";

interface PropsInterface {
    thematics: ThematicInterface[]
}

function SideMenu({thematics}: PropsInterface) {
    return (
        <div className="overflow-y-auto">
            <div className="flex items-center justify-between p-6">
                <h1 className="pr-6 text-3xl font-extrabold text-blue-800">Memopus</h1>
                <button className="lg:hidden">X</button>
            </div>
            <nav className="mx-6 flex flex-col border-b border-b-blue-500 py-4 text-blue-800">
                <Link to="/"><p className="flex items-center gap-2 p-2.5 hover:bg-blue-100"><FaHome/>Accueil</p></Link>
                <Link to="/thematicTable"><p className="flex items-center gap-2 p-2.5 hover:bg-blue-100"><IoMdPerson/>Mes
                    thématiques </p>
                </Link>
                <p className="flex items-center gap-2 p-2.5 hover:bg-blue-100"><IoPeople/>thématiques des autres</p>
                <p className="flex items-center gap-2 text-red-400 p-2.5 hover:bg-red-100"><RiLogoutBoxFill/>Déconnexion
                </p>
            </nav>

            <nav className="mx-6 mt-8">
                <span className="text-lg font-bold text-blue-800">Mes thématiques</span>
                <ul className="flex flex-col py-2 text-blue-800">
                    {thematics.map((theme) => (<li className="p-2.5 hover:bg-blue-100">{theme.name}</li>))}
                </ul>
            </nav>
        </div>
    );
}

export default SideMenu;