import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "../layouts/Layout";
import HomeTable from "../HomeTable/HomeTable";
import DataTable from "../DataTable/DataTable";
import Login from "../Login/Login";
import { loader as userLoader } from "../../routes/users";
import {
  action as thematicAction,
  flatArrayLoader,
  loader as thematicLoader,
} from "../../routes/thematics";
import ThematicForm from "../ThematicForm";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />} loader={thematicLoader}>
        <Route index element={<HomeTable />} />
        <Route path="/thematics" action={thematicAction}>
          <Route path=":thematicId" action={thematicAction}>
            <Route
              path="edit"
              element={<ThematicForm />}
              loader={flatArrayLoader}
            />
          </Route>
        </Route>
        <Route path="/users" element={<DataTable />} loader={userLoader} />
        <Route
          path={`/users/:userId/thematics`}
          element={<DataTable />}
          loader={flatArrayLoader}
        />
      </Route>
      <Route path="/login" element={<Login />} />
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
