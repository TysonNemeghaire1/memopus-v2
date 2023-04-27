import React from "react";
import Coopernet from "../../services/Coopernet";
import Card from "../../interfaces/Card";
import {useFetcher, useParams} from "react-router-dom";

interface Props {
  card?: Card;
  columnId?: string
}

function CardForm({ card, columnId}: Props) {
  const fetcher = useFetcher();
  const params = useParams();
  return (
    <fetcher.Form
      action={`/cards${card ? `/${card.id}` : ""}`}
      method="post"
      className="flex flex-col gap-2 bg-white p-6 shadow-md space-y-3"
    >
      <input type="hidden" name="columnId" value={columnId}/>
      <input type="hidden" name="thematicId" value={params.thematicId}/>

      <p className="text-center text-xl font-bold">
        {card ? "Modification" : "Ajout d'une carte"}
      </p>
      <section className="space-y-2">
        <label className="text-lg" htmlFor="question">
          Question
        </label>
        <input
          type="text"
          name="question"
          id="question"
          defaultValue={card?.question}
          className="ring-1 ring-black w-full rounded-lg px-1.5 py-1"
        />
        {card?.question_picture.url ? (
          <>
            <img
              src={`${Coopernet.url}/${card?.question_picture.url}`}
              alt=""
            />
            <button className="bg-red-600 text-white">
              Supprimer la photo
            </button>
          </>
        ) : null}
        <input
          type="file"
          name="questionPicture"
          id="questionPicture"
          className="pt-3 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        <p className="mt-1 text-sm text-gray-600">Photo pour la question</p>
      </section>
      <section className="space-y-2">
        <label className="text-lg" htmlFor="question">
          Réponse
        </label>
        <input
          type="text"
          name="answer"
          id="answer"
          defaultValue={card?.answer}
          className="ring-1 ring-black w-full rounded-lg px-1.5 py-1"
        />
      </section>
      <section className="space-y-2">
        <label className="text-lg" htmlFor="question">
          Explication
        </label>
        <textarea
          name="explanation"
          id="explanation"
          defaultValue={card?.explanation}
          className="ring-1 ring-black w-full rounded-lg px-1.5 py-1"
        />
        {card?.explanation_picture.url ? (
          <>
            <img
              src={`${Coopernet.url}/${card?.explanation_picture.url}`}
              alt=""
            />
            <button className="bg-red-600 text-white">
              Supprimer la photo
            </button>
          </>
        ) : null}
        <input
          type="file"
          name="explanationPicture"
          id="explanationPicture"
          className="pt-3 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        <p className="mt-1 text-sm text-gray-600">Photo pour l'explication</p>
      </section>
      <section className="flex justify-center gap-6">
        <button type="submit" className="bg-green-400 text-white font-bold py-2 px-3 rounded-full" name="action" value="add">Créer</button>
        <button className="bg-red-400 text-white font-bold py-2 px-3 rounded-full">Annuler</button>
      </section>
    </fetcher.Form>
  );
}

export default CardForm;
