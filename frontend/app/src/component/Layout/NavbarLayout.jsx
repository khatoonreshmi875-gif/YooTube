import React from "react";
import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { AppContext } from "../utils/contextApi";
import Sidebar from "../Navigation/sidebar/Sidebar";
import Navbar from "../Navigation/navbar/page/Navbar";

const NavbarLayout = () => {
  const token = localStorage.getItem("token");

  return (
    <div className="bg-gradient-to-bl from-slate-950 to-slate-900 min-h-screen relative flex flex-col">
      {token && (
        <div className="h-24 fixed top-0 z-50">
          <Navbar />
        </div>
      )}

      <div className="ss:flex  ss:flex-row  ">
        {token && (
          <div className="hidden fixed    xs:w-16 ss:block z-50 pt-24">
            <Sidebar />
          </div>
        )}
        <main className="flex-1 ss:ml-16 sm:mb-0     min-h-screen ">
          <Outlet />
        </main>
      </div>
      {token && (
        <div className="ss:hidden fixed bottom-0 w-full h-16 bg-slate-900 ">
          <Sidebar />
        </div>
      )}
    </div>
  );
};

export default NavbarLayout;
{
  /* {token && (
          <div className="hidden fixed    xs:w-16 ss:block z-50 ">
            <Sidebar />
          </div>
        )} */
}
{
  /* {token && (
        <div className="ss:hidden fixed bottom-0 w-full h-16 bg-slate-900 ">
          <Sidebar />
        </div>
      )} */
}
