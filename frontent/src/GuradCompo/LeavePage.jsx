import React, { useState } from "react";
import { api, getAuthHeader } from "../services/api";

function LeavePage() {
  const [reason, setReason] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    leaveDays: "",
    medicalFile: "",
    startDate: "",
  });

  const getTodayString = () => {
    const t = new Date();
    const yyyy = t.getFullYear();
    const mm = String(t.getMonth() + 1).padStart(2, "0");
    const dd = String(t.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.leaveDays || !reason) {
      alert("Please fill all required fields");
      return;
    }

    // Validate start date if provided
    const todayStr = getTodayString();
    if (!formData.startDate) {
      alert("Please select a start date for the leave");
      return;
    }

    const selected = new Date(formData.startDate);
    const today = new Date(todayStr);
    if (selected < today) {
      alert("Start date cannot be earlier than today");
      return;
    }

    try {
      const response = await api.post(
        "/leaves",
        {
          guardContact: localStorage.getItem("contact"),
          firstName: formData.firstName,
          lastName: formData.lastName,
          leaveDays: Number(formData.leaveDays),
          reason,
          medicalFile: formData.medicalFile,
          startDate: formData.startDate,
        },
        {
          headers: getAuthHeader(),
        }
      );

      alert(response.data.message || "Leave submitted successfully");
      setReason("");
      setFormData({
        firstName: "",
        lastName: "",
            leaveDays: "",
            medicalFile: "",
            startDate: "",
      });
    } catch (err) {
      alert(err.response?.data?.message || "Failed to submit leave");
    }
  };

  // load guard's leaves and show current month's leaves
  const [myLeaves, setMyLeaves] = React.useState([]);

  React.useEffect(() => {
    const loadMyLeaves = async () => {
      try {
        const response = await api.get("/leaves", { headers: getAuthHeader() });
        const all = response.data.leaves || [];
        const contact = localStorage.getItem("contact");
        const now = new Date();
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        monthStart.setHours(0,0,0,0);
        const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        monthEnd.setHours(23,59,59,999);

        const currentMonth = all.filter((l) => l.guardContact === contact && l.startDate && l.endDate && (new Date(l.endDate) >= monthStart && new Date(l.startDate) <= monthEnd));

        setMyLeaves(currentMonth);
      } catch (err) {
        setMyLeaves([]);
      }
    };

    loadMyLeaves();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">

      <div className="bg-white shadow-lg rounded-2xl w-full max-w-2xl p-8">

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Apply Leave
        </h1>

        <form className="space-y-6" onSubmit={handleSubmit}>

          {/* First Name */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              First Name
            </label>

            <input
              type="text"
              placeholder="Enter first name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
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
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Start Date</label>

            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              min={getTodayString()}
              onChange={handleChange}
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
              name="leaveDays"
              value={formData.leaveDays}
              onChange={handleChange}
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
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  setFormData((prev) => ({
                    ...prev,
                    medicalFile: file ? file.name : "",
                  }));
                }}
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
      {/* My Leaves This Month */}
      <div className="max-w-2xl mx-auto mt-8 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">My Leaves This Month</h2>
        {myLeaves.length === 0 ? (
          <p className="text-gray-600">No leaves for this month.</p>
        ) : (
          <div className="space-y-3">
            {myLeaves.map((l) => (
              <div key={l.id} className="border rounded p-3">
                <div className="font-semibold">{l.employeeName}</div>
                <div className="text-sm text-gray-600">{new Date(l.startDate).toLocaleDateString()} - {new Date(l.endDate).toLocaleDateString()}</div>
                <div className="text-sm">Days: {l.leaveDays} • {l.leaveType}</div>
                <div className="text-sm">Status: {l.status}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default LeavePage;
