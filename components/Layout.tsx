import React, { ReactNode } from "react";
import Header from "./Header";

interface props {
  children?: ReactNode;
}

export default function Layout({ children }: props) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
