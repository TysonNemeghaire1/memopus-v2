import React from "react";

interface Props {
    name: string,
    id: string
}

export default function NavButton({name}: Props) {
    return <li className="p-2.5 hover:bg-blue-100">{name} </li>;
};