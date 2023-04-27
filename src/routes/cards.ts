import Coopernet from "../services/Coopernet";
import { ActionFunctionArgs } from "react-router-dom";
import Card from "../interfaces/Card";

export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();
  const action = formData.get("action");

  if (action === "delete") {
    if (window.confirm("Voulez vous réellement supprimer cette carte ?")) {
      await Coopernet.deleteCard(params.cardId!);
    }
    return null;
  }

  const question = formData.get("question") as string;
  const questionPicture = formData.get("questionPicture");
  const answer = formData.get("answer") as string;
  const explanation = formData.get("explanation") as string;
  const columnId = formData.get("columnId") as string;
  const themacicId = formData.get("thematicId") as string;

  console.log(typeof questionPicture)

  const newCard = {question, answer, explanation, column : columnId} as Card;

  if (action === "add") {
    await Coopernet.addCard(newCard, themacicId);
    return null;
  }


  /*if (action === "edit") {
    return await Coopernet.addOrEditThematic(
      label,
      pid ? parseInt(pid) : undefined,
      params.thematicId ? parseInt(params.thematicId as string) : undefined
    );
  }*/
}
