import React, { useState } from "react";
import CardContainer from "../layout/Containers/CardContainer";
import Thematic from "../interfaces/Thematic";
import { useLoaderData, useLocation, useParams } from "react-router-dom";
import User from "../interfaces/User";
import DataListComponent from "../components/DataList/DataList";

interface Props {
  title: string;
}

function DataList({ title }: Props) {
  const datas = useLoaderData() as Thematic[] | User[];
  const [filter, setFilter] = useState("");
  const { state } = useLocation();
  return (
    <CardContainer>
      <div className="bg-white px-5 py-5 shadow-lg space-y-6">
        <h1 className="pt-6 text-xl font-extrabold text-blue-800 2xl:text-2xl">
          {title} {state && `de ${state}`}
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
        <DataListComponent datas={datas} filter={filter} />
      </div>
    </CardContainer>
  );
}

export default DataList;
