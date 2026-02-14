import { Outlet } from "react-router-dom";
import Navbar from "../Navigation/navbar/page/Navbar";
import Sidebar from "../Navigation/sidebar/Sidebar";

const NavbarLayout = () => {
  const token = localStorage.getItem("token");

  return (
    <div className="bg-gradient-to-bl from-slate-950 to-slate-900 min-h-screen flex flex-col ">
      <div className="h-24">
        {token && (
          <div className=" fixed top-0 z-50">
            <Navbar />
          </div>
        )}
      </div>

      <div className="flex flex-row flex-1 ">
        {token && (
          <div className="hidden fixed    xs:w-16 ss:block z-50 ">
            <Sidebar />
          </div>
        )}
        <main className="flex-1 ss:ml-16 sm:mb-0 ">
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
