import React, { useEffect, useState } from "react";
import { api, getAuthHeader } from "../services/api";

function SuspendGuards() {
  const [guards, setGuards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  // Fetch guards
  useEffect(() => {
    fetchGuards();
  }, []);

  const fetchGuards = async () => {
    try {
      const res = await api.get("/guards", {
        headers: getAuthHeader(),
      });

      setGuards(res.data.guards || []);
    } catch (err) {
      setGuards([]);
      alert(err.response?.data?.message || "Failed to load guards");
    } finally {
      setLoading(false);
    }
  };

  // Suspend guard
  const handleSuspend = async (id) => {
    if (
      !window.confirm(
        "Suspend this guard? This will delete the guard and their duties."
      )
    )
      return;

    try {
      const res = await api.delete(`/guards/${id}`, {
        headers: getAuthHeader(),
      });

      alert(res.data.message || "Guard suspended");

      setGuards((g) => g.filter((x) => x._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to suspend guard");
    }
  };

  // Filter guards
  const filteredGuards = guards.filter((g) => {
    if (!query) return true;

    const q = query.toLowerCase();

    const name =
      `${g.firstName || ""} ${g.lastName || ""}`.toLowerCase();

    const contact = (g.contact || "").toLowerCase();

    const username = (g.username || "").toLowerCase();

    return (
      name.includes(q) ||
      contact.includes(q) ||
      username.includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-slate-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">
          Suspend Guard
        </h1>

        {loading ? (
          <p>Loading guards...</p>
        ) : guards.length === 0 ? (
          <p>No guards found</p>
        ) : (
          <div>
            {/* Search box */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search guards by name, contact or username..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            {/* Guard list */}
            <div className="space-y-3">
              {filteredGuards.map((g) => (
                <div
                  key={g._id}
                  className="flex items-center justify-between border p-3 rounded"
                >
                  <div>
                    <div className="font-semibold">
                      {g.firstName || g.lastName
                        ? `${g.firstName || ""} ${g.lastName || ""}`
                        : g.username}
                    </div>

                    <div className="text-sm text-gray-500">
                      {g.contact} • {g.username}
                    </div>
                  </div>

                  <button
                    onClick={() => handleSuspend(g._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                  >
                    Suspend
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SuspendGuards;