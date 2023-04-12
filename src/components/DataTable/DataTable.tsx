import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Thematic, { isThematic } from "../../interfaces/Thematic";
import User from "../../interfaces/User";

function DataTable() {
  const datas = useLoaderData() as Thematic[] | User[];
  const [filter, setFilter] = useState("");

  return (
    <div className="mx-auto h-full w-11/12 sm:mt-8">
      <div className="bg-white space-y-6 shadow-lg py-5 px-5">
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
        <section className="flex flex-wrap gap-3 w-full">
          <ul className="grid grid-cols-1 gap-1 bg-gray-50 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full">
            {datas.flatMap((data) => {
              if (isThematic(data)) {
                if (
                  filter.length < 2 ||
                  data.name.toUpperCase().includes(filter.toUpperCase())
                ) {
                  return (
                    <li
                      key={data.id}
                      className="rounded border border-blue-100 hover:border-blue-600 hover:bg-blue-50 text-center"
                    >
                      <Link
                        className="block w-full px-8 py-2"
                        to={`${data.id}`}
                      >
                        {data.name}
                      </Link>
                    </li>
                  );
                }
              } else if (
                filter.length < 2 ||
                data.uname.toUpperCase().includes(filter.toUpperCase())
              ) {
                return (
                  <li
                    key={data.uid}
                    className="rounded border border-blue-100 hover:border-blue-600 hover:bg-blue-50 text-center"
                  >
                    <Link
                      className="block w-full px-8 py-2"
                      to={`${data.uid}/thematics`}
                    >
                      {data.uname}
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
