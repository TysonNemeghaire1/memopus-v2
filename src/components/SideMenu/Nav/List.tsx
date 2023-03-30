import React, { useState } from "react";
import Thematic, { isThematic } from "../../../interfaces/Thematic";
import User from "../../../interfaces/User";
import Button from "./Button";

interface Props {
  dataArray: Thematic[] | User[];
  show: boolean;
}

function List({ dataArray, show }: Props) {
  const [filter, setFilter] = useState("");

  return (
    <div
      className={`overflow-y-scroll transition-all ease-in-out duration-500 ease-in-out ${
        show ? "max-h-80" : "max-h-0"
      }`}
    >
      <div
        className={`transition duration-700 text-blue-800 ${
          !show && "-translate-y-full"
        }`}
      >
        {dataArray.length > 6 && (
          <section
            onClick={(e) => e.stopPropagation()}
            className="mt-2 flex items-center gap-2 px-2.5"
          >
            <label
              className="font-semibold"
              htmlFor={`thematicFilter-${
                isThematic(dataArray[0]) ? dataArray[0].id : dataArray[0].uid
              }`}
            >
              Filtre
            </label>
            <input
              type="text"
              name={`thematicFilter-${
                isThematic(dataArray[0]) ? dataArray[0].id : dataArray[0].uid
              }`}
              id={`thematicFilter-${
                isThematic(dataArray[0]) ? dataArray[0].id : dataArray[0].uid
              }`}
              placeholder="Taper votre recherche"
              className="w-9/12 rounded p-1 ring-1 ring-blue-600"
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
            />
          </section>
        )}
        <ul className={`flex flex-col pt-2`}>
          {dataArray.flatMap((data) => {
            if (isThematic(data)) {
              if (
                filter.length < 2 ||
                data.name.toUpperCase().includes(filter.toUpperCase())
              ) {
                return (
                  <Button
                    key={data.id}
                    name={data.name}
                    id={data.id}
                    thematicChildren={data.children}
                  />
                );
              }
            } else {
              if (
                filter.length < 2 ||
                data.uname.toUpperCase().includes(filter.toUpperCase())
              ) {
                return (
                  <Button key={data.uid} name={data.uname} id={data.uid} />
                );
              }
            }
            return [];
          })}
        </ul>
      </div>
    </div>
  );
}

export default List;