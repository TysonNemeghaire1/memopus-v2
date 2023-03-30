import React, { useState } from "react";
import { redirect, useLoaderData } from "react-router-dom";
import Thematic from "../../interfaces/Thematic";
import coopernet from "../../services/Coopernet";
import Coopernet from "../../services/Coopernet";

export const thematicTableLoader = async () => {
  try {
    if (!coopernet.user.id) return redirect("/login");
    const fetchedThematics = await Coopernet.getThematics();
    const thematics: Thematic[] = [];
    for (let fetchedThematic of fetchedThematics) {
      thematics.push(fetchedThematic);
      if (fetchedThematic.children) {
        for (let child of fetchedThematic.children) {
          thematics.push(child);
        }
      }
    }
    return { thematics };
  } catch (e) {
    return redirect("/login");
  }
};

function DataTable() {
  const { thematics }: { thematics: Thematic[] } = useLoaderData() as {
    thematics: Thematic[];
  };
  const [filter, setFilter] = useState("");

  return (
    <div className="mx-auto h-full w-full space-y-6 lg:w-11/12">
      <h1 className="pt-6 text-xl font-extrabold text-blue-800 lg:text-2xl">
        Mes thématiques
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
      <section>
        {thematics.flatMap((thematic) => {
          if (
            filter.length < 2 ||
            thematic.name.toUpperCase().includes(filter.toUpperCase())
          ) {
            return <div>{thematic.name}</div>;
          }
          return [];
        })}
      </section>
    </div>
  );
}

export default DataTable;
