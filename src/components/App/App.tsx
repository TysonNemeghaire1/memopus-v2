import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import Layout, {thematicLoader} from "../layouts/Layout";
import HomeTable from "../HomeTable/HomeTable";
import ThematicTable, {thematicTableLoader} from "../ThematicTable/ThematicTable";
import Login from "../Login/Login";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Layout/>} loader={thematicLoader}>
                <Route index element={<HomeTable/>}/>
                <Route path="thematicTable" element={<ThematicTable/>} loader={thematicTableLoader}/>
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
