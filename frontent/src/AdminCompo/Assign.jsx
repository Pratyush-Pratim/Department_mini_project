import React, { useState } from "react";
import { api, getAuthHeader } from "../services/api";

function DutyAssignForm() {

    const [placeType, setPlaceType] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("");
    const [guardsCount, setGuardsCount] = useState("");
    const [gender, setGender] = useState("");
    const [shift, setShift] = useState("");

    const boysHostels = [
        "Charaideo Men's Hostel",
        "Nilachal Men's Hostel",
        "Kanchanjungha Men's Hostel",
        "Saraighat C.V. Raman Men's Hostel (SCVRMH)",
        "Transit Men's Hostel-1",
        "Patkai Men's Hostel",
    ];

    const girlsHostels = [
        "Bardoichila Women's Hostel",
        "Subansiri Women's Hostel",
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

    React.useEffect(() => {
        // nothing to load for gender-based assignment
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!gender || !placeType || !selectedLocation || !shift) {
            alert("Please select gender, location and shift");
            return;
        }

        try {
            const response = await api.post(
                "/duties",
                {
                    gender,
                    locationType: placeType,
                    locationName: selectedLocation,
                    guardsCount: Number(guardsCount) || undefined,
                    shift,
                },
                {
                    headers: getAuthHeader(),
                }
            );

            const assignedCount = response.data?.assignedCount;
            const msg = response.data.message || "Security Duty Assigned Successfully!";
            alert(assignedCount ? `${msg} (${assignedCount} guard(s) assigned)` : msg);
            setGender("");
            setPlaceType("");
            setSelectedLocation("");
            setGuardsCount("");
            setShift("");
        } catch (err) {
            alert(err.response?.data?.message || "Failed to assign duty");
        }
    };

    return (
        <div className="min-h-screen  bg-slate-100 flex items-center justify-center p-4">

            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">

                <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Assign Security Duty
                </h1>

                <form className="space-y-5" onSubmit={handleSubmit}>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                                Select Gender
                            </label>

                            <select
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                    </div>

                    {/* Choose Place Type */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Choose Location Type
                        </label>

                        <select
                            value={placeType}
                            onChange={(e) => {
                                setPlaceType(e.target.value);
                                setSelectedLocation("");
                            }}
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
                                value={selectedLocation}
                                onChange={(e) => setSelectedLocation(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                            >
                                <option value="">Select Hostel</option>
                                {(
                                    gender === "Male"
                                        ? boysHostels
                                        : gender === "Female"
                                            ? girlsHostels
                                            : [...boysHostels, ...girlsHostels]
                                ).map((hostel) => (
                                    <option key={hostel} value={hostel}>{hostel}</option>
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
                                value={selectedLocation}
                                onChange={(e) => setSelectedLocation(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                            >
                                <option value="">Select Place</option>

                                {otherPlaces.map((place) => (
                                    <option key={place} value={place}>{place}</option>
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
                            value={guardsCount}
                            onChange={(e) => setGuardsCount(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Shift Selector */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Select Shift</label>
                        <select
                            value={shift}
                            onChange={(e) => setShift(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        >
                            <option value="">Select Shift</option>
                            <option value="shift1">Shift 1 — 6:00 AM to 2:00 PM</option>
                            <option value="shift2">Shift 2 — 2:00 PM to 8:00 PM</option>
                            <option value="shift3">Shift 3 — 8:00 PM to 6:00 AM</option>
                        </select>
                    </div>

                    {/* Assign Button */}
                    <button
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
