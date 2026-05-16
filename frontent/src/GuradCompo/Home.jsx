import React from "react";

function GuardDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">

      {/* Top Welcome Section */}
      <div className="bg-white shadow-md rounded-2xl p-6 mb-6 flex flex-col md:flex-row justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Hii Guard 👮
          </h1>
          <p className="text-gray-500 mt-2">
            Welcome to your dashboard
          </p>
        </div>

        <button className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition">
          Apply Leave
        </button>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Next Duty Location */}
        <div className="bg-white shadow-md rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Next Duty Location
          </h2>

          <div className="bg-blue-100 text-blue-800 p-5 rounded-xl">
            <p className="text-lg font-semibold">
              Main Gate - Block A
            </p>

            <p className="mt-2 text-sm">
              Time: 8:00 AM - 4:00 PM
            </p>
          </div>
        </div>

        {/* Duty Records */}
        <div className="bg-white shadow-md rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Duty Records
          </h2>

          <div className="space-y-4">

            <div className="border rounded-xl p-4 hover:bg-gray-50 transition">
              <p className="font-semibold text-gray-700">
                Library Area
              </p>
              <p className="text-sm text-gray-500">
                14 May 2026 | Completed
              </p>
            </div>

            <div className="border rounded-xl p-4 hover:bg-gray-50 transition">
              <p className="font-semibold text-gray-700">
                Hostel Gate
              </p>
              <p className="text-sm text-gray-500">
                13 May 2026 | Completed
              </p>
            </div>

            <div className="border rounded-xl p-4 hover:bg-gray-50 transition">
              <p className="font-semibold text-gray-700">
                Parking Area
              </p>
              <p className="text-sm text-gray-500">
                12 May 2026 | Completed
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default GuardDashboard;