import React, { PropsWithChildren } from "react";

function CardContainer({ children }: PropsWithChildren) {
  return <div className="mx-auto h-full w-11/12 sm:my-8">{children}</div>;
}

export default CardContainer;
