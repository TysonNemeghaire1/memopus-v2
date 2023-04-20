import React, {useState} from "react";
import CardContainer from "../layout/Containers/CardContainer";
import Thematic from "../interfaces/Thematic";
import {useLoaderData, useLocation} from "react-router-dom";
import User from "../interfaces/User";
import DataListComponent from "../components/DataList/DataList";
import Container from "../layout/Containers/Container";

interface Props {
  title: string;
}

function DataList({ title }: Props) {
  const datas = useLoaderData() as Thematic[] | User[];
  const [filter, setFilter] = useState("");
  const { state } = useLocation();
  return (
    <Container>
      <CardContainer>
        <h1 className="pt-6 text-xl font-extrabold text-blue-800 xl:text-2xl">
          {title} {state?.userName ? `de ${state.userName}` : null}
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
      </CardContainer>
    </Container>
  );
}

export default DataList;
