import React from "react";
import { Wrapper } from "./Wrapper";
import { Navbar } from "./Navbar";
interface LayoutProps {}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="all2">
      <Navbar />
      <>{children}</>
    </div>
  );
};
