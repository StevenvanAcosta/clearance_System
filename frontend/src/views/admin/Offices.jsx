import React, { useState, useEffect } from "react";
import AdminHeader from "../../components/header/admin/AdminHeader";
import { FaAngleDown } from "react-icons/fa";
import axios from 'axios';


const Offices = () => {
  // State for submenu visibility
  const [showSubMenu, setShowSubMenu] = useState(false);
  const yourAuthToken = localStorage.getItem('auth_token');
  // add office
  const [offices, setOffices] = useState([]);
  const [officeName, setOfficeName] = useState('');

  // State for Add Courses dialog
  const [showAddCoursesDialog, setShowAddCoursesDialog] = useState(false);
  const [showAddSchoolYearDialog, setShowAddSchoolYearDialog] = useState(false);
  const [showAddSection, setShowAddSectionDialog] = useState(false);
  // course
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({ course_code: "", course_description: "" });
  const [editingCourse, setEditingCourse] = useState(null); // Holds the course being edited
  // schoolyear
  const [schoolYear, setSchoolYear] = useState("");
  const [section, setSection] = useState("");

  // Toggle submenu
  const toggleSubMenu = () => {
    setShowSubMenu((prev) => !prev);
  };

  // Handle adding a new school year
  const handleAddSchoolYear = () => {
    if (schoolYear) {
      alert(`School Year ${schoolYear} added.`);
      setSchoolYear(""); // Reset input field
      setShowAddSchoolYearDialog(false); // Close the dialog
    } else {
      alert("Please enter a valid school year.");
    }
  };


 // Fetch offices from API
 useEffect(() => {
  axios.get('http://localhost:8000/api/offices')
    .then(response => {
      console.log('Fetched offices:', response.data);
      setOffices(response.data);  // Ensure this contains an array of offices
    })
    .catch(error => {
      console.error('Error fetching offices:', error);
    });
}, []);


// Handle Add Office
const handleAddOffice = () => {
  if (officeName.trim()) {
    axios.post('http://localhost:8000/api/offices', { office_name: officeName })
      .then(response => {
        console.log('Added office:', response.data);  // Add logging
        setOffices(prevOffices => [...prevOffices, response.data.data]);
        setOfficeName('');
        alert('Office added successfully!');  // Success alert
      })
      .catch(error => {
        console.error('Error adding office:', error);
        alert('Error adding office. Please try again.');  // Error alert
      });
  } else {
    alert('Office name cannot be empty!');  // Validation alert
  }
};

// Handle Delete Office with confirmation
const handleDeleteOffice = (id) => {
  const isConfirmed = window.confirm("Are you sure you want to delete this office?");
  if (isConfirmed) {
    axios.delete(`http://localhost:8000/api/offices/${id}`)
      .then(() => {
        console.log('Deleted office with ID:', id);  // Add logging
        setOffices(prevOffices => prevOffices.filter(office => office.id !== id));
        alert('Office deleted successfully!');  // Success alert
      })
      .catch(error => {
        console.error('Error deleting office:', error);
        alert('Error deleting office. Please try again.');  // Error alert
      });
  } else {
    alert('Office deletion canceled.');  // User canceled the deletion
  }
};


// Handle Edit Office
const handleEditOffice = (id) => {
  const newOfficeName = prompt("Enter new office name:");
  if (newOfficeName && newOfficeName !== '') {
    axios.put(`http://localhost:8000/api/offices/${id}`, { office_name: newOfficeName })
      .then(response => {
        console.log('Updated office:', response.data);  // Add logging
        setOffices(prevOffices => prevOffices.map(office => 
          office.id === id ? response.data.data : office
        ));
        alert('Office updated successfully!');  // Success alert
      })
      .catch(error => {
        console.error('Error updating office:', error);
        alert('Error updating office. Please try again.');  // Error alert
      });
  } else {
    alert('New office name cannot be empty!');  // Validation alert
  }
};


  //------------------------------ ADD SECTION ----------------------------
  const handleAddSection = async () => {
    if (section) {
      try {
        // API request to create a new section
        const response = await fetch('http://localhost:8000/api/add-section', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${yourAuthToken}`, // Include the authentication token
          },
          body: JSON.stringify({
            section_field: section, // Send the section input from state
          }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          alert(`Section "${data.section.section_field}" added successfully.`); // Corrected field name
          setSection(''); // Clear the section input field
          setShowAddSectionDialog(false); // Close the dialog
        } else {
          alert(data.message || 'Failed to add section.'); // Handle API error
        }
      } catch (error) {
        console.error('Error:', error);
        alert('This Section is Duplicate');
      }
    } else {
      alert('Please enter a valid section.');
    }
  };
  
// Add course handler
const handleAddCourse = async () => {
  try {
    const response = await axios.post("http://localhost:8000/api/courses", {
      course_code: newCourse.course_code,
      course_description: newCourse.course_description,
    });

    if (response.status === 201) {
      setCourses([...courses, response.data.data]);
      setNewCourse({ course_code: "", course_description: "" });
      setShowAddCoursesDialog(false);
    }
  } catch (error) {
    console.error("Error adding course:", error.response ? error.response.data : error.message);
  }
};

// Handle delete course
const handleDeleteCourse = async (index) => {
  const courseToDelete = courses[index];
  if (window.confirm(`Are you sure you want to delete the course "${courseToDelete.course_code}"?`)) {
    try {
      await axios.delete(`http://localhost:8000/api/courses/${courseToDelete.id}`);
      const updatedCourses = courses.filter((_, i) => i !== index);
      setCourses(updatedCourses);
    } catch (error) {
      console.error("Error deleting course:", error.response ? error.response.data : error.message);
    }
  }
};

// Handle edit course
const handleEditCourse = (index) => {
  setEditingCourse({ ...courses[index], index });
};

// Handle update course
const handleUpdateCourse = async () => {
  try {
    const response = await axios.put(`http://localhost:8000/api/courses/${editingCourse.id}`, {
      course_code: editingCourse.course_code,
      course_description: editingCourse.course_description,
    });

    if (response.status === 200) {
      const updatedCourses = [...courses];
      updatedCourses[editingCourse.index] = response.data.data;
      setCourses(updatedCourses);
      setEditingCourse(null);
    }
  } catch (error) {
    console.error("Error updating course:", error.response ? error.response.data : error.message);
  }
};
  

  return (
    <div className="w-full h-screen flex overflow-hidden">
      <AdminHeader />
      <div className="w-full h-full p-4">
        {/* Manage Button with Submenu */}
        <div className="relative flex justify-end">
          <button
            onClick={toggleSubMenu}
            className="bg-blue-500 text-white px-4 py-2 rounded-md flex justify-center items-center gap-3 hover:bg-blue-600"
          >
            Manage
            <FaAngleDown />
          </button>

          {/* Submenu */}
          {showSubMenu && (
            <div className="absolute mt-10 bg-white shadow-lg rounded-md border z-10 w-48">
              <ul className="py-2">
                <li className="hover:bg-gray-100">
                  <button
                    className="w-full text-left px-4 py-2"
                    onClick={() => setShowAddCoursesDialog(true)} // Show the Add Courses dialog
                  >
                    Courses
                  </button>
                </li>
                <li className="hover:bg-gray-100">
                  <button
                    className="w-full text-left px-4 py-2"
                    onClick={() => setShowAddSchoolYearDialog(true)} // Show the Add School Year dialog
                  >
                    School Year
                  </button>
                </li>
                <li className="hover:bg-gray-100">
                  <button
                    className="w-full text-left px-4 py-2"
                    onClick={() => setShowAddSectionDialog(true)} // Show the Add School Year dialog
                  >
                    Section
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Manage Offices */}
        <div className="w-full flex h-screen">
       <div className="w-1/2 h-screen">
      <p className="text-2xl">Manage Offices</p>
      <div className="w-full h-fit flex gap-2 pb-2 pt-2">
        <input
          type="text"
          value={officeName}
          onChange={(e) => setOfficeName(e.target.value)}
          placeholder="Add Office"
          className="outline outline-1 p-1 outline-slate-200"
        />
        <button
          onClick={handleAddOffice}
          className="bg-blue-500 p-2 text-white rounded-lg">
          Add
        </button>
      </div>
      <table className="table-auto w-full text-center border border-collapse border-gray-200">
        <thead className="bg-slate-200 h-10">
          <tr>
            <th>Offices</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {offices.map(office => (
            <tr key={office.id} className="hover:bg-slate-100">
              <td>{office.office_name}</td>
              <td>
                <button
                  onClick={() => handleEditOffice(office.id)}
                  className="bg-blue-500 text-white p-1">
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteOffice(office.id)}
                  className="bg-red-500 text-white p-1">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
          <div className="w-1/2 h-screen p-2">
            <p className=" text-2xl mb-3">Create Signatory</p>
            <div className="w-full h-screen flex gap-2 flex-col">
              <input type="text" placeholder="Enter Fullname" className="h-10 outline outline-1 outline-slate-300 p-2"/>
              <input type="text" placeholder="Email" className="h-10 outline outline-1 outline-slate-300 p-2"/>
              {/* Populate the select with options dynamically */}
                <select 
                  className="h-10 outline outline-1 outline-slate-300"
                  value={officeName}
                  onChange={(e) => setOfficeName(e.target.value)}
                >
                  <option value="" disabled>Select Office</option>
                  {/* Dynamically render the office options */}
                  {offices.map((office) => (
                    <option key={office.id} value={office.office_name}>
                      {office.office_name}
                    </option>
                  ))}
                </select>
              <div className="w-full h-96 flex items-end justify-end">
                <button className="bg-blue-500 w-[20%] rounded-lg h-10 hover:bg-green-500 text-white p-1">Add</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Courses Floating Dialog */}
      {showAddCoursesDialog && (
         <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
         <div className="bg-white p-6 rounded shadow-lg w-96">
           <h2 className="text-lg font-semibold mb-4">Add Courses</h2>
           <div className="mb-4">
             <label className="block text-sm">Course Code</label>
             <input
               type="text"
               className="w-full p-2 border rounded"
               value={newCourse.course_code}
               onChange={(e) => setNewCourse({ ...newCourse, course_code: e.target.value })}
             />
           </div>
           <div className="mb-4">
             <label className="block text-sm">Course Description</label>
             <input
               type="text"
               className="w-full p-2 border rounded"
               value={newCourse.course_description}
               onChange={(e) => setNewCourse({ ...newCourse, course_description: e.target.value })}
             />
           </div>
           <div className="flex justify-end gap-2">
             <button
               className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
               onClick={() => setShowAddCoursesDialog(false)}
             >
               Cancel
             </button>
             <button
               className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
               onClick={handleAddCourse}
             >
               Add
             </button>
           </div>
   
           {/* Courses Table */}
             <table className="table-auto w-full mt-4 border-collapse border">
               <thead>
                 <tr>
                   <th className="border px-2 py-1">Course Code</th>
                   <th className="border px-2 py-1">Course Description</th>
                   <th className="border px-2 py-1">Action</th>
                 </tr>
               </thead>
               <tbody>
                 {courses.map((course, index) => (
                   <tr key={index}>
                     <td className="border px-2 py-1">{course.course_code}</td>
                     <td className="border px-2 py-1">{course.course_description}</td>
                     <td className="border px-2 py-1 flex justify-center gap-2">
                       <button
                         className="bg-blue-500 text-white px-2 py-1 rounded"
                         onClick={() => handleEditCourse(index)}
                       >
                         Edit
                       </button>
                       <button
                         className="bg-red-500 text-white px-2 py-1 rounded"
                         onClick={() => handleDeleteCourse(index)}
                       >
                         Delete
                       </button>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>

   
           {/* Edit Modal */}
           {editingCourse && (
             <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
               <div className="bg-white p-6 rounded shadow-lg w-96">
                 <h2 className="text-lg font-semibold mb-4">Edit Course</h2>
                 <div className="mb-4">
                   <label className="block text-sm">Course Code</label>
                   <input
                     type="text"
                     className="w-full p-2 border rounded"
                     value={editingCourse.course_code}
                     onChange={(e) =>
                       setEditingCourse({ ...editingCourse, course_code: e.target.value })
                     }
                   />
                 </div>
                 <div className="mb-4">
                   <label className="block text-sm">Course Description</label>
                   <input
                     type="text"
                     className="w-full p-2 border rounded"
                     value={editingCourse.course_description}
                     onChange={(e) =>
                       setEditingCourse({ ...editingCourse, course_description: e.target.value })
                     }
                   />
                 </div>
                 <div className="flex justify-end gap-2">
                   <button
                     className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                     onClick={() => setEditingCourse(null)}
                   >
                     Cancel
                   </button>
                   <button
                     className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                     onClick={handleUpdateCourse}
                   >
                     Save
                   </button>
                 </div>
               </div>
             </div>
           )}
         </div>
       </div>
   
      )}

      {/* Add School Year Floating Dialog */}
      {showAddSchoolYearDialog && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Add School Year</h2>
            <div className="mb-4">
              <label className="block text-sm">School Year</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={schoolYear}
                onChange={(e) => setSchoolYear(e.target.value)}
                placeholder="Enter School Year (e.g., 2024-2025)"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                onClick={() => setShowAddSchoolYearDialog(false)} // Close the dialog
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                onClick={handleAddSchoolYear} // Add the school year
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Add Section Floating Dialog */}
      {showAddSection && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Add Section</h2>
            <div className="mb-4">
              <label className="block text-sm">Section</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={section}
                maxLength={1}
                onChange={(e) => setSection(e.target.value)}
                placeholder="Enter Section for Filtering"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                onClick={() => setShowAddSectionDialog(false)} // Close the dialog
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                onClick={handleAddSection} // Add the Section
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Offices;
