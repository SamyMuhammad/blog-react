import React, { useState } from "react";
import { Link } from "react-router-dom";
import ApiConfig from "../Services/ApiConfig";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem("token"))
  );
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const handleLogout = (e) => {
    e.preventDefault();
    ApiConfig.logout()
      .then(function () {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setIsLoggedIn(false);
      })
      .catch(function (error) {
        if (error.response.status === 401) {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
        } else {
          console.log(error);
        }
      })
      .finally(function () {});
  };

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
          {!isLoggedIn ? (
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
          ) : (
            <ul className="flex flex-row list-none ml-auto">
              <li className="nav-item">
                <a
                  // onClick={handleLogout}
                  href="#"
                  className="px-3 py-2 flex items-center font-bold uppercase leading-snug text-white hover:opacity-75"
                >
                  My Articles
                </a>
              </li>
              <li className="nav-item">
                <a
                  onClick={handleLogout}
                  href="#"
                  className="px-3 py-2 flex items-center font-bold uppercase leading-snug text-white hover:opacity-75"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                    />
                  </svg> 
                  Logout
                </a>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
