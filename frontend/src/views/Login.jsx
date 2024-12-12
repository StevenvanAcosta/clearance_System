import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import BpcLogo from "../assets/bpclogo.png";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); // New state for toggling password visibility
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/api/login", {
                email,
                password,
            });
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("role", response.data.role);
            localStorage.setItem("userName", response.data.name); // Save the user's name
    
            // Navigate based on role
            const roleRoutes = {
                Admin: "/admin",
                Student: "/student",
                PTCA: "/ptca",
                "Program Head": "/program-head",
                "MIS Office": "/mis-office",
                "Accounting Clerk": "/accountingclerk",
                "SG Adviser": "/sgadviser",
                Adviser: "/adviser",
                "Scholarship Officer": "/scholarshipofficer",
                Scholarship: "/scholarship",
                Librarian: "/librarian",
            };
            navigate(roleRoutes[response.data.role] || "/"); // Default route if role is unknown
        } catch (err) {
            setError("Invalid credentials");
            console.error(err);
        }
    };
    

    return (
        <div className="w-full h-full"> 
        <title>Bpc Login</title>
            <div className="w-full h-screen flex flex-col bg-[#25632D]">
                <form onSubmit={handleSubmit} className="flex">
                    <div className="w-1/2 h-full justify-center flex items-center flex-col">
                        <p className="text-white font-bold text-6xl flex justify-center items-center gap-2 ">
                            <img src={BpcLogo}
                            className="w-16 h-fit flex mt-2 " />
                            BPC
                        </p>
                        <p className="text-white font-semibold text-4xl">Clearance System</p>
                        <p className="text-yellow-400 font-semibold text-xs ">"Dedicated to Knowledge, Committed to Success."</p>
                    </div>
                    <div className="w-1/2 h-screen flex flex-col justify-center items-center">
                        <div className="w-96 h-fit bg-white flex flex-col justify-center items-center gap-3 rounded-3xl p-14">
                            {/* <img 
                                src={BpcLogo} 
                                alt="bpclogo"
                                className="w-32"
                            /> */}

                            <p className="font-semibold text-black text-2xl">Login</p>
                            {error && <p style={{ color: "red" }}>{error}</p>}
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-72 h-10 outline outline-slate-300 rounded-lg outline-1 p-3"
                            />
                            <div className="relative w-72">
                                <input
                                    type={showPassword ? "text" : "password"} // Toggle between "text" and "password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full h-10 outline outline-slate-300 rounded-lg outline-1 p-3"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)} // Toggle visibility
                                    className="absolute right-3 top-2 text-gray-500"
                                >
                                    {showPassword ? "Hide" : "Show"} {/* Button text changes dynamically */}
                                </button>
                            </div>
                            <div className="flex justify-end w-full">
                                <Link to="/forgot-password"
                                    className=" underline hover:text-blue-500 text-xs"
                                >Forgot Password?
                                </Link>
                            </div>
                            <button 
                                type="submit"
                                className="w-72 h-10 bg-[#E4CF3D] rounded-lg text-white hover:text-white hover:bg-blue-500"
                            >Login    
                            </button>
                            <div className="w-full flex justify-end gap-1">
                                <p className="flex text-xs">Verify your student id</p>
                            <Link to="/register">
                                <p className="flex text-xs hover:text-blue-500 underline">click here</p>
                            </Link>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

// export default Login;
// import { useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import BpcLogo from "../assets/bpclogo.png";

// function Login() {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [otp, setOtp] = useState(""); // OTP state
//     const [isOtpSent, setIsOtpSent] = useState(false); // Flag to show OTP input
//     const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
//     const [error, setError] = useState("");
//     const navigate = useNavigate();

//     const roleRoutes = {
//         Admin: "/admin",
//         Student: "/student",
//         PTCA: "/ptca",
//         "Program Head": "/program-head",
//         "MIS Office": "/mis-office",
//         "Accounting Clerk": "/accountingclerk",
//         "SG Adviser": "/sgadviser",
//         Adviser: "/adviser",
//         "Scholarship Officer": "/scholarshipofficer",
//         Scholarship: "/scholarship",
//         Librarian: "/librarian",
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError(""); // Clear previous error messages
//         try {
//             const response = await axios.post("http://localhost:8000/api/login", {
//                 email,
//                 password,
//             });

//             if (response.status === 403) {
//                 // OTP required
//                 setIsOtpSent(true);
//                 alert(response.data.message); // Notify the user that OTP was sent
//                 return;
//             }

//             // Login successful, store necessary data in localStorage
//             localStorage.setItem("token", response.data.token);
//             localStorage.setItem("role", response.data.role);
//             localStorage.setItem("userName", response.data.name); // Save the user's name

//             // Navigate to the role-specific route
//             navigate(roleRoutes[response.data.role] || "/");
//         } catch (err) {
//             setError(err.response?.data?.error || "Invalid credentials");
//             console.error(err);
//         }
//     };

//     const handleOtpVerification = async () => {
//         setError(""); // Clear previous error messages
//         try {
//             const response = await axios.post("http://localhost:8000/api/verify-otp", {
//                 email,
//                 otp,
//             });

//             alert(response.data.message); // Notify user of successful verification
//             setIsOtpSent(false); // Reset OTP state
//         } catch (err) {
//             setError(err.response?.data?.error || "Invalid or expired OTP.");
//             console.error(err);
//         }
//     };

//     return (
//         <div className="w-full h-full">
//             <title>Bpc Login</title>
//             <div className="w-full h-screen flex flex-col bg-[#25632D]">
//                 <form onSubmit={handleSubmit} className="flex">
//                     <div className="w-1/2 h-full justify-center flex items-center flex-col">
//                         <p className="text-white font-bold text-6xl flex justify-center items-center gap-2">
//                             <img src={BpcLogo} className="w-16 h-fit flex mt-2" alt="BPC Logo" />
//                             BPC
//                         </p>
//                         <p className="text-white font-semibold text-4xl">Clearance System</p>
//                         <p className="text-yellow-400 font-semibold text-xs">
//                             "Dedicated to Knowledge, Committed to Success."
//                         </p>
//                     </div>
//                     <div className="w-1/2 h-screen flex flex-col justify-center items-center">
//                         <div className="w-96 h-fit bg-white flex flex-col justify-center items-center gap-3 rounded-3xl p-14">
//                             <p className="font-semibold text-black text-2xl">Login</p>
//                             {error && <p style={{ color: "red" }}>{error}</p>}
//                             <input
//                                 type="email"
//                                 placeholder="Email"
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 required
//                                 className="w-72 h-10 outline outline-slate-300 rounded-lg outline-1 p-3"
//                             />
//                             {!isOtpSent && (
//                                 <>
//                                     <div className="relative w-72">
//                                         <input
//                                             type={showPassword ? "text" : "password"}
//                                             placeholder="Password"
//                                             value={password}
//                                             onChange={(e) => setPassword(e.target.value)}
//                                             required
//                                             className="w-full h-10 outline outline-slate-300 rounded-lg outline-1 p-3"
//                                         />
//                                         <button
//                                             type="button"
//                                             onClick={() => setShowPassword(!showPassword)}
//                                             className="absolute right-3 top-2 text-gray-500"
//                                         >
//                                             {showPassword ? "Hide" : "Show"}
//                                         </button>
//                                     </div>
//                                     <div className="flex justify-end w-full">
//                                         <Link
//                                             to="/forgot-password"
//                                             className="underline hover:text-blue-500 text-xs"
//                                         >
//                                             Forgot Password?
//                                         </Link>
//                                     </div>
//                                     <button
//                                         type="submit"
//                                         className="w-72 h-10 bg-[#E4CF3D] rounded-lg text-white hover:text-white hover:bg-blue-500"
//                                     >
//                                         Login
//                                     </button>
//                                 </>
//                             )}
//                             {isOtpSent && (
//                                 <>
//                                     <input
//                                         type="text"
//                                         placeholder="Enter OTP"
//                                         value={otp}
//                                         onChange={(e) => setOtp(e.target.value)}
//                                         required
//                                         className="w-72 h-10 outline outline-slate-300 rounded-lg outline-1 p-3"
//                                     />
//                                     <button
//                                         type="button"
//                                         onClick={handleOtpVerification}
//                                         className="w-72 h-10 bg-[#25632D] rounded-lg text-white hover:text-white hover:bg-blue-500"
//                                     >
//                                         Verify OTP
//                                     </button>
//                                 </>
//                             )}
//                             <div className="w-full flex justify-end gap-1">
//                                 <p className="flex text-xs">Verify your student ID</p>
//                                 <Link to="/register">
//                                     <p className="flex text-xs hover:text-blue-500 underline">
//                                         click here
//                                     </p>
//                                 </Link>
//                             </div>
//                         </div>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// }

export default Login;
