import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import Login from "../Login/Login";
import Layout from "../layouts/Layout";
import HomeTable from "../HomeTable/HomeTable";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import CardTable from "../CardTable/CardTable";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route element={<PrivateRoute/>}>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<HomeTable/>}/>
                    <Route path="cardtable" element={<CardTable/>}/>
                </Route>
            </Route>
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
