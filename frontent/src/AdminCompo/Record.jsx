import React from "react";
import { api, getAuthHeader } from "../services/api";

function DutyRecords() {
  const [records, setRecords] = React.useState([]);

  React.useEffect(() => {
    const loadRecords = async () => {
      try {
        const response = await api.get("/duties", {
          headers: getAuthHeader(),
        });

        // filter to current week (Monday - Sunday)
        const duties = response.data.duties || [];
        const now = new Date();
        const day = now.getDay(); // 0 (Sun) - 6 (Sat)
        const diffToMonday = (day + 6) % 7; // days since Monday
        const weekStart = new Date(now);
        weekStart.setDate(now.getDate() - diffToMonday);
        weekStart.setHours(0,0,0,0);
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        weekEnd.setHours(23,59,59,999);

        const currentWeek = duties.filter((d) => {
          const dt = new Date(d.dutyDate || d.createdAt);
          return dt >= weekStart && dt <= weekEnd;
        });

        setRecords(currentWeek);
      } catch (err) {
        setRecords([]);
      }
    };

    loadRecords();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <h1 className="text-3xl font-bold text-slate-800 text-center mb-8">
        Duty Records
      </h1>

      <div className="max-w-4xl mx-auto space-y-4">
        {records.map((record) => {
          const guardName = `${record.guard?.firstName || ""} ${record.guard?.lastName || ""}`.trim();

          return (
            <div
              key={record._id}
              className="bg-white rounded-lg shadow-lg p-5"
            >
              <h2 className="text-xl font-bold text-gray-800">
                {guardName || record.guard?.contact || "Unknown Guard"}
              </h2>

              <p className="text-gray-600 mt-1">
                Contact: {record.guard?.contact || "N/A"}
              </p>

              <p className="text-gray-600">
                Location: {record.locationName}
              </p>

              <p className="text-gray-600">
                Shift: {record.shift || "8:00 AM - 4:00 PM"}
              </p>

              <p className="text-gray-600">
                Date: {new Date(record.dutyDate).toLocaleDateString()}
              </p>

              <p className="text-gray-600">
                Status: {record.status === "completed" ? "Completed" : "Assigned"}
              </p>
            </div>
          );
        })}

        {records.length === 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6 text-center text-gray-600">
            No duty records found.
          </div>
        )}
      </div>
    </div>
  );
}

export default DutyRecords;
