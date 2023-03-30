import { FaChevronDown } from "react-icons/fa";
import React, { useState } from "react";
import Thematic, { isThematic } from "../../../interfaces/Thematic";
import User from "../../../interfaces/User";
import List from "./List";
import { IoAddCircle } from "react-icons/io5";

interface Props {
  dataArray: Thematic[] | User[];
  info: {
    title: string;
    baseUrl: string;
  };
}

export default function Container({ dataArray, info }: Props) {
  const [show, setShow] = useState(false);
  return (
    <>
      <div
        onClick={() => setShow(!show)}
        className="mb-2 flex cursor-pointer items-center justify-between group"
      >
        <p className="text-lg font-bold text-blue-900">{info.title}</p>
        <div className="flex items-center gap-2">
          {isThematic(dataArray[0]) && (
            <button
              title="Ajouter une thématique"
              className="rounded text-blue-600 p-0.5 hover:bg-blue-600 hover:text-white"
            >
              <IoAddCircle className="text-2xl" />
            </button>
          )}
          <button
            className={`text-blue-800 h-fit transition duration-500 group-hover:bg-blue-800 group-hover:text-white p-1 rounded-full ${
              show ? "rotate-180 " : ""
            }`}
          >
            <FaChevronDown />
          </button>
        </div>
      </div>
      <List dataArray={dataArray} show={show} />
    </>
  );
}
