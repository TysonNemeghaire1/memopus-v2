import React, { PropsWithChildren } from "react";

function Container({ children }: PropsWithChildren) {
  return <div className="mx-auto h-full w-11/12">{children}</div>;
}

export default Container;
