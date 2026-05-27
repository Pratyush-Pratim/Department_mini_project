import React from "react";
import { api, getAuthHeader } from "../services/api";

function ActiveGuards() {
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/guards/active", { headers: getAuthHeader() });
        setItems(res.data.guards || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load active guards");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) return <div className="p-6">Loading active guards...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="p-6 min-h-screen bg-slate-100">
      <h1 className="text-2xl font-bold mb-4">Active Guards</h1>

      <div className="bg-white rounded-lg shadow overflow-auto">
        <table className="w-full table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-3">#</th>
              <th className="text-left px-4 py-3">Name</th>
              <th className="text-left px-4 py-3">Contact</th>
              <th className="text-left px-4 py-3">Location</th>
              <th className="text-left px-4 py-3">Shift</th>
              <th className="text-left px-4 py-3">Duty Date</th>
            </tr>
          </thead>

          <tbody>
            {items.map((it, idx) => (
              <tr key={it.duty?.id || (it.guard && it.guard._id) || idx} className="border-t">
                <td className="px-4 py-3">{idx + 1}</td>
                <td className="px-4 py-3">{it.guard?.firstName} {it.guard?.lastName}</td>
                <td className="px-4 py-3">{it.guard?.contact}</td>
                <td className="px-4 py-3">{it.duty?.locationName || "-"}</td>
                <td className="px-4 py-3">{it.duty?.shift || "-"}</td>
                <td className="px-4 py-3">{it.duty?.dutyDate ? new Date(it.duty.dutyDate).toLocaleString() : "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ActiveGuards;
