import ActionButtonGroup from "../SideMenu/Nav/ActionButtonGroup";
import Coopernet from "../../services/Coopernet";
import React, {useState} from "react";
import CardInterface from "../../interfaces/Card";
import {useParams} from "react-router-dom";

export function Card({ card }: { card: CardInterface }) {
  const [showDetails, setShowDetails] = useState(false);
  const params = useParams();

  return (
    <section className="flex flex-col gap-2 bg-white p-6 shadow-md">
      {params.userId === Coopernet.user.id ? (
        <div className="flex justify-end">
          <ActionButtonGroup data={card}/>
        </div>
      ) : null}
      <p>{card.question}</p>
      <img src={`${Coopernet.url}/${card.question_picture.url}`} alt="" />
      <div className="mt-2 flex gap-1">
        <button
          className="w-full bg-blue-400 p-1 font-bold text-white"
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? "Cacher" : "Montrer"}
        </button>
        <button className="w-full bg-green-400 p-1 font-bold text-white">
          Répondre
        </button>
      </div>
      <div
        className={`mt-2 overflow-hidden space-y-1 transition-all ease-in-out duration-500 ${
          showDetails ? "max-h-screen" : "max-h-0"
        }`}
      >
        {card.answer ? (
          <>
            <p>Réponse :</p>
            <p className="bg-gray-50 py-2 px-1.5">{card.answer}</p>
          </>
        ) : null}

        {card.explanation_picture.url || card.explanation ? (
          <p>Explication :</p>
        ) : null}
        {card.explanation ? (
          <p className="bg-gray-50 py-2 px-1.5">{card.explanation}</p>
        ) : null}
        {card.explanation_picture.url ? (
          <img
            src={`${Coopernet.url}/${card.explanation_picture.url}`}
            alt=""
          />
        ) : null}
      </div>
    </section>
  );
}
