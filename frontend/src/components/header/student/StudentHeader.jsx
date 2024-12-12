import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import BpcLogo from "../../../assets/bpclogo.png";

const StudentHeader = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [userName, setUserName] = useState(""); // Store the user's name
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    // Fetch user name on component mount
    useEffect(() => {
        const storedName = localStorage.getItem("userName");
        if (storedName) setUserName(storedName);
    }, []);

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const onLogout = () => {
        const confirmLogout = window.confirm("Are you sure you want to log out?");
        if (!confirmLogout) return;

        localStorage.clear(); // Clear all stored data
        sessionStorage.clear();
        navigate("/", { replace: true });
        alert("You have been successfully logged out.");
    };

    return (
        <div className="w-full">
            <header className="flex justify-between items-center h-16 bg-[#25632D] text-white px-6">
                {/* Logo */}
                <div className="flex items-center">
                    <img src={BpcLogo} className="w-16" alt="BPC Logo" />
                </div>

                {/* Navigation Links */}
                <nav className="flex items-center gap-6">
                    <Link className="hover:text-yellow-400 font-semibold" to="/student/dashboard">
                        Dashboard
                    </Link>

                    {/* Profile Dropdown */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            className="hover:text-yellow-400 font-semibold"
                            onClick={toggleDropdown}
                            aria-haspopup="true"
                            aria-expanded={dropdownOpen}
                        >
                            {userName || "Profile"} {/* Display the user's name */}
                        </button>
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg z-10">
                                <Link className="block px-4 py-2 hover:bg-gray-200" to="/student/profile">
                                    Profile
                                </Link>
                                <button
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                                    onClick={onLogout}
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </nav>
            </header>
        </div>
    );
};

export default StudentHeader;
