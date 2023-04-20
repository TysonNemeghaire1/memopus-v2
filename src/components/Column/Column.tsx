import React from "react";
import ColumnInteface from "../../interfaces/Column";
import { Card } from "./Card";
import { useParams } from "react-router-dom";
import Coopernet from "../../services/Coopernet";

const headerColor = [
  "bg-red-600",
  "bg-orange-600",
  "bg-yellow-600",
  "bg-lime-600",
];

const headerButtonHoverColor = [
  "hover:bg-red-500",
  "hover:bg-orange-500",
  "hover:bg-yellow-500",
  "hover:bg-lime-500",
];

interface Props {
  index: number;
  data: ColumnInteface;
}

function Column({ data, index }: Props) {
  const params = useParams();
  console.log(params);
  return (
    <div className="max-h-full space-y-6">
      <p
        className={`flex justify-between h-fit text-white text-xl px-5 py-3 ${
          headerColor[index % 4]
        }`}
      >
        {data.name}
        {params.userId === Coopernet.user.id ? (
          <button
            className={`font-bold px-1.5 rounded-full h-fit text-center ${
              headerButtonHoverColor[index % 4]
            }`}
          >
            +
          </button>
        ) : null}
      </p>
      <section className="flex flex-col gap-4">
        {data.cards.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </section>
    </div>
  );
}

export default Column;
