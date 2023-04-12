import { FaChevronDown } from "react-icons/fa";
import React, { useState } from "react";
import Thematic, { isThematic } from "../../../interfaces/Thematic";
import User from "../../../interfaces/User";
import List from "./List";
import { IoAddCircle, IoRemoveCircle } from "react-icons/io5";
import InlineAddThematic from "../../InlineAddThematic/InlineAddThematic";

interface Props {
  dataArray: Thematic[] | User[];
  title: string;
}

export default function Container({ dataArray, title }: Props) {
  const [showList, setShowList] = useState(false);
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <div className="mb-2 flex items-center justify-between">
        <p className="text-lg font-bold text-blue-600">{title}</p>
        <div className="flex items-center gap-2">
          {isThematic(dataArray[0]) && (
            <button
              title={
                showForm
                  ? "Supprimer le formulaire d'ajout"
                  : "Ajouter une thématique"
              }
              className="rounded-full text-blue-600 p-0.5 hover:bg-blue-600 hover:text-white"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? (
                <IoRemoveCircle className="text-2xl" />
              ) : (
                <IoAddCircle className="text-2xl" />
              )}
            </button>
          )}
          <button
            onClick={() => setShowList(!showList)}
            className={`text-blue-800 h-fit transition duration-500 hover:bg-blue-800 hover:text-white p-1 rounded-full ${
              showList ? "rotate-180 " : ""
            }`}
          >
            <FaChevronDown />
          </button>
        </div>
      </div>
      {isThematic(dataArray[0]) && showForm && <InlineAddThematic key={"0"} />}
      {
        <List
          dataArray={dataArray}
          display={{ showList, hideFilter: showForm }}
        />
      }
    </>
  );
}
