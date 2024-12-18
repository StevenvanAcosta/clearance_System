import React, { useState } from 'react';
import AdminHeader from '../../components/header/admin/AdminHeader';
import axios from 'axios';
import BpcLogo from "../../assets/bpclogo.png";

const AddUser = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    // student_id: '',
    course: '',
    // year: '',
    section: '',
    programHeadCourse: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const programHeadOptions = [
    'BSIS', 'BSAIS', 'BSOM', 'ACT', 'HRS', 'BTVTED',
    'CS', 'BSCA', 'DHRMT', 'EIM', 'SMAW', 'BKPG', 'COMSEC', 'HB'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: checked
          ? [...formData[name], value]
          : formData[name].filter((section) => section !== value),
      });
    } else if (name === 'role') {
      setFormData({
        ...formData,
        role: value,
        adviserSections: [],
        programHeadSections: [],
        programHeadCourse: '',
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.role) {
      setError('Please select a role.');
      return;
    }

    // if (formData.role === 'Student') {
    //   const requiredFields = ['student_id', 'course', 'year', 'section'];
    //   for (const field of requiredFields) {
    //     if (!formData[field]) {
    //       setError(`Please fill out the ${field.replace('_', ' ')} field.`);
    //       return;
    //     }
    //   }
    // }

    const studentFields =
      formData.role === 'Student'
        ? {}
        : {
            student_id: '',
            course: '',
            year: '',
            section: '',
          };

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/api/adduser', {
        ...formData,
        name: formData.name.trim(), // Trim the name field
        ...studentFields,
      });
      setMessage(response.data.message);
      setError('');
      setFormData({
        name: '',
        email: '',
        role: '',
        student_id: '',
        course: '',
        year: '',
        section: '',
        programHeadCourse: '',
      });
      setTimeout(() => {
        setMessage('');
      }, 5000);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'A network error occurred';
      setError(errorMessage);
      setMessage('');
    } finally {
      setLoading(false);
    }
  };

  const handleDismiss = () => {
    setMessage('');
  };

  return (
    <div className="w-full h-screen flex overflow-hidden">
      <AdminHeader />
      {message && (
        <div className="fixed top-0 w-full bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded flex items-center justify-between z-50">
          <span>{message}</span>
          <button onClick={handleDismiss} className="text-green-700 font-bold hover:text-green-900">
            ×
          </button>
        </div>
      )}
      {error && (
        <div className="fixed top-0 w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex items-center justify-between z-50">
          <span>{error}</span>
          <button onClick={() => setError('')} className="text-red-700 font-bold hover:text-red-900">
            ×
          </button>
        </div>
      )}

      <div className="w-full h-screen flex justify-center items-center">
        <form onSubmit={handleSubmit} className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
          <div className="flex flex-col gap-5 w-full">
            <img src={BpcLogo} alt="bpclogo" className="w-16 mx-auto" />
            <p className="font-semibold text-lg text-center">Add New User</p>
            <input
              type="text"
              className="w-full h-10 outline-1 outline outline-slate-300 rounded-lg p-2"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Fullname"
              required
            />
            <input
              type="email"
              className="w-full h-10 outline-1 outline outline-slate-300 rounded-lg p-2"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
            <select
              className="w-full h-10 outline-1 outline outline-slate-300 rounded-lg p-2"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select Signatory</option>
              <option value="Student">Student</option>
              <option value="Admin">Admin</option>
              <option value="PTCA">PTCA</option>
              <option value="Program Head">Program Head</option>
              <option value="MIS Office">MIS Office</option>
              <option value="Accounting Clerk">Accounting Clerk</option>
              <option value="SG Adviser">SG Adviser</option>
              <option value="Adviser">Adviser</option>
              <option value="Scholarship Officer">Scholarship Officer</option>
              <option value="Scholarship">Scholarship</option>
              <option value="Librarian">Librarian</option>
            </select>

            {formData.role === 'Program Head' && (
              <>
                <label className="flex justify-center">Select Program</label>
                <select
                  name="programHeadCourse"
                  value={formData.programHeadCourse}
                  onChange={handleChange}
                  className="w-full h-10 outline-1 outline outline-slate-300 rounded-lg p-2"
                  required
                >
                  <option value="" disabled>Select Course</option>
                  {programHeadOptions.map((program) => (
                    <option key={program} value={program}>
                      {program}
                    </option>
                  ))}
                </select>
              </>
            )}

            <button
              type="submit"
              className="bg-yellow-300 h-10 rounded-lg text-black hover:text-white font-semibold hover:bg-blue-500 w-full"
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
