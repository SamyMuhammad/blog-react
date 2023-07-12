import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <nav className="font-mono relative flex flex-wrap items-center justify-between px-2 py-3 bg-indigo-800 bg-opacity-90 border-b-2 border-white">
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-auto static block justify-start">
          <Link
            to="/"
            className="text-xl font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
          >
            Simple Blog
          </Link>
        </div>
        <div className="flex flex-grow items-center" id="example-navbar-danger">
          <ul className="flex flex-row list-none ml-auto">
            <li className="nav-item">
              <Link
                className="px-3 py-2 flex items-center font-bold uppercase leading-snug text-white hover:opacity-75"
                to="/login"
              >
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="px-3 py-2 flex items-center font-bold uppercase leading-snug text-white hover:opacity-75"
                to="/register"
              >
                Register
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
