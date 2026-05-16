import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

function LeaveRequests() {

    // Data coming from backend/database
    const leaveData = [
        {
            id: 1,
            employeeName: "Rahul Sharma",
            dutyPlace: "Main Gate",
            leaveDays: 2,
            leaveReason: "Medical Leave",
        },

        {
            id: 2,
            employeeName: "Aman Das",
            dutyPlace: "Library",
            leaveDays: 1,
            leaveReason: "Personal Work",
        },

        {
            id: 3,
            employeeName: "Riya Bora",
            dutyPlace: "SOE",
            leaveDays: 3,
            leaveReason: "Family Function",
        },
    ];

    const handleApprove = () => {
        alert("Leave Approved");
    };

    const handleReject = () => {
        alert("Leave Rejected");
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
                                Reason: {data.leaveReason}
                            </p>

                        </div>

                        {/* Icon Buttons */}
                        <div className="flex gap-6 ml-6 items-center">

                            <button
                                onClick={handleApprove}
                                className="w-10 h-10 rounded-full flex items-center justify-center border-2 border-green-600 text-green-600 hover:text-green-800 hover:border-green-800 transition-colors text-3xl"
                                title="Approve"
                            >
                                <FontAwesomeIcon icon={faCheck} />
                            </button>

                            <button
                                onClick={handleReject}
                                className="w-10 h-10 rounded-full flex items-center justify-center border-2 border-red-600 text-red-600 hover:text-red-800 hover:border-red-800 transition-colors text-3xl"
                                title="Reject"
                            >
                                <FontAwesomeIcon icon={faTimes} />
                            </button>

                        </div>

                    </div>
                ))}

            </div>
        </div>
    );
}

export default LeaveRequests;