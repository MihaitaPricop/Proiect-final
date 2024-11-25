import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <header className="bg-[#05A8AA] w-full h-[82px] opacity-100 py-4 px-4 flex justify-center items-center">
      <div className="container flex items-center justify-between">
        <div className="flex items-center">
          <Link
            to="/about"
            className="text-white tracking-[-0.05em] text-[32px] md:text-[40px] font-bold leading-[1.4] mx-[20px] p-0"
          >
            SalvAmicii
          </Link>
        </div>

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
              strokeWidth={2}
              d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        <nav
          className={`absolute md:static z-50 top-[82px] left-0 w-full md:w-auto md:flex flex-col md:flex-row items-center bg-[#05A8AA] md:bg-transparent transition-all duration-300 ${
            menuOpen ? "block" : "hidden"
          }`}
        >
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-5 p-4 md:p-0">
            <Link
              to="/"
              className="text-black hover:text-white cursor-pointer tracking-[-0.02em] text-[14px] leading-[1.4] font-bold"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-black hover:text-white cursor-pointer tracking-[-0.02em] text-[14px] leading-[1.4] font-bold"
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
          </div>
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-3 p-4 md:p-0 ml-5">
            <Link
              to="/signin"
              className="text-white-500 font-semibold px-2 py-2   rounded-full shadow-lg transition-all duration-300 transform hover:bg-[#DC602E] hover:text-white hover:scale-105 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              onClick={() => setMenuOpen(false)}
            >
              Sign in
            </Link>
            {/* Uncomment if you want a "Sign up" button */}
            {/* <Link
              to="/signup"
              className="bg-[#eb691f] text-white rounded-[8px] p-2 px-4 flex items-center cursor-pointer hover:bg-[#d85a13] transition duration-300"
              onClick={() => setMenuOpen(false)} // Close menu on link click
            >
              Sign up
            </Link> */}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
