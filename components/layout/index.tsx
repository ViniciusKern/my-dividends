import React, { ReactNode } from "react";

import AppHeader from "./header";
import AppFooter from "./footer";

function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <AppHeader />
      <main className="px-6 pb-6 pt-2">{children}</main>
      <AppFooter />
    </>
  );
}

export default Layout;
