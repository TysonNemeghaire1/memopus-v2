import React, { useState } from "react";
import { IoAddCircle, IoRemoveCircle } from "react-icons/io5";
import { AiFillEdit } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
import { useFetcher } from "react-router-dom";
import { BiDotsVerticalRounded } from "react-icons/bi";

interface Props {
  ids: { id: string; pid?: number };
  showForm: { value: boolean; toggle: () => void };
  hasChildren: boolean;
}

function ActionButtonGroup({ hasChildren, ids, showForm }: Props) {
  const fetcher = useFetcher();
  const [show, setShow] = useState(false);
  return (
    <>
      <button
        onClick={(event) => {
          event.stopPropagation();
          setShow(!show);
        }}
        className="text-black hover:text-2xl hover:text-blue-900"
      >
        <BiDotsVerticalRounded />
      </button>
      <div
        className={`inline-flex items-center gap-0.5 ${
          show ? "max-w-2xl" : "max-w-0"
        } overflow-hidden transition-all duration-500`}
      >
        <button
          title="Ajouter une thématique"
          className="rounded text-blue-600 p-0.5 hover:bg-blue-600 hover:text-white"
          onClick={showForm.toggle}
        >
            {showForm.value ? <IoRemoveCircle className="text-xl"/> : <IoAddCircle className="text-xl"/>}
        </button>

        <button
          title="Modifier la thématique"
          className="rounded p-1 text-green-600 hover:bg-green-200"
        >
          <AiFillEdit />
        </button>

        {!hasChildren && (
          <fetcher.Form action={`/thematics/${ids.id}`} method="delete">
            <button
              title="Supprimer la thématique"
              name="action"
              value="delete"
              className="rounded p-1 text-red-600 hover:bg-red-200"
            >
              <FaTrashAlt />
            </button>
          </fetcher.Form>
        )}
      </div>
    </>
  );
}

export default ActionButtonGroup;
