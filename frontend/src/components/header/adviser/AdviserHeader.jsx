import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"; // Import useLocation
import { FaUserCheck } from "react-icons/fa";
import { PiUsersFill } from "react-icons/pi";
import { FaRegUserCircle } from "react-icons/fa";
import { TbLogout2 } from "react-icons/tb";

const AdviserHeader = () => {
    const [userName, setUserName] = useState(""); // Store the user's name
    const navigate = useNavigate();
    const location = useLocation(); // Get the current location

    // Fetch user name on component mount
    useEffect(() => {
        const storedName = localStorage.getItem("userName");
        if (storedName) setUserName(storedName);
    }, []);
    
    // Logout handler
    const onLogout = async () => {
        const confirmLogout = window.confirm("Are you sure you want to log out?");
        if (!confirmLogout) return;

        try {
            // Clear all session-related data
            localStorage.clear(); // Clear all localStorage items
            sessionStorage.clear(); // Clear all sessionStorage items

            console.log("Successfully logged out");

            // Redirect to login page and prevent going back
            navigate("/", { replace: true });

            alert("You have been successfully logged out.");
        } catch (error) {
            console.error("Error during logout:", error);
            alert("An error occurred while logging out. Please try again.");
        }
    };

    return (
        <div className="flex">
            {/* Sidebar */}
            <div className="w-64 h-auto bg-white text-slate-700 p-5 border-slate-200 border border-1">
                <p className="text-2xl font-bold px-4">Adviser Panel</p>
                <div className="mt-2 text-lg px-4">
                    {userName ? userName : "Profile"} {/* Display user's name or "Profile" as fallback */}
                </div>
                <div className="w-full h-full mt-8">
                    <Link
                        to="/adviser/approved"
                        className={`flex gap-2 py-2 px-4 items-center rounded transition duration-200 ${
                            location.pathname === "/adviser/approved"
                                ? "bg-gray-700 text-white"
                                : "hover:bg-gray-700 hover:text-white"
                        }`}
                    >   <FaUserCheck size={30}/>
                        Approved
                    </Link>
                    <Link
                        to="/adviser/student"
                        className={`flex gap-2 py-2 px-4 items-center rounded transition duration-200 ${
                            location.pathname === "/adviser/student"
                                ? "bg-gray-700 text-white"
                                : "hover:bg-gray-700 hover:text-white"
                        }`}
                    >   <PiUsersFill size={30}/>
                        Student
                    </Link>
                    <Link
                        to="/adviser/profile"
                        className={`gap-2 flex items-center py-2 px-4 rounded transition duration-200 ${
                            location.pathname === "/adviser/profile"
                                ? "bg-gray-700 text-white"
                                : "hover:bg-gray-700 hover:text-white"
                        }`}
                    >   <FaRegUserCircle size={30}/>
                        Profile
                    </Link>
                    <button
                        className="flex gap-2 items-center w-full text-left px-4 py-2 hover:bg-gray-200"
                        onClick={onLogout}
                    >   <TbLogout2 size={30}/>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdviserHeader;
