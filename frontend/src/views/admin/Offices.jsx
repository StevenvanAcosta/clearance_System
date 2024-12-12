import React, { useState, useEffect } from 'react';
import AdminHeader from '../../components/header/admin/AdminHeader';
import axios from 'axios';

const Offices = () => {
  const [activeSection, setActiveSection] = useState(''); // Tracks the active section
  const [offices, setOffices] = useState([]); // State to store offices
  const [officeName, setOfficeName] = useState(''); // State for new office input
  const [editOfficeId, setEditOfficeId] = useState(null); // Store id of office being edited
  const [selectedSignatoryType, setSelectedSignatoryType] = useState(''); // State for selected signatory type
  const [fullname, setFullname] = useState(''); // Full name for the signatory
  const [email, setEmail] = useState(''); // Email for the signatory
  const [errorMessages, setErrorMessages] = useState({}); // Store validation errors

  // COURSES VARIABLE!!!!
  const [courses, setCourses] = useState([]);
const [courseCode, setCourseCode] = useState('');
const [courseDescription, setCourseDescription] = useState('');
const [editingCourse, setEditingCourse] = useState(null);
const [isSubmitting, setIsSubmitting] = useState(false);

// Fetch courses on component mount
useEffect(() => {
  fetchCourses();
}, []);

const fetchCourses = async () => {
  setIsSubmitting(true);
  try {
    const response = await fetch('http://localhost:8000/api/courses');
    if (!response.ok) {
      throw new Error(`Failed to fetch courses: ${response.statusText}`);
    }
    const data = await response.json();
    setCourses(data);
  } catch (error) {
    console.error('Error fetching courses:', error);
  } finally {
    setIsSubmitting(false);
  }
};

const handleInputChange = (e) => {
  const { name, value } = e.target;
  if (name === 'courseCode') {
    setCourseCode(value);
  } else if (name === 'courseDescription') {
    setCourseDescription(value);
  }
};

const handleSaveCourse = async () => {
  if (!courseCode.trim() || !courseDescription.trim()) {
    alert('Both Course Code and Description are required.');
    return;
  }

  setIsSubmitting(true);

  // Check if we're in editing mode
  if (editingCourse) {
    try {
      const response = await fetch(`http://localhost:8000/api/courses/${editingCourse}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          course_code: courseCode,
          course_description: courseDescription,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.message || 'Error occurred while updating the course');
        return;
      }

      alert('Course updated successfully!');
      setCourseCode('');
      setCourseDescription('');
      setEditingCourse(null);
      fetchCourses(); // Automatically refresh list after update
    } catch (error) {
      console.error('Error editing course:', error);
      alert('Failed to connect to the server.');
    } finally {
      setIsSubmitting(false);
    }
  } else {
    try {
      const response = await fetch('http://localhost:8000/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          course_code: courseCode,
          course_description: courseDescription,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.message || 'Error occurred while saving the course');
        return;
      }

      alert('Course created successfully!');
      setCourseCode('');
      setCourseDescription('');
      fetchCourses(); // Automatically refresh list after saving
    } catch (error) {
      console.error('Error saving course:', error);
      alert('Failed to connect to the server.');
    } finally {
      setIsSubmitting(false);
    }
  }
};

const handleEditCourse = (id, courseCode, courseDescription) => {
  setEditingCourse(id);
  setCourseCode(courseCode);
  setCourseDescription(courseDescription);
};

const handleDeleteCourse = async (id) => {
  if (!window.confirm('Are you sure you want to delete this course?')) return;

  setIsSubmitting(true);
  try {
    const response = await fetch(`http://localhost:8000/api/courses/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const error = await response.json();
      alert(error.message || 'Error occurred while deleting the course');
      return;
    }

    alert('Course deleted successfully!');
    fetchCourses(); // Automatically refresh list after deletion
  } catch (error) {
    console.error('Error deleting course:', error);
    alert('Failed to connect to the server.');
  } finally {
    setIsSubmitting(false);
  }
};


  // Fetch offices on component mount
  useEffect(() => {
    fetchOffices();
  }, []);

  // Fetch offices from the API
  const fetchOffices = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/offices');
      setOffices(response.data); // Assuming the response contains an array of offices
    } catch (error) {
      if (error.response) {
        console.error('Error fetching offices:', error.response.data);
        alert('Error fetching offices: ' + error.response.data.message);
      } else {
        console.error('Network error:', error);
        alert('Network error: Please check your internet connection.');
      }
    }
  };

  // Toggle the active section
  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? '' : section); // Toggle logic
  };

  // Handle office name change for new office
  const handleOfficeNameChange = (event) => {
    setOfficeName(event.target.value);
  };

  // Add a new office
  const handleAddOffice = async () => {
    if (!officeName) {
      alert('Please provide a valid office name.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/offices', { office_name: officeName });
      setOffices([...offices, response.data.data]); // Add new office to the list
      setOfficeName(''); // Clear input field
    } catch (error) {
      console.error('Error adding office:', error);
    }
  };

  // Handle editing an office
  const handleEditOffice = async (id, name) => {
    setEditOfficeId(id);
    setOfficeName(name);
  };

  // Save edited office
  const handleSaveEdit = async () => {
    if (!officeName) {
      alert('Please provide a valid office name.');
      return;
    }
    if (!editOfficeId) {
      alert('Invalid office ID.');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:8000/api/offices/${editOfficeId}`, { office_name: officeName });
      const updatedOffices = offices.map((office) =>
        office.id === editOfficeId ? response.data.data : office
      );
      setOffices(updatedOffices);
      setOfficeName(''); // Clear input field
      setEditOfficeId(null); // Clear editing state
    } catch (error) {
      console.error('Error updating office:', error);
    }
  };

  // Handle deleting an office
  const handleDeleteOffice = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/offices/${id}`);
      setOffices(offices.filter((office) => office.id !== id)); // Remove deleted office from list
    } catch (error) {
      console.error('Error deleting office:', error);
    }
  };

  // Handle signatory type selection
  const handleSignatoryTypeChange = (event) => {
    setSelectedSignatoryType(event.target.value);
  };

  // Handle input changes for fullname and email
  const handleFullnameChange = (event) => {
    setFullname(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // Create signatory function
  const handleCreateSignatory = async () => {
    if (!selectedSignatoryType || !fullname || !email) {
      alert('Please fill all fields.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/signatory', {
        signatory_office: selectedSignatoryType,
        fullname,
        email,
      });
      alert('Signatory created successfully!');
      // Reset fields after success
      setSelectedSignatoryType('');
      setFullname('');
      setEmail('');
    } catch (error) {
      if (error.response) {
        if (error.response.status === 422) {
          setErrorMessages(error.response.data.errors);
        } else {
          alert('Server Error: ' + error.response.data.message);
        }
      } else {
        console.error('Error:', error);
        alert('An error occurred');
      }
    }
  };

  return (
    <div className='w-full flex h-screen py-2 overflow-hidden'>
      <AdminHeader />
      <div className='w-1/2 flex flex-col gap-2 h-full p-2'>
        <div className='flex flex-col gap-2'>
          <button
            className={`w-full h-10 ${activeSection === 'signatory' ? 'bg-blue-700 text-white' : 'bg-blue-500 text-white'}`}
            onClick={() => toggleSection('signatory')}
          >
            Manage Offices
          </button>
          <button
            className={`w-full h-10 ${activeSection === 'courses' ? 'bg-blue-700 text-white' : 'bg-blue-500 text-white'}`}
            onClick={() => toggleSection('courses')}
          >
            Add Courses
          </button>
          <button
            className={`w-full h-10 ${activeSection === 'yearLevel' ? 'bg-blue-700 text-white' : 'bg-blue-500 text-white'}`}
            onClick={() => toggleSection('yearLevel')}
          >
            Add Year Level
          </button>
          <button
            className={`w-full h-10 ${activeSection === 'schoolYear' ? 'bg-blue-700 text-white' : 'bg-blue-500 text-white'}`}
            onClick={() => toggleSection('schoolYear')}
          >
            Add School Year
          </button>
        </div>
      </div>

      {/* SIGNATORY SECTION */}
      <div className='w-full h-full overflow-hidden p-2'>
        {activeSection === 'signatory' && (
          <div className="w-full h-1/2">
          <h2 className="text-lg font-bold">Manage Offices</h2>
          <div className="w-full h-1/2">
            <div className="w-full h-fit flex justify-end">
              <input
                type="text"
                placeholder="Add Office"
                value={officeName}
                onChange={handleOfficeNameChange}
                className="outline outline-1 p-2 outline-slate-200 mb-2 h-10"
              />
              <button
                className="bg-blue-500 text-white p-2 rounded-lg mb-2 ml-2"
                onClick={editOfficeId ? handleSaveEdit : handleAddOffice}
                disabled={!officeName}
              >
                {editOfficeId ? 'Save' : 'Add'}
              </button>
            </div>
            <table className="table-fixed w-[100%] text-left">
              <thead>
                <tr className="bg-slate-300 h-10">
                  <th>
                    <p className="flex justify-center">Offices</p>
                  </th>
                  <th>
                    <p className="flex justify-center">Action</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {offices.map((office) => (
                  <tr key={office.id}>
                    <td className="p-2">
                      <p className="flex justify-center">{office.office_name}</p>
                    </td>
                    <td className="flex justify-center p-2">
                      <button
                        className="bg-blue-400 h-10 text-white"
                        onClick={() => handleEditOffice(office.id, office.office_name)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-400 h-10 text-white ml-2"
                        onClick={() => handleDeleteOffice(office.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="w-full h-full">
              <p>Create Signatory</p>
              <div className="w-full h-full flex flex-col p-10 gap-3">
                <select
                  className="h-10 w-full outline outline-1 outline-slate-300"
                  value={selectedSignatoryType}
                  onChange={handleSignatoryTypeChange}
                >
                  <option value="">Select Type of Signatory</option>
                  {offices.map((office) => (
                    <option key={office.id} value={office.office_name}>
                      {office.office_name}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Fullname"
                  className="h-10 outline outline-1 outline-slate-300"
                  value={fullname}
                  onChange={handleFullnameChange}
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="h-10 outline outline-1 outline-slate-300"
                  value={email}
                  onChange={handleEmailChange}
                />
                <button
                  className="bg-blue-500 text-white p-2 rounded-lg"
                  onClick={handleCreateSignatory}
                >
                  Create Signatory
                </button>
              </div>
            </div>
          </div>
        </div>
        )}
         
           {/* Additional Year Level (Courses, Year Level, School Year) */}
           {activeSection === 'courses' && 
            <div>Add Courses
            <div className='w-full h-1/2'>
              <div className='w-full h-fit flex justify-end'>
                <input
                  type='text'
                  placeholder='Course Code'
                  value={courseCode}
                  onChange={handleInputChange}
                  name="courseCode"
                  className='outline outline-1 p-2 outline-slate-200 mb-2 h-10'
                />
                <input
                  type='text'
                  placeholder='Course Description'
                  value={courseDescription}
                  onChange={handleInputChange}
                  name="courseDescription"
                  className='outline outline-1 p-2 outline-slate-200 mb-2 h-10 ml-2'
                />
                <button
                  className='bg-blue-500 text-white p-2 rounded-lg mb-2 ml-2'
                  onClick={editingCourse ? handleSaveCourse : handleSaveCourse}
                  disabled={!courseCode || !courseDescription}
                >
                  {editingCourse ? 'Save' : 'Add'}
                </button>
              </div>
              <table className='table-fixed w-[100%] text-left'>
                <thead>
                  <tr className='bg-slate-300 h-10'>
                    <th><p className='flex justify-center'>Course Code</p></th>
                    <th><p className='flex justify-center'>Course Description</p></th>
                    <th><p className='flex justify-center'>Action</p></th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course) => (
                    <tr key={course.id}>
                      <td className='p-2'>{course.course_code}</td>
                      <td className='p-2'>{course.course_description}</td>
                      <td className='flex p-2'>
                        <button
                          className='bg-blue-400 h-10 text-white'
                          onClick={() => handleEditCourse(course.id, course.course_code, course.course_description)}
                        >
                          Edit
                        </button>
                        <button
                          className='bg-red-400 h-10 text-white ml-2'
                          onClick={() => handleDeleteCourse(course.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
}
           {activeSection === 'yearLevel' && 
           <div>Manage Courses
           <div className='w-full h-1/2'>
             <div className='w-full h-fit flex justify-end'>
               <input
                 type='text'
                 placeholder='Course Code'
                 value={courseCode}
                 onChange={handleInputChange}
                 name="courseCode"
                 className='outline outline-1 p-2 outline-slate-200 mb-2 h-10'
               />
               <input
                 type='text'
                 placeholder='Course Description'
                 value={courseDescription}
                 onChange={handleInputChange}
                 name="courseDescription"
                 className='outline outline-1 p-2 outline-slate-200 mb-2 h-10 ml-2'
               />
               <button
                 className='bg-blue-500 text-white p-2 rounded-lg mb-2 ml-2'
                 onClick={editingCourse ? handleSaveCourse : handleSaveCourse}
                 disabled={!courseCode || !courseDescription}
               >
                 {editingCourse ? 'Save' : 'Add'}
               </button>
             </div>
             <table className='table-fixed w-[100%] text-left'>
               <thead>
                 <tr className='bg-slate-300 h-10'>
                   <th><p className='flex justify-center'>Year Level</p></th>
                   <th><p className='flex justify-center'>Course Description</p></th>
                   <th><p className='flex justify-center'>Action</p></th>
                 </tr>
               </thead>
               <tbody>
                 {courses.map((course) => (
                   <tr key={course.id}>
                     <td className='p-2'>{course.course_code}</td>
                     <td className='p-2'>{course.course_description}</td>
                     <td className='flex p-2'>
                       <button
                         className='bg-blue-400 h-10 text-white'
                         onClick={() => handleEditCourse(course.id, course.course_code, course.course_description)}
                       >
                         Edit
                       </button>
                       <button
                         className='bg-red-400 h-10 text-white ml-2'
                         onClick={() => handleDeleteCourse(course.id)}
                       >
                         Delete
                       </button>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
         </div>
           }
          {activeSection === 'schoolYear' && <div>Manage School Year Content</div>}
      </div>
    </div>
  );
};

export default Offices;
