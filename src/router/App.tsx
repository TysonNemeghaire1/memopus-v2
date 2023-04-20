import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "../layout/Layout";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import DataList from "../pages/DataList";
import ThematicForm from "../pages/ThematicForm";
import { loader as userLoader } from "../routes/users";
import {
  action as thematicAction,
  flatArrayLoader,
  loader as thematicLoader,
} from "../routes/thematics";
import { loader as loginLoader } from "../routes/login";
import { loader as columnLoader } from "../routes/columns";
import { loader as dashboardLoader } from "../routes/dashboard";
import ThematicColumns from "../pages/ThematicColumns";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />} loader={thematicLoader}>
        <Route index element={<Dashboard />} loader={dashboardLoader} />
        <Route path="/thematics" action={thematicAction}>
          <Route path=":thematicId" action={thematicAction}>
            <Route
              path="edit"
              element={<ThematicForm />}
              loader={flatArrayLoader}
            />
          </Route>
        </Route>
        <Route
          path="/users"
          element={<DataList title={"Autres utilisateurs"} />}
          loader={userLoader}
        />
        <Route
          path={`/users/:userId/thematics`}
          element={<DataList title={"Liste de Thématiques"} />}
          loader={flatArrayLoader}
        />
        <Route
          path={`/users/:userId/thematics/:thematicId`}
          element={<ThematicColumns />}
          loader={columnLoader}
        />
      </Route>
      <Route path="/login" element={<Login />} loader={loginLoader} />
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
