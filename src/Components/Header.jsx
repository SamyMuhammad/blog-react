import React, { useState } from "react";
import { Link } from "react-router-dom";
import ApiConfig from "../Services/ApiConfig";
import BlogIcon from "./../assets/blog-icon.png";

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
    <nav className="font-normal relative flex flex-wrap items-center justify-between px-2 py-3 bg-indigo-800 bg-opacity-90 border-b-2 border-white">
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-auto static flex items-center justify-start">
          <Link
            to="/"
            className="text-xl font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap  text-white"
          >
            <img src={BlogIcon} alt="Simple Blog" className="h-8" />
          </Link>

          {isLoggedIn ? (
            <ul className="flex flex-row list-none ml-auto text-sm leading-6">
              <li className="nav-item">
                <Link
                  to="/my-articles"
                  className="px-3 py-2 flex items-center font-bold  leading-snug text-white hover:opacity-75"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                    />
                  </svg>
                  My Articles
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  // onClick={handleLogout}
                  to="/article/create"
                  className="px-3 py-2 flex items-center font-bold rounded leading-snug text-white hover:opacity-75"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Add Article
                </Link>
              </li>
            </ul>
          ) : (
            ""
          )}
        </div>
        <div className="flex flex-grow items-center" id="example-navbar-danger">
          {!isLoggedIn ? (
            <ul className="flex flex-row list-none ml-auto">
              <li className="nav-item">
                <Link
                  className="px-3 py-2 flex items-center font-bold  leading-snug text-white hover:opacity-75"
                  to="/login"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                    />
                  </svg>
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="px-3 py-2 flex items-center font-bold  leading-snug text-white hover:opacity-75"
                  to="/register"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                    />
                  </svg>
                  Register
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="flex flex-row list-none ml-auto text-sm leading-6">
              <li className="nav-item">
                <a
                  onClick={handleLogout}
                  href="#"
                  className="px-3 py-2 flex items-center font-bold  leading-snug text-white hover:opacity-75"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-5"
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
