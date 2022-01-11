import React from "react";
import { Navbar_Dash } from "./Navbar_Dash";
interface Layout_DashProps {}

export const Layout_Dash: React.FC<Layout_DashProps> = ({ children }) => {
  return (
    <div className="all">
      <Navbar_Dash />
      <>{children}</>
    </div>
  );
};
