import React from "react";

function Header() {
  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-indigo-700">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-auto static block justify-start">
            <a
              className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
              href="#"
            >
              Simple Blog
            </a>
          </div>
          <div
            className="flex flex-grow items-center"
            id="example-navbar-danger"
          >
            <ul className="flex flex-row list-none ml-auto">
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  href="#"
                >
                  <i className="fab fa-twitter text-lg leading-lg text-white opacity-75"></i><span className="ml-2">Login</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  href="#"
                >
                  <i className="fab fa-pinterest text-lg leading-lg text-white opacity-75"></i><span className="ml-2">Register</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
