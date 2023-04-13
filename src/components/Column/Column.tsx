import React from "react";
import { useLoaderData } from "react-router-dom";

function Column() {
  const columns = useLoaderData();
  console.log(columns);
  return <div>column</div>;
}

export default Column;
