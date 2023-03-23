import React from 'react';
import {IoPeople,} from "react-icons/io5";
import {RiLogoutBoxFill} from "react-icons/ri";
import {IoMdPerson} from "react-icons/io";
import {FaHome} from "react-icons/fa";
import Thematic from "../../interfaces/Thematic";
import {Link} from "react-router-dom";
import NavList from "./NavList/NavList";
import User from "../../interfaces/User";

interface PropsInterface {
    thematics: Thematic[]
    users: User[]
}

function SideMenu({thematics, users}: PropsInterface) {
    return (
        <div className="overflow-y-auto">
            <div className="flex items-center justify-between p-6">
                <h1 className="pr-6 text-3xl font-extrabold text-blue-800">Memopus</h1>
                <button className="lg:hidden">X</button>
            </div>
            <nav className="mx-6 flex flex-col border-b border-b-blue-500 py-4 text-blue-800">
                <ul>
                    <li>
                        <Link className="flex items-center gap-2 p-2.5 hover:bg-blue-100" to="/"><FaHome/>Accueil</Link>
                    </li>
                    <li>
                        <Link className="flex items-center gap-2 p-2.5 hover:bg-blue-100"
                              to="/thematicTable"><IoMdPerson/>Mes
                            thématiques </Link>
                    </li>
                    <li className="flex items-center gap-2 p-2.5 hover:bg-blue-100"><IoPeople/>Autres utilisateurs</li>
                    <li className="flex items-center gap-2 text-red-400 p-2.5 hover:bg-red-100"><RiLogoutBoxFill/>Déconnexion
                    </li>
                </ul>
            </nav>

            <nav className="mx-6 mt-8">
                <NavList info={{title: "Mes thématiques", baseUrl: "/thematic/"}} dataArray={thematics}/>
            </nav>
            <nav className="mx-6 mt-4">
                <NavList info={{title: "Autres utilisateurs", baseUrl: "/user/"}} dataArray={users}/>
            </nav>
        </div>
    );
}

export default SideMenu;