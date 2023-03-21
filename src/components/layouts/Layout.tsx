import React from 'react';
import {Outlet} from "react-router-dom";
import SideMenu from "../SideMenu/SideMenu";

const Layout = () => {
    return (
        <>
            <div className="flex h-screen flex-col lg:flex-row">
                <aside className="h-20 w-full lg:h-full lg:w-1/5">
                    <SideMenu/>
                </aside>
                <main className="h-full w-full bg-gray-100">
                    <Outlet/>
                </main>
            </div>
        </>

    );
};

export default Layout;