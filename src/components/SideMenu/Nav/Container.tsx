import { FaChevronDown } from "react-icons/fa";
import React, { useState } from "react";
import Thematic, { isThematic } from "../../../interfaces/Thematic";
import User from "../../../interfaces/User";
import List from "./List";
import { IoAddCircle, IoRemoveCircle } from "react-icons/io5";
import InlineAddThematic from "../../InlineAddThematic/InlineAddThematic";

interface Props {
  dataArray: Thematic[] | User[];
  info: {
    title: string;
    baseUrl: string;
  };
}

export default function Container({ dataArray, info }: Props) {
  const [showList, setShowList] = useState(false);
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <div
        onClick={() => setShowList(!showList)}
        className="mb-2 flex cursor-pointer items-center justify-between group"
      >
        <p className="text-lg font-bold text-blue-900">{info.title}</p>
        <div className="flex items-center gap-2">
          {isThematic(dataArray[0]) && (
            <button
              title={
                showForm
                  ? "Supprimer le formulaire d'ajout"
                  : "Ajouter une thématique"
              }
              className="rounded-full text-blue-600 p-0.5 hover:bg-blue-600 hover:text-white"
              onClick={(event) => {
                event.stopPropagation();
                setShowForm(!showForm);
              }}
            >
              {showForm ? (
                <IoRemoveCircle className="text-2xl" />
              ) : (
                <IoAddCircle className="text-2xl" />
              )}
            </button>
          )}
          <button
            className={`text-blue-800 h-fit transition duration-500 group-hover:bg-blue-800 group-hover:text-white p-1 rounded-full ${
              showList ? "rotate-180 " : ""
            }`}
          >
            <FaChevronDown />
          </button>
        </div>
      </div>
      {isThematic(dataArray[0]) && showForm && <InlineAddThematic key={"0"} />}
      <List dataArray={dataArray} display={{showList, hideFilter: showForm}}/>
    </>
  );
}
