"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const RouteProgressBar = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <ProgressBar
        height="4px"
        color="#6ee7b7"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
};

export default RouteProgressBar;
