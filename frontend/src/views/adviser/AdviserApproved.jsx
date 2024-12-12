import React, { useState } from 'react';
import { Students } from '../../constant/ConstantApproved';
import AdviserHeader from '../../components/header/adviser/AdviserHeader';

const AdviserApproved = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [department, setDepartment] = useState('');
  const [year, setYear] = useState('');
  const [section, setSection] = useState('');

  // Filter logic for the students list
  const filteredStudents = Students.filter((student) => {
    const matchesSearchQuery =
      searchQuery === '' ||
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.student_id.toString().includes(searchQuery);

    const matchesDepartment =
      department === '' || student.course === department;

    const matchesYear = year === '' || student.year === year;

    const matchesSection = section === '' || student.section === section;

    return (
      matchesSearchQuery && matchesDepartment && matchesYear && matchesSection
    );
  });

  return (
    <div className="w-full h-screen flex overflow-hidden">
      <AdviserHeader />
      <div className="w-full h-full p-4">
        <p className="flex justify-center text-lg font-semibold mb-5">
          List of Approved
        </p>
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
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-6">
                  No students found matching the criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdviserApproved;
