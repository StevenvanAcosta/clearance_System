import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../views/Login";
import PrivateRoute from "../components/PrivateRoute";
import Student from "../views/admin/Student";
import Offices from "../views/admin/Offices";
import Profile from "../views/admin/AdminProfile";
import AddUser from "../views/admin/AddUser";
import StudentDashboard from "../views/student/studentDashboard";
import NotFound from "../views/NotFound";
import Users from "../views/admin/Users";
import LibrarianApproved from "../views/librarian/Librarianapproved"
import ScholarshipProfile from "../views/scholarship/ScholarshipProfile";
import Approved from "../views/ptca/Approved";
import Transaction from "../views/ptca/Transaction";
import AccountingClerkApproved from "../views/accountingclerk/AccountingClerkApproved";
import AdviserApproved from "../views/adviser/AdviserApproved";
import AdviserStudent from "../views/adviser/AdviserStudent";
import LibrarianStudent from "../views/librarian/LibrarianStudent";
import PtcaProfile from "../views/ptca/PtcaProfile"
import StudentProfile from "../views/student/StudentProfile"
import ProgramHeadStudent from "../views/programhead/ProgramHeadStudent";
import ProgramHeadProfile from "../views/programhead/ProgramHeadProfile";
import ProgramHeadApproved from "../views/programhead/programHeadApproved";
import MisOfficeApproved from "../views/misoffice/MisOfficeApproved";
import MisOfficeStudent from "../views/misoffice/MisOfficeStudent";
import MisOfficeProfile from "../views/misoffice/MisOfficeProfile";
import LibrarianProfile from "../views/librarian/LibrarianProfile";
import AccountingClerkStudent from "../views/accountingclerk/AccountingClerkStudent";
import AccountingClerkProfile from "../views/accountingclerk/AccountingProfile";
import AdviserProfile from "../views/adviser/AdviserProfile";
import ForgotPassword from "../views/forgotpassword/ForgotPassword";
import SgApproved from "../views/sgadviser/SgApproved";
import SgTransaction from "../views/sgadviser/Transaction";
import SgProfile from "../views/sgadviser/SgAdviserProfile";
import Register from "../views/Register";
import ScholarshipApproved from "../views/scholarship/ScholarshipApproved"
import ScholarshipTransaction from "../views/scholarship/ScholarshipTransaction";
import ScholarshipStudent from "../views/scholarship/ScholarshipStudent"
import ScholarshipOfficeApproved from "../views/scholarshipofficer/ScholarshipOfficerApproved";
import ScholarshipOfficerProfile from "../views/scholarshipofficer/ScholarshipOfficerProfile";
import ScholarshipOfficerStudent from "../views/scholarshipofficer/ScholarshipOfficerStudent";
import SetSemester from "../views/admin/SetSemester";
import Record from "../views/admin/Record";
import StudentInformation from "../views/admin/StudentInformation";
import AddCourses from "../views/admin/AddCourses";

function DefineRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} /> 

                {/* ADMIN */}
                <Route 
                    path="/admin" 
                    element={
                        <PrivateRoute allowedRoles={["Admin"]}>
                            <Users />
                        </PrivateRoute>
                    } 
                />
                <Route 
                    path="/admin/set-semester" 
                    element={
                        <PrivateRoute allowedRoles={["Admin"]}>
                            <SetSemester />
                        </PrivateRoute>
                    } 
                />
                <Route 
                    path="/admin/users" 
                    element={
                        <PrivateRoute allowedRoles={["Admin"]}>
                            <Users />
                        </PrivateRoute>
                    } 
                />
                <Route 
                    path="/admin/student" 
                    element={
                        <PrivateRoute allowedRoles={["Admin"]}>
                            <Student />
                        </PrivateRoute>
                    } 
                />
                <Route 
                    path="/admin/offices" 
                    element={
                        <PrivateRoute allowedRoles={["Admin"]}>
                            <Offices />
                        </PrivateRoute>
                    } 
                />
                <Route 
                    path="/admin/adduser" 
                    element={
                        <PrivateRoute allowedRoles={["Admin"]}>
                            <AddUser />
                        </PrivateRoute>
                    } 
                />
                <Route 
                    path="/admin/profile" 
                    element={
                        <PrivateRoute allowedRoles={["Admin"]}>
                            <Profile />
                        </PrivateRoute>
                    } 
                />
                <Route 
                    path="/admin/student/record" 
                    element={
                        <PrivateRoute allowedRoles={["Admin"]}>
                            <Record />
                        </PrivateRoute>
                    } 
                />
                <Route 
                    path="/admin/student/student-information" 
                    element={
                        <PrivateRoute allowedRoles={["Admin"]}>
                            <StudentInformation/>
                        </PrivateRoute>
                    } 
                />
                <Route 
                    path="/admin/offices/courses" 
                    element={
                        <PrivateRoute allowedRoles={["Admin"]}>
                            <AddCourses/>
                        </PrivateRoute>
                    } 
                />

                {/* --------------------------------------------------------------------------------- */}
                {/* STUDENT ROUTING */}
                <Route 
                    path="/student" 
                    element={
                        <PrivateRoute allowedRoles={["Student"]}>
                            <StudentDashboard />
                        </PrivateRoute>
                    } 
                />
                <Route 
                    path="/student/dashboard" 
                    element={
                        <PrivateRoute allowedRoles={["Student"]}>
                            <StudentDashboard />
                        </PrivateRoute>
                    } 
                />
                <Route 
                    path="/student/profile" 
                    element={
                        <PrivateRoute allowedRoles={["Student"]}>
                            <StudentProfile />
                        </PrivateRoute>
                    } 
                />

                {/* -------------------------------------------------------------------- */}
                {/* PTCA */}
                <Route 
                    path="/ptca" 
                    element={
                        <PrivateRoute allowedRoles={["PTCA"]}>
                            <Approved />
                        </PrivateRoute>
                    } 
                />
                <Route 
                    path="/ptca/approved" 
                    element={
                        <PrivateRoute allowedRoles={["PTCA"]}>
                            <Approved />
                        </PrivateRoute>
                    } 
                />
                <Route 
                    path="/ptca/transaction" 
                    element={
                        <PrivateRoute allowedRoles={["PTCA"]}>
                            <Transaction />
                        </PrivateRoute>
                    } 
                />
                 <Route 
                    path="/ptca/profile" 
                    element={
                        <PrivateRoute allowedRoles={["PTCA"]}>
                            <PtcaProfile />
                        </PrivateRoute>
                    } 
                />

                {/* ------------------------------------------------------------------------------- */}
                {/* Program Head */}
                <Route 
                    path="/program-head" 
                    element={
                        <PrivateRoute allowedRoles={["Program Head"]}>
                            <ProgramHeadApproved />
                        </PrivateRoute>
                    } 
                />
                <Route 
                    path="/program-head/profile" 
                    element={
                        <PrivateRoute allowedRoles={["Program Head"]}>
                            <ProgramHeadProfile />
                        </PrivateRoute>
                    } 
                />
                <Route 
                    path="/program-head/approved" 
                    element={
                        <PrivateRoute allowedRoles={["Program Head"]}>
                            <ProgramHeadApproved />
                        </PrivateRoute>
                    } 
                />
                <Route 
                    path="/program-head/student" 
                    element={
                        <PrivateRoute allowedRoles={["Program Head"]}>
                            <ProgramHeadStudent />
                        </PrivateRoute>
                    } 
                />

                {/* ------------------------------------------------------------- */}
                {/* Accounting Clerk Routing */}
                <Route 
                    path="/accountingclerk" 
                    element={
                        <PrivateRoute allowedRoles={["Accounting Clerk"]}>
                            <AccountingClerkApproved />
                        </PrivateRoute>
                    } 
                />
                <Route 
                path="/accountingclerk/approved" 
                element={
                    <PrivateRoute allowedRoles={["Accounting Clerk"]}>
                        <AccountingClerkApproved />
                    </PrivateRoute>
                } 
                />
                <Route 
                path="/accountingclerk/student" 
                element={
                    <PrivateRoute allowedRoles={["Accounting Clerk"]}>
                        <AccountingClerkStudent />
                    </PrivateRoute>
                } 
                />
                <Route 
                path="/accountingclerk/profile" 
                element={
                    <PrivateRoute allowedRoles={["Accounting Clerk"]}>
                        <AccountingClerkProfile />
                    </PrivateRoute>
                } 
                />

                {/* ---------------------------------------------------------------- */}
                {/* Adviser */}
                <Route 
                    path="/adviser" 
                    element={
                        <PrivateRoute allowedRoles={["Adviser"]}>
                            <AdviserApproved />
                        </PrivateRoute>
                    } 
                />
                <Route 
                    path="/adviser/approved" 
                    element={
                        <PrivateRoute allowedRoles={["Adviser"]}>
                            <AdviserApproved />
                        </PrivateRoute>
                    } 
                />
                <Route 
                    path="/adviser/student" 
                    element={
                        <PrivateRoute allowedRoles={["Adviser"]}>
                            <AdviserStudent />
                        </PrivateRoute>
                    } 
                />
                <Route 
                    path="/adviser/profile" 
                    element={
                        <PrivateRoute allowedRoles={["Adviser"]}>
                            <AdviserProfile />
                        </PrivateRoute>
                    } 
                />

                {/* --------------------------------------------------------------------- */}
                {/* Librarian */}
                <Route 
                    path="/librarian" 
                    element={
                        <PrivateRoute allowedRoles={["Librarian"]}>
                            <LibrarianApproved />
                        </PrivateRoute>
                    } 
                />
                <Route 
                    path="/librarian/approved" 
                    element={
                        <PrivateRoute allowedRoles={["Librarian"]}>
                            <LibrarianApproved />
                        </PrivateRoute>
                    } 
                />
                <Route 
                    path="/librarian/student" 
                    element={
                        <PrivateRoute allowedRoles={["Librarian"]}>
                            <LibrarianStudent />
                        </PrivateRoute>
                    } 
                />
                <Route 
                    path="/librarian/profile" 
                    element={
                        <PrivateRoute allowedRoles={["Librarian"]}>
                            <LibrarianProfile />
                        </PrivateRoute>
                    } 
                />

                {/* -------------------------------------------------------------------------- */}
                {/* MIS Office */}
                <Route 
                    path="/mis-office" 
                    element={
                        <PrivateRoute allowedRoles={["MIS Office"]}>
                            <MisOfficeApproved />
                        </PrivateRoute>
                    } 
                />
                <Route 
                    path="/mis-office/approved" 
                    element={
                        <PrivateRoute allowedRoles={["MIS Office"]}>
                            <MisOfficeApproved />
                        </PrivateRoute>
                    } 
                />
                <Route 
                    path="/mis-office/student" 
                    element={
                        <PrivateRoute allowedRoles={["MIS Office"]}>
                            <MisOfficeStudent />
                        </PrivateRoute>
                    } 
                />
                <Route 
                    path="/mis-office/profile" 
                    element={
                        <PrivateRoute allowedRoles={["MIS Office"]}>
                            <MisOfficeProfile />
                        </PrivateRoute>
                    } 
                />

                {/* ------------------------------------------------------------------------------------------ */}
                {/* ScholarShip */}
                <Route 
                    path="/scholarship" 
                    element={
                        <PrivateRoute allowedRoles={["Scholarship"]}>
                            <ScholarshipApproved />
                        </PrivateRoute>
                    } 
                />
                <Route 
                    path="/scholarship/approved" 
                    element={
                        <PrivateRoute allowedRoles={["Scholarship"]}>
                            <ScholarshipApproved />
                        </PrivateRoute>
                    } 
                />
                <Route 
                    path="/scholarship/profile" 
                    element={
                        <PrivateRoute allowedRoles={["Scholarship"]}>
                            <ScholarshipProfile />
                        </PrivateRoute>
                    } 
                />
                <Route 
                    path="/scholarship/transaction" 
                    element={
                        <PrivateRoute allowedRoles={["Scholarship"]}>
                            <ScholarshipTransaction />
                        </PrivateRoute>
                    } 
                />
                <Route 
                    path="/scholarship/student" 
                    element={
                        <PrivateRoute allowedRoles={["Scholarship"]}>
                            <ScholarshipStudent />
                        </PrivateRoute>
                    } 
                />

                {/* SCHOLARSHIP-OFFICER */}
                {/* ScholarShip */}
                <Route 
                    path="/scholarshipofficer" 
                    element={
                        <PrivateRoute allowedRoles={["Scholarship Officer"]}>
                            <ScholarshipOfficeApproved />
                        </PrivateRoute>
                    } 
                />
                <Route 
                    path="/scholarship-officer/approved" 
                    element={
                        <PrivateRoute allowedRoles={["Scholarship Officer"]}>
                            <ScholarshipOfficeApproved />
                        </PrivateRoute>
                    } 
                />
                <Route 
                    path="/scholarship-officer/profile" 
                    element={
                        <PrivateRoute allowedRoles={["Scholarship Officer"]}>
                            <ScholarshipOfficerProfile />
                        </PrivateRoute>
                    } 
                />
                <Route 
                    path="/scholarship-officer/transaction" 
                    element={
                        <PrivateRoute allowedRoles={["Scholarship Officer"]}>
                            <ScholarshipOfficerProfile />
                        </PrivateRoute>
                    } 
                />
                <Route 
                    path="/scholarship-officer/student" 
                    element={
                        <PrivateRoute allowedRoles={["Scholarship Officer"]}>
                            <ScholarshipOfficerStudent />
                        </PrivateRoute>
                    } 
                />

                {/* SG ADVISER */}
                <Route 
                    path="/sgadviser" 
                    element={
                        <PrivateRoute allowedRoles={["SG Adviser"]}>
                            <SgApproved />
                        </PrivateRoute>
                    } 
                />
                <Route 
                    path="/sgadviser/approved" 
                    element={
                        <PrivateRoute allowedRoles={["SG Adviser"]}>
                            <SgApproved />
                        </PrivateRoute>
                    } 
                />
                <Route 
                    path="/sgadviser/transaction" 
                    element={
                        <PrivateRoute allowedRoles={["SG Adviser"]}>
                            <SgTransaction />
                        </PrivateRoute>
                    } 
                />
                <Route 
                    path="/sgadviser/profile" 
                    element={
                        <PrivateRoute allowedRoles={["SG Adviser"]}>
                            <SgProfile />
                        </PrivateRoute>
                    } 
                />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default DefineRoutes;
