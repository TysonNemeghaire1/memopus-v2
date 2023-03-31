import React from "react";
import { useFetcher } from "react-router-dom";

interface Props {
  pid?: string
}

function InlineAddThematic({pid}: Props) {
  const fetcher = useFetcher();
  return (
    <fetcher.Form
      action="/thematics"
      method="post"
      className="flex gap-1 pb-1.5"
    >
      {pid && (
          <input type="hidden" value={pid} name="pid"/>
      )}
      <input
        name="name"
        placeholder="Nom du terme"
        className="w-full outline-1 outline outline-blue-800 rounded pl-1.5"
        type="text"
      />
      <button
        name="action"
        type="submit"
        value="add"
        className="py-1 px-2 text-blue-800 border border-blue-800 rounded"
      >
        Ajouter
      </button>
    </fetcher.Form>
  );
}

export default InlineAddThematic;
