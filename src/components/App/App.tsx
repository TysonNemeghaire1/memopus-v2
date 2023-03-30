import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "../layouts/Layout";
import HomeTable from "../HomeTable/HomeTable";
import DataTable, { thematicTableLoader } from "../DataTable/DataTable";
import Login from "../Login/Login";
import { loader as userLoader } from "../../routes/users";
import {
  loader as thematicLoader,
  action as thematicAction,
} from "../../routes/thematics";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />} loader={thematicLoader}>
        <Route index element={<HomeTable />} />
        <Route
          path="my-thematics"
          element={<DataTable />}
          loader={thematicTableLoader}
        />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/users" loader={userLoader} />
      <Route path="/thematics" action={thematicAction} loader={thematicLoader}>
        <Route path=":thematicId" action={thematicAction} />
      </Route>
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
