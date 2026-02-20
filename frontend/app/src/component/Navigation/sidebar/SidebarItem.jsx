import { NavLink } from "react-router-dom";

const SidebarItem = ({ itemName, path, Icon, onClick }) => {
  return (
    <NavLink
      to={path}
      onClick={onClick}
      aria-label={itemName}
      className={({ isActive }) =>
        ` ${
          isActive ? "underline text-slate-600 " : "text-blue-700 "
        }`
      }
    >
      <div
        className="sm:w-16 xs:w-14  w-7 aspect-square 
                   rounded-lg bg-white border border-slate-200 
                   flex flex-col items-center justify-center 
                   text-slate-600 sm:text-sm  shadow-sm hover:shadow-md 
                   hover:border-blue-400 hover:text-blue-600 active:border:blue-400 active:text-blue-600
                   transition-transform duration-200 hover:scale-105 my-1 hover:bg-slate-100 active:shadow-transparent "
      >
        <Icon className=" sm:w-7 w-5 aspect-square " />
        <span className="text-xs font-medium hidden xs:block">{itemName}</span>
      </div>
      <span className="text-[9px] font-medium text-gray-700 xs:hidden block mt-1 text-center">
        {itemName}
      </span>
    </NavLink>
  );
};

export default SidebarItem;
