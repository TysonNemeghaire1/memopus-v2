import React from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import SideMenu from "../SideMenu/SideMenu";
import Thematic from "../../interfaces/Thematic";

interface LoaderData {
  thematics: Thematic[];
}

const Layout = () => {
  const { thematics }: LoaderData = useLoaderData() as LoaderData;
  return (
    <>
      <div className="flex h-screen flex-col lg:flex-row">
        <aside className="h-20 w-full lg:h-full lg:w-1/5">
          <SideMenu thematics={thematics} />
        </aside>
        <main className="h-full w-full bg-gray-50">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Layout;
