import { useEffect, useState } from "react";

const FeatureTable = () => {
  const [features, setFeatures] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const [showAddStudentForm, setShowAddStudentForm] = useState(false);
  const [newStudent, setNewStudent] = useState({
    student_id: "",
    fullname: "",
    email: "", // Added email field
    course: "",
    year: "",
    section: "",
  });

  // Fetch features data
  const fetchFeatures = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/feature");
      if (!response.ok) throw new Error("Failed to fetch features");
      const data = await response.json();
      setFeatures(data);
    } catch (error) {
      setError(error.message);
      console.error("Error fetching features:", error);
    }
  };

  useEffect(() => {
    fetchFeatures();
    const intervalId = setInterval(fetchFeatures, 5000);
    return () => clearInterval(intervalId);
  }, []);

  // Add student function
  const addStudent = async () => {
    try {
      // Validate required fields
      const { student_id, fullname, email, course, year, section } = newStudent;
      if (!student_id || !fullname || !email || !course || !year || !section) {
        alert("All fields are required. Please fill out every field.");
        return;
      }
  
      const response = await fetch("http://localhost:8000/api/add-student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStudent),
      });
  
      if (!response.ok) throw new Error("Failed to add student");
      alert("Student added successfully!");
  
      // Refresh features table
      fetchFeatures();
      setShowAddStudentForm(false);
      setNewStudent({
        student_id: "",
        fullname: "",
        email: "", // Reset email field
        course: "",
        year: "",
        section: "",
      });
    } catch (error) {
      console.error("Error adding student:", error);
      alert("Error adding student: " + error.message);
    }
  };
  
  const filteredFeatures = features.filter((feature) =>
    Object.values(feature).some((val) =>
      String(val).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="overflow-x-auto w-full h-full">
      {error && <div className="text-red-500">{error}</div>}

      <div className="flex justify-between p-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search"
          className="p-2 border w-[35%] border-gray-300 rounded"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => setShowAddStudentForm(true)}
        >
          Add Student
        </button>
      </div>

      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-slate-500">
            <th className="px-4 py-2 border">Student Id</th>
            <th className="px-4 py-2 border">Fullname</th>
            <th className="px-4 py-2 border">Email</th> {/* Email column */}
            <th className="px-4 py-2 border">Course</th>
            <th className="px-4 py-2 border">Year</th>
            <th className="px-4 py-2 border">Section</th>
          </tr>
        </thead>
        <tbody>
          {filteredFeatures.length > 0 ? (
            filteredFeatures.map((feature) => (
              <tr key={feature.id}>
                <td className="border px-4 py-2">{feature.student_id}</td>
                <td className="border px-4 py-2">{feature.fullname}</td>
                <td className="border px-4 py-2">{feature.email}</td> {/* Email value */}
                <td className="border px-4 py-2">{feature.course}</td>
                <td className="border px-4 py-2">{feature.year}</td>
                <td className="border px-4 py-2">{feature.section}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-2">
                No results found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {showAddStudentForm && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded shadow-lg w-96">
          <h2 className="text-lg font-semibold mb-4">Add Student</h2>
          {["student_id", "fullname", "email", "course", "year", "section"].map((field) => (
            <div key={field} className="mb-2">
              <label className="block text-sm capitalize">{field.replace("_", " ")}</label>
              <input
                type={
                  field === "email"
                    ? "email"
                    : field === "year"
                    ? "number"
                    : "text"
                } // Use number type for year field
                className="w-full p-2 border rounded"
                value={newStudent[field]}
                onChange={(e) => {
                  // Limit year field to 4 digits
                  if (field === "year" && e.target.value.length > 1) {
                    return;
                  }
                  setNewStudent({ ...newStudent, [field]: e.target.value });
                }}
                min={field === "year" ? 1 : undefined}
                max={field === "year" ? 4 : undefined}
              />
            </div>
          ))}
          <div className="flex justify-end mt-4">
            <button
              className="bg-gray-400 text-white px-4 py-2 rounded mr-2 hover:bg-gray-500"
              onClick={() => setShowAddStudentForm(false)}
            >
              Cancel
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              onClick={addStudent}
            >
              Save
            </button>
          </div>
        </div>
      </div>
      
      
      )}
    </div>
  );
};

export default FeatureTable;
