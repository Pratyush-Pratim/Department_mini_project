import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { api, getAuthHeader } from "../services/api";

function LeaveRequests() {
    const [leaveData, setLeaveData] = React.useState([]);
    const [monthlyLeaves, setMonthlyLeaves] = React.useState([]);

    const loadLeaves = React.useCallback(async () => {
        try {
            const response = await api.get("/leaves", {
                headers: getAuthHeader(),
            });
            const all = response.data.leaves || [];
            // show only pending leaves in the admin view
            const pending = all.filter((l) => l.status === "pending");
            setLeaveData(pending);

            // compute current month leaves (any leave that overlaps current month)
            const now = new Date();
            const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
            monthStart.setHours(0,0,0,0);
            const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
            monthEnd.setHours(23,59,59,999);

            const currentMonth = all.filter((l) => {
                if (!l.startDate || !l.endDate) return false;
                const s = new Date(l.startDate);
                const e = new Date(l.endDate);
                return e >= monthStart && s <= monthEnd;
            });

            setMonthlyLeaves(currentMonth);
        } catch (err) {
            setLeaveData([]);
        }
    }, []);

    React.useEffect(() => {
        loadLeaves();
    }, [loadLeaves]);

    const handleStatusChange = async (id, status) => {
        try {
            const response = await api.patch(
                `/leaves/${id}/status`,
                { status },
                {
                    headers: getAuthHeader(),
                }
            );

            alert(response.data.message || `Leave ${status}`);
            // remove the updated leave from the UI so it disappears permanently from this list
            setLeaveData((prev) => prev.filter((l) => l.id !== id));
        } catch (err) {
            alert(err.response?.data?.message || "Unable to update leave");
        }
    };

    return (
        <div className="min-h-screen  bg-slate-100 p-6">

            <h1 className="text-3xl font-bold text-slate-800 text-center mb-8">
                Leave Requests
            </h1>

            <div className="max-w-2xl mx-auto space-y-6">

                {leaveData.map((data) => (

                    <div
                        key={data.id}
                        className="bg-white rounded-lg shadow-lg p-6 flex items-center justify-between"
                    >

                        {/* Employee Details */}
                        <div className="space-y-2 flex-1">

                            <h2 className="text-2xl font-bold text-gray-800">
                                {data.employeeName}
                            </h2>

                            <p className="text-gray-600">
                                Duty Place: {data.dutyPlace}
                            </p>

                            <p className="text-gray-600">
                                Leave Days: {data.leaveDays}
                            </p>

                            <p className="text-gray-600">
                                Type: {data.leaveType || `${data.leaveDays} day(s)`}
                            </p>

                            <p className="text-gray-600">
                                Reason: {data.leaveReason}
                            </p>

                        </div>

                        {/* Icon Buttons */}
                        <div className="flex gap-6 ml-6 items-center">

                            <button
                                onClick={() => handleStatusChange(data.id, "approved")}
                                className="w-10 h-10 rounded-full flex items-center justify-center border-2 border-green-600 text-green-600 hover:text-green-800 hover:border-green-800 transition-colors text-3xl"
                                title="Approve"
                            >
                                <FontAwesomeIcon icon={faCheck} />
                            </button>

                            <button
                                onClick={() => handleStatusChange(data.id, "rejected")}
                                className="w-10 h-10 rounded-full flex items-center justify-center border-2 border-red-600 text-red-600 hover:text-red-800 hover:border-red-800 transition-colors text-3xl"
                                title="Reject"
                            >
                                <FontAwesomeIcon icon={faTimes} />
                            </button>

                        </div>

                    </div>
                ))}

                {leaveData.length === 0 && (
                    <div className="bg-white rounded-lg shadow-lg p-6 text-center text-gray-600">
                        No leave requests available.
                    </div>
                )}

            </div>

            {/* Current Month Leaves Table */}
            <div className="max-w-4xl mx-auto mt-10 bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold mb-4">Leaves This Month</h2>
                {monthlyLeaves.length === 0 ? (
                    <div className="text-gray-600">No leaves for this month.</div>
                ) : (
                    <div className="overflow-auto">
                        <table className="w-full table-auto">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="text-left px-4 py-2">#</th>
                                    <th className="text-left px-4 py-2">Name</th>
                                    <th className="text-left px-4 py-2">Contact</th>
                                    <th className="text-left px-4 py-2">Start Date</th>
                                    <th className="text-left px-4 py-2">End Date</th>
                                    <th className="text-left px-4 py-2">Days</th>
                                    <th className="text-left px-4 py-2">Type</th>
                                    <th className="text-left px-4 py-2">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {monthlyLeaves.map((l, idx) => (
                                    <tr key={l.id} className="border-t">
                                        <td className="px-4 py-2">{idx + 1}</td>
                                        <td className="px-4 py-2">{l.employeeName}</td>
                                        <td className="px-4 py-2">{l.guardContact || '-'}</td>
                                        <td className="px-4 py-2">{new Date(l.startDate).toLocaleDateString()}</td>
                                        <td className="px-4 py-2">{new Date(l.endDate).toLocaleDateString()}</td>
                                        <td className="px-4 py-2">{l.leaveDays}</td>
                                        <td className="px-4 py-2">{l.leaveType}</td>
                                        <td className="px-4 py-2">{l.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default LeaveRequests;
