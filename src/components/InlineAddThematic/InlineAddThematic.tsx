import React from "react";
import { useFetcher } from "react-router-dom";

interface Props {
  pid?: string;
}

function InlineAddThematic({ pid }: Props) {
  const fetcher = useFetcher();
  return (
    <fetcher.Form
      action="/thematics"
      method="post"
      className="flex gap-1 py-1.5"
    >
      {pid && <input type="hidden" value={pid} name="pid" />}
      <input
        name="name"
        placeholder="Nom du terme"
        className="w-full rounded outline outline-1 outline-blue-800 pl-1.5"
        type="text"
      />
      <button
        name="action"
        type="submit"
        value="add"
        className="rounded border border-blue-800 px-2 py-1 text-blue-800"
      >
        Ajouter
      </button>
    </fetcher.Form>
  );
}

export default InlineAddThematic;
