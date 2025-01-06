import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-center flex-1 items-center py-8">
      {children}
    </div>
  );
};

export default layout;
