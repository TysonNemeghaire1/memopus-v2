import React from 'react';
import {Outlet, redirect, useLoaderData} from "react-router-dom";
import SideMenu from "../SideMenu/SideMenu";
import Coopernet from "../../services/Coopernet";
import ThematicInterface from "../../interfaces/Thematic";

export async function thematicLoader() {
    try {
        if (!Coopernet.user.id) return redirect("/login");
        return {thematics: await Coopernet.getThematics()};
    } catch (e) {
        return redirect("/login");
    }
}

const Layout = () => {
    const {thematics}: { thematics: ThematicInterface[] } = useLoaderData() as { thematics: ThematicInterface[] };
    return (
        <>
            <div className="flex h-screen flex-col lg:flex-row">
                <aside className="h-20 w-full lg:h-full lg:w-1/5">
                    <SideMenu thematics={thematics}/>
                </aside>
                <main className="h-full w-full bg-gray-50">
                    <Outlet/>
                </main>
            </div>
        </>

    );
};

export default Layout;