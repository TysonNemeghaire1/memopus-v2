import React from 'react';
import {Outlet, redirect, useLoaderData} from "react-router-dom";
import SideMenu from "../SideMenu/SideMenu";
import Coopernet from "../../services/Coopernet";
import Thematic from "../../interfaces/Thematic";
import User from "../../interfaces/User";

interface LoaderData {
    thematics: Thematic[],
    users: User[]
}

export async function thematicLoader() {
    try {
        if (!Coopernet.user.id) return redirect("/login");
        const [thematics, users] = await Promise.all([Coopernet.getThematics(), Coopernet.getUsers()])
        return {thematics, users};
    } catch (e) {
        return redirect("/login");
    }
}

const Layout = () => {
    const {thematics, users}: LoaderData = useLoaderData() as LoaderData;
    return (
        <>
            <div className="flex h-screen flex-col lg:flex-row">
                <aside className="h-20 w-full lg:h-full lg:w-1/5">
                    <SideMenu thematics={thematics} users={users}/>
                </aside>
                <main className="h-full w-full bg-gray-50">
                    <Outlet/>
                </main>
            </div>
        </>

    );
};

export default Layout;