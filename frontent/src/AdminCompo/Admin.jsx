import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faClipboardList,
  faCalendarCheck,
  faHistory,
  faUsers,
  faUserCheck,
} from "@fortawesome/free-solid-svg-icons";

function Admin() {
  return (
    <div className="min-h-screen bg-slate-100 p-6">

      {/* Heading */}
      <h1 className="text-4xl font-bold text-center text-slate-800">
        Admin Dashboard
      </h1>

      <p className="text-center text-slate-500 mt-2 mb-10">
        University Security Management System
      </p>

      {/* Stats */}
      <div className="flex flex-col sm:flex-row justify-center gap-6 mb-10">

        {/* Total Guards */}
        <div className="bg-white p-6 rounded-2xl shadow-md flex items-center gap-4 w-full sm:w-96 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
          <FontAwesomeIcon
            icon={faUsers}
            className="text-3xl text-blue-600"
          />

          <div>
            <p className="text-slate-500">Total Guards</p>
            <h2 className="text-3xl font-bold">120</h2>
          </div>
        </div>

        {/* Active Today */}
        <div className="bg-white p-6 rounded-2xl shadow-md flex items-center gap-4 w-full sm:w-96 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
          <FontAwesomeIcon
            icon={faUserCheck}
            className="text-3xl text-green-600"
          />

          <div>
            <p className="text-slate-500">Active Today</p>
            <h2 className="text-3xl font-bold">85</h2>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="flex flex-wrap justify-center gap-6">

        {/* Card 1 */}
        <div className="bg-white p-6 rounded-2xl shadow-md w-96 text-center hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
          <FontAwesomeIcon
            icon={faUserPlus}
            className="text-3xl text-blue-600 mb-4"
          />

          <h2 className="text-2xl font-bold mb-2">
            Enroll
          </h2>

          <p className="text-slate-500 mb-6">
            Add new security guards.
          </p>
          <Link to ="/form">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Open Portal
          </button>
          </Link>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-6 rounded-2xl shadow-md w-96 text-center hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
          <FontAwesomeIcon
            icon={faClipboardList}
            className="text-3xl text-green-600 mb-4"
          />

          <h2 className="text-2xl font-bold mb-2">
            Duties
          </h2>

          <p className="text-slate-500 mb-6">
            Assign shifts and locations.
          </p>
          <Link to ="/assign">
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
            Set Shift
          </button>
          </Link>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-6 rounded-2xl shadow-md w-96 text-center hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
          <FontAwesomeIcon
            icon={faCalendarCheck}
            className="text-3xl text-yellow-500 mb-4"
          />

          <h2 className="text-2xl font-bold mb-2">
            Leaves
          </h2>

          <p className="text-slate-500 mb-6">
            Approve leave requests.
          </p>
      <Link to ="/leave">
          <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600">
            Manage
          </button>
      </Link>
        </div>

        {/* Card 4 */}
        <div className="bg-white p-6 rounded-2xl shadow-md w-96 text-center hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
          <FontAwesomeIcon
            icon={faHistory}
            className="text-3xl text-purple-600 mb-4"
          />

          <h2 className="text-2xl font-bold mb-2">
            History
          </h2>

          <p className="text-slate-500 mb-6">
            View past duty records.
          </p>

          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
            View
          </button>
        </div>

      </div>
    </div>
  );
}

export default Admin;