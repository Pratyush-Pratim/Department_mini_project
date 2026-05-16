import React, { useState } from "react";

function DutyAssignForm() {

    const [placeType, setPlaceType] = useState("");

    const hostelNames = [

        "Charaideo Men's Hostel",
        "Nilachal Men's Hostel",
        "Kanchanjungha Men's Hostel",
        "Saraighat C.V. Raman Men's Hostel (SCVRMH)",
        "Transit Men's Hostel-1",
        "Patkai Men's Hostel",
        "Bardoichila Women's Hostel ",
        "Subansiri Women's Hostel ",
        "Pobitora Madam Curie Women's Hostel",
        "Pragjyotika Women's Hostel",
        "Kopili Women's Hostel",
        "Dhansiri Women's Hostel",
        "New Women's Hostel",
        "Jiri Women's Hostel",
        "Transit Women's Hostel-1",
    ];

    const otherPlaces = [
        "Main gate ",
        "Fountain",
        "Administartion Building",
        "Essentiial",
        "VC house",
        "Niribili",
        "SOE",
        "Library",
        "SOS",
        "HSS"
    ];

    return (
        <div className="min-h-screen  bg-slate-100 flex items-center justify-center p-4">

            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">

                <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Assign Security Duty
                </h1>

                <form className="space-y-5">

                    {/* Choose Place Type */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Choose Location Type
                        </label>

                        <select
                            value={placeType}
                            onChange={(e) => setPlaceType(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        >
                            <option value="">Select Option</option>
                            <option value="hostel">Hostel</option>
                            <option value="other">Other Places</option>
                        </select>
                    </div>

                    {/* Hostel Names */}
                    {placeType === "hostel" && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Select Hostel
                            </label>

                            <select
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                            >
                                {hostelNames.map((hostel) => (
                                    <option>{hostel}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Other Places */}
                    {placeType === "other" && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Select Place
                            </label>

                            <select
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                            >
                                <option>Select Place</option>

                                {otherPlaces.map((place) => (
                                    <option>{place}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Number of Security */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Number of Security Guards
                        </label>

                        <input
                            type="number"
                            placeholder="Enter Number"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Assign Button */}
                    <button
                        onClick={() => alert("Security Duty Assigned Successfully!")}
                        type="submit"
                        className="w-full py-2 px-4 rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                        Assign Duty
                    </button>

                </form>
            </div>
        </div>
    );
}

export default DutyAssignForm;