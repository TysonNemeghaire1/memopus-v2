import React, {PropsWithChildren} from "react";

function Container({ children }: PropsWithChildren) {
  return (
      <div className="mx-auto min-h-screen w-11/12 py-8 space-y-6">
        {children}
      </div>
  );
}

export default Container;
