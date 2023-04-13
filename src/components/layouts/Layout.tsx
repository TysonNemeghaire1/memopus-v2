import React from "react";
import {Outlet, useLoaderData} from "react-router-dom";
import SideMenu from "../SideMenu/SideMenu";
import Thematic from "../../interfaces/Thematic";

interface LoaderData {
  thematics: Thematic[];
}

const Layout = () => {
  const { thematics }: LoaderData = useLoaderData() as LoaderData;
  return (
    <>
      <div className="flex min-h-screen flex-col 2xl:flex-row overflow-hidden">
        <SideMenu thematics={thematics}/>
        <main className="max-h-full w-full bg-gray-50">
          <Outlet/>
        </main>
      </div>
    </>
  );
};

export default Layout;
