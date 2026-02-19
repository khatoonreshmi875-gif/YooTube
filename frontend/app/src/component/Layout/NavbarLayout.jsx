import { Outlet } from "react-router-dom";
import Navbar from "../Navigation/navbar/page/Navbar";
import Sidebar from "../Navigation/sidebar/Sidebar";

const NavbarLayout = () => {
  const token = localStorage.getItem("token");

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col w-screen">
      <div className="h-14">{token && <Navbar />}</div>

      <div className="flex flex-row flex-1 w-full">
        {token && (
          <div className="hidden xs:block xs:w-20">
            <Sidebar />
          </div>
        )}
        <main className="flex-1 sm:mb-0 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {token && (
        <div className="ss:hidden fixed bottom-0 w-full h-12 bg-slate-50">
          <Sidebar />
        </div>
      )}
    </div>
  );
};

export default NavbarLayout;

