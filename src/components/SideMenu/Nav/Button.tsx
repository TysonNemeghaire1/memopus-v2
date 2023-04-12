import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import List from "./List";
import ActionButtonGroup from "./ActionButtonGroup";
import Thematic, { isThematic } from "../../../interfaces/Thematic";
import User from "../../../interfaces/User";
import InlineAddThematic from "../../InlineAddThematic/InlineAddThematic";
import { Link } from "react-router-dom";

interface Props {
  data: Thematic | User;
}

export default function Button({ data }: Props) {
  const [showList, setShowList] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const toggleShowForm = () => {
    setShowForm(!showForm);
  };

  const id = isThematic(data) ? data.id : data.uid;
  const name = isThematic(data) ? data.name : data.uname;

  return (
    <li className="border-blue-800 hover:border p-2 hover:bg-blue-100">
      <section className="flex justify-between">
        <Link className="flex-1" key={id} to={`/users/${id}/thematics`}>
          {name}
        </Link>
        <div className="flex items-center gap-1">
          {isThematic(data) && (
            <ActionButtonGroup
              thematic={data}
              showForm={{ value: showForm, toggle: toggleShowForm }}
            />
          )}
          {isThematic(data) && data.children && (
            <button
              onClick={() => setShowList(!showList)}
              className={`text-blue-800 h-fit transition duration-500 p-1 hover:bg-blue-800 hover:text-white rounded-full ${
                showList ? "rotate-180 " : ""
              }`}
            >
              <FaChevronDown />
            </button>
          )}
        </div>
      </section>
      {isThematic(data) && showForm && (
        <InlineAddThematic key={data.id} pid={data.id} />
      )}
      {isThematic(data) && data.children && (
        <List
          dataArray={data.children}
          display={{ showList }}
        />
      )}
    </li>
  );
}
