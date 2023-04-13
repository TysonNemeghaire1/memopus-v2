import Coopernet from "../services/Coopernet";
import { loginWithLocalStorage } from "../services/login";
import { redirect } from "react-router-dom";

export async function loader() {
  try {
    if (Coopernet.user.id || (await loginWithLocalStorage()))
      return redirect("/");
    return null;
  } catch (e) {
    return null;
  }
}
