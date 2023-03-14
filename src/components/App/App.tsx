import React from 'react';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import PrivateRoutes from "../PrivateRoute/PrivateRoute";
import {Login} from "../Login/Login";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<PrivateRoutes/>}/>
            <Route path="/login" element={<Login/>}/>
        </>
    )
)

function App() {
    return (
        <RouterProvider router={router}/>
    );
}

export default App;
