import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AiFillDashboard } from "react-icons/ai";
import { FaRegUserCircle } from "react-icons/fa";
import { TbLogout2 } from "react-icons/tb";

const StudentHeader = () => {
    const [userName, setUserName] = useState(""); // Store the user's name
    const navigate = useNavigate();
    const location = useLocation(); // Get the current route

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
            <div className="w-64 h-screen bg-white text-slate-700 p-5 border-slate-200 border border-1">
                <p className="text-2xl font-bold px-4">Student Panel</p>
                <div className="mt-2 text-lg px-4">
                    {userName ? userName : "Profile"} {/* Display user's name or "Profile" as fallback */}
                </div>
                <div className="w-full h-full mt-8">
                    {/* Dashboard Link */}
                    <Link
                        to="/student/dashboard"
                        className={`gap-2 py-2 px-4 rounded transition flex items-center duration-200 ${
                            location.pathname === "/student/dashboard"
                                ? "bg-gray-700 text-white"
                                : "hover:bg-gray-700 hover:text-white"
                        }`}
                    >
                        <AiFillDashboard size={30} />
                        Dashboard
                    </Link>
                    {/* Profile Link */}
                    <Link
                        to="/student/profile"
                        className={`gap-2 py-2 px-4 rounded transition flex items-center duration-200 ${
                            location.pathname === "/student/profile"
                                ? "bg-gray-700 text-white"
                                : "hover:bg-gray-700 hover:text-white"
                        }`}
                    >
                        <FaRegUserCircle size={30} />
                        Profile
                    </Link>
                    {/* Logout Button */}
                    <button
                        className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-700 hover:text-white transition rounded"
                        onClick={onLogout}
                    >
                        <TbLogout2 size={30} />
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StudentHeader;
