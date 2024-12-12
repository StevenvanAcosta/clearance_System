import React, { useState } from 'react';
import { Students } from '../../constant/ConstantApproved';
import ScholarshipOfficerHeader from '../../components/header/scholarshipofficer/ScholarshipOfficerHeader';

const ScholarshipOfficerStudent = () => {
    const [selectedStudent, setSelectedStudent] = useState(null); // To hold the currently selected student
    const [showRequirements, setShowRequirements] = useState(false); // To toggle the requirements popup

    // Function to handle receipt click
    const handleReceiptClick = (student) => {
        setSelectedStudent(student); // Set the clicked student as the selected student
    };

    // Function to close the toggle/modal
    const handleClose = () => {
        setSelectedStudent(null); // Reset selected student to null
    };

    // Function to toggle the requirements popup
    const toggleRequirements = () => {
        setShowRequirements(!showRequirements);
    };

    return (
        <div className="w-full h-screen flex overflow-hidden">
            <ScholarshipOfficerHeader />
            <div className="w-full h-full p-4">
                <p className="flex justify-center text-lg font-semibold mb-5">List of Students</p>
                    {/* Show Requirements Section */}
            <div className="mt-6 flex justify-end mb-2">
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={toggleRequirements}
                >
                    {showRequirements ? 'Hide Requirements' : 'Show Requirements'}
                </button>
            </div>

            {showRequirements && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h2 className="text-lg font-semibold mb-4">Requirements</h2>
                        <div className="space-y-3">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="payment"
                                    className="mr-2"
                                />
                                <label htmlFor="payment">Screenshot of Payment</label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="certificate"
                                    className="mr-2"
                                />
                                <label htmlFor="certificate">Certificate</label>
                            </div>
                            <button className='w-fit h-10 bg-blue-500 rounded-lg p-2 text-white font-semibold hover:bg-yellow-400'>Add</button>
                        </div>
                        <button
                            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full"
                            onClick={toggleRequirements}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

                <table className="table-auto w-[100%] text-left">
                    <thead>
                        <tr className="bg-slate-200">
                            <th className="users-th p-6">#</th>
                            <th className="users-th">Student ID</th>
                            <th className="users-th">Course</th>
                            <th className="users-th">Year</th>
                            <th className="users-th">
                                <p className="flex justify-center">Section</p>
                            </th>
                            <th className="users-th">
                                <p className="flex justify-center"></p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {Students.map((student, index) => (
                            <tr key={student.student_id} className="hover:bg-gray-100">
                                <td className="users-td pt-6 pl-6">{index + 1}</td>
                                <td className="users-td pt-6">{student.student_id}</td>
                                <td className="users-td pt-6">{student.course}</td>
                                <td className="users-td pt-6">{student.year}</td>
                                <td className="users-td pt-6">
                                    <p className="justify-center flex">{student.section}</p>
                                </td>
                                <td
                                    className="users-td pt-6 hover:text-blue-400 cursor-pointer"
                                    onClick={() => handleReceiptClick(student)} // Set the student when clicked
                                >
                                    <p className="justify-center flex">View</p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Toggle/Modal Section */}
            {selectedStudent && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h2 className="text-lg font-semibold mb-4">Profile for {selectedStudent.name}</h2>
                        <img
                            src={selectedStudent.receipt}
                            alt={`${selectedStudent.name}`}
                            className="w-full h-auto object-contain mb-4"
                        />
                        <div className="flex justify-between">
                            <button
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                onClick={() => {
                                    alert('Approved');
                                    handleClose();
                                }}
                            >
                                Approve
                            </button>
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                onClick={() => {
                                    alert('Declined');
                                    handleClose();
                                }}
                            >
                                Decline
                            </button>
                        </div>
                        <button
                            className="mt-4 text-gray-500 underline w-full text-center"
                            onClick={handleClose}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            
        </div>
    );
};

export default ScholarshipOfficerStudent;