import React from "react";
import { useFetcher, useLoaderData, useLocation } from "react-router-dom";
import Thematic from "../interfaces/Thematic";

// TODO Transition pendant la modification

function ThematicForm() {
  const fetcher = useFetcher();
  const thematics = useLoaderData() as Thematic[];
  const location = useLocation();
  const currentThematic: Thematic = location.state?.data;

  return (
    <div className="mx-auto h-full w-11/12 w-full sm:mt-8">
      <fetcher.Form
        key={currentThematic.id}
        className={"bg-white flex flex-col shadow-lg py-5 px-5"}
        method="post"
        action={`/thematics/${currentThematic.id}`}
      >
        <h1 className="mb-6 text-xl font-extrabold">
          {currentThematic
            ? `Modifier le thème ${currentThematic.name}`
            : "Ajouter une thématique"}
        </h1>
        <section className="flex flex-col gap-1">
          <label htmlFor="name" className="mb-0 text-lg font-semibold">
            Nom de la thématique
          </label>
          <input
            placeholder="Nom de la thématique"
            name="name"
            type="text"
            defaultValue={currentThematic ? currentThematic.name : undefined}
            className="w-fit rounded px-1 outline outline-1 outline-blue-800 py-1.5"
            id="name"
          />
        </section>
        <fieldset className="mt-10">
          <legend className="mb-5 text-lg font-bold">
            Parent de la thématique
          </legend>
          <ul className="grid grid-cols-1 gap-1 bg-gray-50 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <li className="rounded border border-blue-100 hover:border-blue-600">
              <label className="flex h-full justify-between px-8 py-2">
                Aucun
                <input
                  type="radio"
                  name="pid"
                  value="-1"
                  defaultChecked={!currentThematic.pid}
                />
              </label>
            </li>
            {thematics.flatMap((thematic) => {
              return thematic.id === currentThematic.id
                ? []
                : [
                    <li
                      key={thematic.id}
                      className="rounded border border-blue-100 hover:border-blue-600"
                    >
                      <label className="flex h-full justify-between px-8 py-2">
                        {thematic.name}
                        <input
                          type="radio"
                          name="pid"
                          value={thematic.id}
                          defaultChecked={thematic.id === currentThematic.pid}
                        />
                      </label>
                    </li>,
                  ];
            })}
          </ul>
        </fieldset>
        <button
          type="submit"
          name="action"
          value="edit"
          className="mt-8 rounded-lg bg-blue-800 py-2 text-white"
        >
          {currentThematic ? "Modifier" : "Ajouter"}
        </button>
      </fetcher.Form>
    </div>
  );
}

export default ThematicForm;
