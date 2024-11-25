import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import WeatherWidget from "../utils/WeatherWidget";
import { useState, useRef, useEffect } from "react";

const UserLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <div className="min-h-screen flex">
      <nav className="bg-[#05A8AA] text-white p-4 fixed top-0 w-full shadow-md z-10">
        <div className="pl-2 pr-7 mx-auto flex justify-between items-center">
          <Link to="/user" className="text-2xl font-bold">
            {user ? `${user.username}'s Dashboard` : "Dashboard"}
          </Link>

          {/* Hamburger pentru Mobile */}
          <button
            className="block md:hidden text-white focus:outline-none"
            onClick={toggleMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>

          <div className="flex space-x-10 justify-center items-center">
            <Link
              to="/signin"
              onClick={logout}
              className="text-white-500 font-semibold px-2 py-2 border-2 rounded-full shadow-lg transition-all duration-300 transform hover:bg-[#DC602E] hover:text-white hover:scale-105 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              Logout
            </Link>
          </div>
        </div>
      </nav>

      {/* Quick Access */}
      <aside
        className={`w-48 bg-gray-200 p-6 pt-10 fixed top-16 bottom-0 flex flex-col shadow-lg transition-all duration-300 md:block ${
          menuOpen ? "block" : "hidden"
        }`}
      >
        <h2 className="text-xl font-semibold mb-6 text-[#333]">Quick Access</h2>
        <ul className="space-y-4">
          <li>
            <Link
              to="/user/mytrips"
              className="w-full py-1 px-4 bg-[#05A8AA] text-white rounded-lg inline-flex items-center justify-center text-lg font-medium shadow-sm hover:bg-[#028C8E] transition duration-200"
              onClick={() => setMenuOpen(false)}
            >
              Trips
            </Link>
          </li>
          <li>
            <Link
              to="/user/members"
              className="w-full py-1 px-4 bg-[#05A8AA] text-white rounded-lg inline-flex items-center justify-center text-lg font-medium shadow-sm hover:bg-[#028C8E] transition duration-200"
              onClick={() => setMenuOpen(false)}
            >
              Discover
            </Link>
          </li>
          <li>
            <Link
              to="/user/group"
              className="w-full py-1 px-4 bg-[#05A8AA] text-white rounded-lg inline-flex items-center justify-center text-lg font-medium shadow-sm hover:bg-[#028C8E] transition duration-200"
              onClick={() => setMenuOpen(false)}
            >
              Groups
            </Link>
          </li>
        </ul>
        <div>
          <WeatherWidget className="h-[50px] w-full " />
        </div>
      </aside>

      {/* Content Area */}
      <div
        className={`w-full flex flex-col pt-16 overflow-y-auto transition-all duration-300 ${
          menuOpen ? "ml-[185px]" : "md:ml-[185px]"
        }`}
      >
        <div className="flex-grow p-6 bg-gray-100 rounded-t-lg shadow-inner">
          {children}
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
