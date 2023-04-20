import React from "react";
import {useLoaderData, useLocation} from "react-router-dom";
import Container from "../layout/Containers/Container";
import Column from "../components/Column/Column";
import ColumnInterface from "../interfaces/Column";

function ThematicColumns() {
    const columns = useLoaderData() as ColumnInterface[];
    const location = useLocation();
    return (
        <Container>
            <h1 className="text-xl font-extrabold text-blue-800 xl:text-2xl">
                Tableau {location.state.thematicName}{" "}
                {location?.state?.userName ? `de ${location.state.userName}` : null}
            </h1>
            <div
                className="grid grid-cols-[repeat(4,100%)] md:grid-cols-[repeat(4,calc(50%-0.75rem))] lg:grid-cols-[repeat(4,calc(33%-12px)] 2xl:grid-cols-4 gap-3 overflow-x-auto snap-x">
                {columns.map((column, index) => (
                    <Column key={column.id} data={column} index={index}/>
                ))}
            </div>
        </Container>
  );
}

export default ThematicColumns;
