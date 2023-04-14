import React from "react";
import ThematicTable from "../components/ThematicTable/ThematicTable";
import { useLoaderData } from "react-router-dom";
import NumberOfTermInColumn from "../interfaces/NumberOfTermInColumn";
import Container from "../layout/Containers/Container";

function Dashboard() {
  const numberOfTermInColumn = useLoaderData() as NumberOfTermInColumn[];
  return (
    <Container>
      <h1 className="py-6 text-xl font-extrabold text-blue-800 xl:text-2xl">
        Tableau de bord
      </h1>
      <ThematicTable numberOfTermInColumn={numberOfTermInColumn} />
    </Container>
  );
}

export default Dashboard;
