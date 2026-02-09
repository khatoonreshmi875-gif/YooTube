import { NavLink } from 'react-router-dom'

const SidebarItem = ({itemName,path,Icon,onClick}) => {
  return (
    <NavLink to={path} onClick={onClick} aria-label={itemName}>
      <div className="sm:w-16 sm:h-16 xs:w-14 xs:h-14  w-9 h-9 rounded-full  bg-gradient-to-tr from-cyan-950 via-black to-cyan-950   hover:from-black hover:via-cyan-950 hover:to-black  text-white text-sm flex flex-col items-center justify-center  shadow-md shadow-blue-200 active:shadow-black hover:border-white hover:border-2 hover:scale-105 duration-300 hover:opacity-70 my-1">
        <Icon className="sm:h-7 sm:w-7 w-5 h-5" />
        <span className="text-xs font-serif hidden xs:block">{itemName}</span>
      </div>
      <span className="text-xs font-serif text-white xs:hidden block">{itemName}</span>
    </NavLink>
  );
}

export default SidebarItem
