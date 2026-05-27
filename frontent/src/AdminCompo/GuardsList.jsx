import React from "react";
import { api, getAuthHeader } from "../services/api";

function GuardsList() {
  const [guards, setGuards] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/guards", { headers: getAuthHeader() });
        setGuards(res.data.guards || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load guards");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) return <div className="p-6">Loading guards...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="p-6 min-h-screen bg-slate-100">
      <h1 className="text-2xl font-bold mb-4">All Guards</h1>

      <div className="bg-white rounded-lg shadow overflow-auto">
        <table className="w-full table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-3">#</th>
              <th className="text-left px-4 py-3">First Name</th>
              <th className="text-left px-4 py-3">Last Name</th>
              <th className="text-left px-4 py-3">Contact</th>
              <th className="text-left px-4 py-3">Username</th>
              <th className="text-left px-4 py-3">On Leave</th>
            </tr>
          </thead>

          <tbody>
            {guards.map((g, idx) => (
              <tr key={g._id} className="border-t">
                <td className="px-4 py-3">{idx + 1}</td>
                <td className="px-4 py-3">{g.firstName}</td>
                <td className="px-4 py-3">{g.lastName}</td>
                <td className="px-4 py-3">{g.contact}</td>
                <td className="px-4 py-3">{g.username}</td>
                <td className="px-4 py-3">
                  {g.onLeave ? (
                    <span className="text-red-600 font-semibold">Yes</span>
                  ) : (
                    <span className="text-green-600 font-semibold">No</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GuardsList;
