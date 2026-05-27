import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faShieldAlt,
    faRightFromBracket
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("name");
        localStorage.removeItem("contact");
        localStorage.removeItem("username");
        navigate("/");
    };

    return (
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-gray-300 text-gray-800 shadow-md">



            {/* LEFT: Logo (md+) */}
            <div className="md:flex items-center gap-2 text-3xl">
                <FontAwesomeIcon icon={faShieldAlt} />
            </div>

            {/* CENTER: Title */}
      <h1 className="text-sm sm:text-lg font-black text-center flex-1 truncate md:text-3xl tracking-tighter uppercase italic">
        University <span className="text-indigo-400">Security</span> Management
      </h1>

            {/* RIGHT: Logout */}
            <button onClick={handleLogout} className="items-center gap-2 bg-white text-gray-800 font-medium md:px-3 md:py-2 sm:px-2 sm:py-2 rounded-md  max-sm:py-1 max-sm:text-base  md:flex sm:lg hover:bg-black hover:text-white transition-all duration-300 ease-in-out">
                <FontAwesomeIcon icon={faRightFromBracket} />
                <span className=" md:inline sm:text-lg md:text-xl">Log Out</span>
            </button>

        </div>
    );
}

export default Navbar;
