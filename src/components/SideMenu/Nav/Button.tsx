import React, { useState } from "react";
import Thematic from "../../../interfaces/Thematic";
import List from "./List";
import { FaChevronDown } from "react-icons/fa";
import ActionButtonGroup from "./ActionButtonGroup";

interface Props {
  name: string;
  id: string;
  thematicChildren?: Thematic[];
  pid?: number
}

export default function Button({ name, thematicChildren, id, pid }: Props) {
  const [show, setShow] = useState(false);
  return (
    <li
      className="border-blue-800 p-2.5 hover:border hover:bg-blue-100"
      onClick={(event) => {
        event.stopPropagation();
        setShow(!show);
      }}
    >
      <span className="flex justify-between">
        {name}
        <div className="flex items-center gap-0.5">
          <ActionButtonGroup id={id} hasChildren={!!thematicChildren} pid={pid} />
          {thematicChildren && (
            <button
              className={`text-blue-800 h-fit transition duration-500 p-1 hover:bg-blue-800 hover:text-white rounded-full ${
                show ? "rotate-180 " : ""
              }`}
            >
              <FaChevronDown />
            </button>
          )}
        </div>
      </span>
      {thematicChildren && <List dataArray={thematicChildren} show={show} />}
    </li>
  );
}
