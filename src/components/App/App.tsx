import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
// import PrivateRoutes from "../PrivateRoute/PrivateRoute";
import Login from "../Login/Login";
import Layout from "../layouts/Layout";
import HomeTable from "../HomeTable/HomeTable";
import PrivateRoutes from "../PrivateRoute/PrivateRoute";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route element={<PrivateRoutes/>}>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<HomeTable/>}/>
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
