import Coopernet from "../services/Coopernet";
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
} from "react-router-dom";
import Thematic from "../interfaces/Thematic";

export async function loader() {
  try {
    if (!Coopernet.user.id) {
      const refreshToken = localStorage.getItem("refresh_token");
      if (refreshToken) {
        Coopernet.oAuthToken.refresh_token = refreshToken;
        await Coopernet.login();

        localStorage.setItem(
          "refresh_token",
          Coopernet.oAuthToken.refresh_token
        );
      } else return redirect("/login");
    }
    const thematics = await Coopernet.getThematics();
    return { thematics };
  } catch (e) {
    return redirect("/login");
  }
}

export async function flatArrayLoader({ params }: LoaderFunctionArgs) {
  try {
    const thematics = await Coopernet.getThematics(
      params?.userId === Coopernet.user.id ? undefined : params.userId
    );
    console.log(thematics, params);
    return mergeArrayRecursively(thematics);
  } catch (e) {
    return { error: "Pas de données" };
  }
}

export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();
  const action = formData.get("action");

  if (action === "delete") {
    if (window.confirm("Voulez vous réellement supprimer cette thématique ?")) await Coopernet.deleteThematic(params.thematicId as string);
    return null;
  } else {
    const label = formData.get("name") as string;
    const pid = formData.get("pid") as string;

    if (action === "add") {
      return await Coopernet.addOrEditThematic(
        label,
        pid ? pid : undefined
      );
    }
    if (action === "edit") {
      return await Coopernet.addOrEditThematic(
        label,
        pid ? parseInt(pid) : undefined,
        params.thematicId ? parseInt(params.thematicId as string) : undefined
      );
    }
  }
}

const mergeArrayRecursively = (
  thematics: Thematic[],
  mergedArray?: Thematic[]
) => {
  const new_array = mergedArray ?? [];
  for (let thematic of thematics) {
    new_array.push(thematic);
    if (thematic.children) mergeArrayRecursively(thematic.children, new_array);
  }
  return new_array;
};
