import React from "react";
import { useNavigate } from "react-router-dom";
import { api, getAuthHeader } from "../services/api";

function GuardDashboard() {
  const navigate = useNavigate();
  const [duties, setDuties] = React.useState([]);
  const [fullName, setFullName] = React.useState("");

  React.useEffect(() => {
    const loadDuties = async () => {
      try {
        const guardContact = localStorage.getItem("contact");

        if (!guardContact) {
          setDuties([]);
          return;
        }

        const response = await api.get(
          `/duties/guard/${guardContact}`,
          {
            headers: getAuthHeader(),
          }
        );

        // show only duties for the current month
        const duties = response.data.duties || [];
        const now = new Date();
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        monthStart.setHours(0,0,0,0);
        const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        monthEnd.setHours(23,59,59,999);

        const currentMonthDuties = duties.filter((d) => {
          const dt = new Date(d.dutyDate || d.createdAt);
          return dt >= monthStart && dt <= monthEnd;
        });

        setDuties(currentMonthDuties);
      } catch (err) {
        setDuties([]);
      }
    };

    loadDuties();
    // load stored full name (set at login)
    setFullName(localStorage.getItem("name") || "");
  }, []);

  const nextDuty = duties[0];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    localStorage.removeItem("contact");
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">

      {/* Top Welcome Section */}
      <div className="bg-white shadow-md rounded-2xl p-6 mb-6 flex flex-col md:flex-row justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            {fullName ? `Hi ${fullName} 👮` : "Hii Guard 👮"}
          </h1>
          <p className="text-gray-500 mt-2">
            Welcome to your dashboard
          </p>
        </div>

        <div className="mt-4 md:mt-0 flex gap-3">
          <button onClick={() => navigate("/guard-leave")} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition">
            Apply Leave
          </button>
          <button onClick={handleLogout} className="bg-white hover:bg-black hover:text-white text-gray-800 px-6 py-3 rounded-xl font-semibold transition border border-gray-200">
            Log Out
          </button>
        </div>
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
              {nextDuty?.locationName || "No duty assigned"}
            </p>

            <p className="mt-2 text-sm">
              Time: {nextDuty?.shift || "8:00 AM - 4:00 PM"}
            </p>
          </div>
        </div>

        {/* Duty Records */}
        <div className="bg-white shadow-md rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Duty Records
          </h2>

          <div className="space-y-4">

            {duties.slice(0, 3).map((duty) => (
              <div key={duty._id} className="border rounded-xl p-4 hover:bg-gray-50 transition">
                <p className="font-semibold text-gray-700">
                  {duty.locationName}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(duty.dutyDate).toLocaleDateString()} | {duty.status === "completed" ? "Completed" : "Assigned"}
                </p>
              </div>
            ))}

            {duties.length === 0 && (
              <div className="border rounded-xl p-4 text-gray-500">
                No duty records available
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}

export default GuardDashboard;
