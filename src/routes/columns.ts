import { LoaderFunctionArgs, redirect } from "react-router-dom";
import Coopernet from "../services/Coopernet";
import { loginWithLocalStorage } from "../services/login";

export async function loader({ params }: LoaderFunctionArgs) {
  try {
    if (!Coopernet.user.id && !(await loginWithLocalStorage())) {
      return redirect("/login");
    }
    return await Coopernet.getCards(
      params.thematicId as string,
      params?.userId === Coopernet.user.id ? undefined : params.userId
    );
  } catch (e) {
    return redirect("/login");
  }
}
