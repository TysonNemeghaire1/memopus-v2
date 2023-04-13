import Coopernet from "../services/Coopernet";
import { loginWithLocalStorage } from "../services/login";
import { redirect } from "react-router-dom";

export async function loader() {
  if (!Coopernet.user.id && !(await loginWithLocalStorage())) {
    return redirect("/login");
  }
  return (await Coopernet.getUsers())
    .filter((user) => user.uid !== "0")
    .sort((a, b) => +(a.uname.toUpperCase() > b.uname.toUpperCase()));
}
