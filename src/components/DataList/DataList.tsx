import React from "react";
import { Link } from "react-router-dom";
import Thematic, { isThematic } from "../../interfaces/Thematic";
import User from "../../interfaces/User";
import Coopernet from "../../services/Coopernet";

interface Props {
  datas: Thematic[] | User[];
  filter: string;
}

function DataList({ datas, filter }: Props) {
  return (
    <section className="flex w-full flex-wrap gap-3">
      <ul className="grid w-full grid-cols-1 gap-1 bg-gray-50 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {datas.flatMap((data) => {
          const id = isThematic(data) ? data.id : data.uid;
          const name = isThematic(data) ? data.name : data.uname;
          if (
            filter.length < 2 ||
            name.toUpperCase().includes(filter.toUpperCase())
          ) {
            return (
              <li
                key={id}
                className="rounded border border-blue-100 text-center hover:border-blue-600 hover:bg-blue-50"
              >
                <Link
                  className="block w-full px-8 py-2"
                  to={isThematic(data) ? id : `${id}/thematics`}
                  state={isThematic(data) ? Coopernet.user.name : name}
                >
                  {name}
                </Link>
              </li>
            );
          }
          return [];
        })}
      </ul>
    </section>
  );
}

export default DataList;
