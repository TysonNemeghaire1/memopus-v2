import Coopernet from "../services/Coopernet";
import {
  ActionFunctionArgs,
} from "react-router-dom";

export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();
  const action = formData.get("action");

  if (action === "delete") {
    if (window.confirm("Voulez vous réellement supprimer cette carte ?")) {
      await Coopernet.deleteCard(params.cardId!);
    }
    return null;
  }

  /*const label = formData.get("name") as string;
  const pid = formData.get("pid") as string;

  if (action === "add") {
    return await Coopernet.addOrEditThematic(label, pid ? pid : undefined);
  }

  if (action === "edit") {
    return await Coopernet.addOrEditThematic(
      label,
      pid ? parseInt(pid) : undefined,
      params.thematicId ? parseInt(params.thematicId as string) : undefined
    );
  }*/
}
