import React, { useState } from 'react';
import { Students } from '../../constant/ConstantApproved';
import AdviserHeader from '../../components/header/adviser/AdviserHeader';

const AdviserStudent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [department, setDepartment] = useState('');
  const [year, setYear] = useState('');
  const [section, setSection] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null); // To hold the currently selected student

  // Filter logic for the students list
  const filteredStudents = Students.filter((student) => {
    const matchesSearchQuery =
      searchQuery === '' ||
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.student_id.toString().includes(searchQuery);

    const matchesDepartment = department === '' || student.course === department;

    const matchesYear = year === '' || student.year === year;

    const matchesSection = section === '' || student.section === section;

    return matchesSearchQuery && matchesDepartment && matchesYear && matchesSection;
  });

  // Function to handle receipt click
  const handleReceiptClick = (student) => {
    setSelectedStudent(student); // Set the clicked student as the selected student
  };

  // Function to close the modal
  const handleClose = () => {
    setSelectedStudent(null); // Reset selected student to null
  };

  // Function to handle approval/decline actions
  const handleAction = (action) => {
    alert(`${action} action performed for ${selectedStudent.name}`);
    handleClose();
  };

  return (
    <div className="w-full h-screen flex overflow-hidden">
      <AdviserHeader />
      <div className="w-full h-full p-4">
        <p className="flex justify-center text-lg font-semibold mb-5">List of Students</p>
        <div className="flex justify-between p-4 gap-5">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search by Student ID or Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg w-1/3"
          />

          {/* Department Filter */}
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg w-1/3"
          >
            <option value="">Select Department</option>
            <option value="BSIS">BSIS</option>
            <option value="BSOM">BSOM</option>
            <option value="BTVTED">BTVTED</option>
            <option value="BSAIS">BSAIS</option>
            <option value="HRS">HRS</option>
            <option value="CS">CS</option>
          </select>

          {/* Year Filter */}
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg w-1/3"
          >
            <option value="">Select Year</option>
            <option value="First Year">First Year</option>
            <option value="Second Year">Second Year</option>
            <option value="Third Year">Third Year</option>
            <option value="Fourth Year">Fourth Year</option>
          </select>

          {/* Section Filter */}
          <select
            value={section}
            onChange={(e) => setSection(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg w-1/3"
          >
            <option value="">Select Section</option>
            {Array.from({ length: 13 }, (_, i) => (
              <option key={i} value={String.fromCharCode(65 + i)}>
                {String.fromCharCode(65 + i)}
              </option>
            ))}
          </select>
        </div>

        {/* Students Table */}
        <table className="table-auto w-[100%] text-left">
          <thead>
            <tr className="bg-slate-200">
              <th className="users-th p-6">#</th>
              <th className="users-th">Name</th>
              <th className="users-th">Student ID</th>
              <th className="users-th">Course</th>
              <th className="users-th">Year</th>
              <th className="users-th">Section</th>
              <th className="users-th">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student, index) => (
                <tr key={student.student_id} className="hover:bg-gray-100">
                  <td className="users-td pt-6 pl-6">{index + 1}</td>
                  <td className="users-td pt-6">{student.name}</td>
                  <td className="users-td pt-6">{student.student_id}</td>
                  <td className="users-td pt-6">{student.course}</td>
                  <td className="users-td pt-6">{student.year}</td>
                  <td className="users-td pt-6">{student.section}</td>
                  <td
                    className="users-td pt-6 hover:text-blue-400 cursor-pointer"
                    onClick={() => handleReceiptClick(student)}
                  >
                    View
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center p-6">
                  No students found matching the criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Section */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-lg font-semibold mb-4">
              Profile for {selectedStudent.name}
            </h2>
            {selectedStudent.receipt ? (
              <img
                src={selectedStudent.receipt}
                alt={`${selectedStudent.name}`}
                className="w-full h-auto object-contain mb-4"
              />
            ) : (
              <p>No receipt available for this student.</p>
            )}
            <div className="flex justify-between">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                onClick={() => handleAction('Approve')}
              >
                Approve
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={() => handleAction('Decline')}
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

export default AdviserStudent;
