import Coopernet from "../services/Coopernet";
import { ActionFunctionArgs, redirect } from "react-router-dom";

export async function loader() {
  try {
    if (!Coopernet.user.id) return redirect("/login");
    const thematics = await Coopernet.getThematics();
    return { thematics };
  } catch (e) {
    return redirect("/login");
  }
}

export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();
  const action = formData.get("action");

  if (action === "delete") {
    await Coopernet.deleteThematic(params.thematicId as string);
    return null;
  } else {
    const label = formData.get("label");
    const ptid = formData.get("ptid");
    if (action === "add") {
      return await Coopernet.addOrEditThematic(
        label as string,
        ptid ? parseInt(ptid as string) : undefined
      );
    }
    if (action === "edit") {
      return await Coopernet.addOrEditThematic(
        label as string,
        ptid ? parseInt(ptid as string) : undefined,
        params.thematicId ? parseInt(params.thematicId as string) : undefined
      );
    }
  }
}
