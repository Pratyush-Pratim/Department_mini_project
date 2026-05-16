import React, { useState } from "react";

function LeavePage() {
  const [reason, setReason] = useState("");

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">

      <div className="bg-white shadow-lg rounded-2xl w-full max-w-2xl p-8">

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Apply Leave
        </h1>

        <form className="space-y-6">

          {/* First Name */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              First Name
            </label>

            <input
              type="text"
              placeholder="Enter first name"
              className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Last Name
            </label>

            <input
              type="text"
              placeholder="Enter last name"
              className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Number of Days */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Number of Days
            </label>

            <input
              type="number"
              placeholder="Enter number of leave days"
              className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Reason */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Reason
            </label>

            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Reason</option>
              <option value="Medical">Medical</option>
              <option value="Personal">Personal</option>
              <option value="Emergency">Emergency</option>
              <option value="Vacation">Vacation</option>
            </select>
          </div>

          {/* Medical File Upload */}
          {reason === "Medical" && (
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Upload Medical File
              </label>

              <input
                type="file"
                className="w-full border border-gray-300 rounded-xl p-3"
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition"
          >
            Submit Leave Request
          </button>

        </form>
      </div>
    </div>
  );
}

export default LeavePage;