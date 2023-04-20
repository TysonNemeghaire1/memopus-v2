import React, {useState} from "react";
import {FaChevronDown} from "react-icons/fa";
import List from "./List";
import ActionButtonGroup from "./ActionButtonGroup";
import Thematic, {isThematic} from "../../../interfaces/Thematic";
import User from "../../../interfaces/User";
import InlineAddThematic from "../../InlineAddThematic/InlineAddThematic";
import {Link} from "react-router-dom";
import Coopernet from "../../../services/Coopernet";

interface Props {
  data: Thematic | User;
  hideSideBar: () => void;
}

export default function Button({ data, hideSideBar }: Props) {
  const [showList, setShowList] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const toggleShowForm = () => {
    setShowForm(!showForm);
  };

  const id = isThematic(data) ? data.id : data.uid;
  const name = isThematic(data) ? data.name : data.uname;

  return (
    <li className="border-blue-800 p-2 hover:border hover:bg-blue-100">
      <section className="flex justify-between">
        <Link
            className="flex-1"
            key={id}
            to={
              isThematic(data)
                  ? `/users/${Coopernet.user.id}/thematics/${data.id}`
                  : `/users/${id}/thematics`
            }
            state={{
              thematicName: isThematic(data) ? name : null,
              userName: isThematic(data) ? Coopernet.user.name : name,
            }}
            onClick={hideSideBar}
        >
          {name}
        </Link>
        <div className="flex items-center gap-1">
          {isThematic(data) ? (
              <ActionButtonGroup
                  data={data}
                  showForm={{value: showForm, toggle: toggleShowForm}}
                  hideSideBar={hideSideBar}
              />
          ) : null}
          {isThematic(data) && data.children ? (
            <button
              onClick={() => setShowList(!showList)}
              className={`text-blue-800 h-fit transition duration-300 p-1 hover:bg-blue-800 hover:text-white rounded-full ${
                showList ? "rotate-180 " : ""
              }`}
            >
              <FaChevronDown />
            </button>
          ) : null}
        </div>
      </section>
      {isThematic(data) && showForm ? (
        <InlineAddThematic key={data.id} pid={data.id} />
      ) : null}
      {isThematic(data) && data.children ? (
        <List
          dataArray={data.children}
          display={{ showList }}
          hideSideBar={hideSideBar}
        />
      ) : null}
    </li>
  );
}
