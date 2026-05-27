import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faHouse,
  faClipboardList,
  faCalendarCheck,
  faHistory,
  faUserPlus,
  faUsers,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

function Navbar2() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    localStorage.removeItem("contact");
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <div className="bg-gray-300 shadow-md py-2">

      {/* Navigation Menu */}
      <div className="flex justify-center gap-2 flex-wrap">

        {/* Home */}
        <NavLink
          to="/admin-dashboard"
          className={({ isActive }) =>
            `w-12 sm:w-32 h-10 flex items-center justify-center gap-1 rounded-lg text-sm font-semibold transition-all duration-300
            ${
              isActive
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-800 hover:bg-indigo-100"
            }`
          }
        >
          <FontAwesomeIcon icon={faHouse} />

          <span className="hidden sm:inline">
            Home
          </span>
        </NavLink>

        {/* Enroll */}
        <NavLink
          to="/form"
          className={({ isActive }) =>
            `w-12 sm:w-32 h-10 flex items-center justify-center gap-1 rounded-lg text-sm font-semibold transition-all duration-300
            ${
              isActive
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-800 hover:bg-blue-100"
            }`
          }
        >
          <FontAwesomeIcon icon={faUserPlus} />

          <span className="hidden sm:inline">
            Enroll
          </span>
        </NavLink>

        {/* Duty Assign */}
        <NavLink
          to="/assign"
          className={({ isActive }) =>
            `w-12 sm:w-32 h-10 flex items-center justify-center gap-1 rounded-lg text-sm font-semibold transition-all duration-300
            ${
              isActive
                ? "bg-green-600 text-white"
                : "bg-white text-gray-800 hover:bg-green-100"
            }`
          }
        >
          <FontAwesomeIcon icon={faClipboardList} />

          <span className="hidden sm:inline">
            Duty Assign
          </span>
        </NavLink>

        {/* Leave */}
        <NavLink
          to="/leave"
          className={({ isActive }) =>
            `w-12 sm:w-32 h-10 flex items-center justify-center gap-1 rounded-lg text-sm font-semibold transition-all duration-300
            ${
              isActive
                ? "bg-yellow-500 text-white"
                : "bg-white text-gray-800 hover:bg-yellow-100"
            }`
          }
        >
          <FontAwesomeIcon icon={faCalendarCheck} />

          <span className="hidden sm:inline">
            Leave
          </span>
        </NavLink>

        {/* Record */}
        <NavLink
          to="/record"
          className={({ isActive }) =>
            `w-12 sm:w-32 h-10 flex items-center justify-center gap-1 rounded-lg text-sm font-semibold transition-all duration-300
            ${
              isActive
                ? "bg-purple-600 text-white"
                : "bg-white text-gray-800 hover:bg-purple-100"
            }`
          }
        >
          <FontAwesomeIcon icon={faHistory} />

          <span className="hidden sm:inline">
            Record
          </span>
        </NavLink>

        {/* Suspend */}
        <NavLink
          to="/guards/suspend"
          className={({ isActive }) =>
            `w-12 sm:w-32 h-10 flex items-center justify-center gap-1 rounded-lg text-sm font-semibold transition-all duration-300
            ${
              isActive
                ? "bg-red-600 text-white"
                : "bg-white text-gray-800 hover:bg-red-100"
            }`
          }
        >
          <FontAwesomeIcon icon={faUsers} />

          <span className="hidden sm:inline">
            Suspend
          </span>
        </NavLink>

        <button
          onClick={handleLogout}
          className="h-10 px-4 flex items-center justify-center gap-2 rounded-lg text-sm font-semibold bg-white text-gray-800 hover:bg-black hover:text-white transition-all duration-300"
        >
          <FontAwesomeIcon icon={faRightFromBracket} />
          <span className="hidden sm:inline">Log Out</span>
        </button>

      </div>
    </div>
  );
}

export default Navbar2;
