import React from "react";
import {Link, useLocation} from "react-router-dom";
import Thematic, {isThematic} from "../../interfaces/Thematic";
import User from "../../interfaces/User";

interface Props {
  datas: Thematic[] | User[];
  filter: string;
}

function DataList({datas, filter}: Props) {
  const {state} = useLocation();
  return (
      <ul className="grid w-full grid-cols-1 gap-1 bg-gray-50 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {datas.length ? (
            datas.flatMap((data) => {
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
                          state={{
                            thematicName: isThematic(data) ? name : null,
                            userName: isThematic(data) ? state?.userName : name,
                          }}
                      >
                        {name}
                      </Link>
                    </li>
                );
              }
              return [];
            })
        ) : (
            <p className="p-3 text-lg">Cette personne n'a aucune thématique</p>
        )}
      </ul>
  );
}

export default DataList;
