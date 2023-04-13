import React, {useState} from "react";
import {Link, useLoaderData} from "react-router-dom";
import Thematic, {isThematic} from "../../interfaces/Thematic";
import User from "../../interfaces/User";

function DataTable() {
  const datas = useLoaderData() as Thematic[] | User[];
  const [filter, setFilter] = useState("");

  return (
      <div className="mx-auto h-full w-11/12 sm:my-8">
        <div className="bg-white px-5 py-5 shadow-lg space-y-6">
          <h1 className="pt-6 text-xl font-extrabold text-blue-800 2xl:text-2xl">
            {isThematic(datas[0]) ? "Mes thématiques" : "Les autres utilisateurs"}
          </h1>
          <section className="flex flex-col gap-1">
            <label className="text-blue-800" htmlFor="thematicFilter">
              Filtre
            </label>
            <input
                type="text"
            name="thematicFilter"
            id="thematicFilter"
            placeholder="Taper votre recherche"
            className="w-fit rounded-lg ring-1 ring-blue-600 p-1.5"
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
          />
        </section>
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
      </div>
    </div>
  );
}

export default DataTable;
