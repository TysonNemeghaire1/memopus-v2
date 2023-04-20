import React, { PropsWithChildren } from "react";

function CardContainer({ children }: PropsWithChildren) {
  return <div className="bg-white px-5 py-5 shadow-lg space-y-6">{children}</div>;
}

export default CardContainer;
