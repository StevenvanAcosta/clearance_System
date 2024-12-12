// import { useEffect, useState } from "react";

// const FeatureTable = () => {
//   // State to store the fetched features data
//   const [features, setFeatures] = useState([]);
//   // State to store error messages if any
//   const [error, setError] = useState(null);

//   // Function to fetch features from the API
//   const fetchFeatures = async () => {
//     try {
//       // Fetch data from API
//       const response = await fetch("http://localhost:8000/api/feature");

//       // Check if response is okay
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || "Failed to fetch features");
//       }

//       // Parse the response data and update the state
//       const data = await response.json();
//       setFeatures(data);
//     } catch (error) {
//       // Set error message in state if any error occurs
//       setError(error.message);
//       console.error("There was an error fetching the features:", error);
//     }
//   };

//   // Fetch features data when the component mounts and set up auto-refresh
//   useEffect(() => {
//     // Fetch data initially
//     fetchFeatures();

//     // Set up an interval to refresh the data
//     const intervalId = setInterval(fetchFeatures, 5000); // Refresh every 5 seconds

//     // Clean up the interval on component unmount
//     return () => clearInterval(intervalId);
//   }, []);

//   return (
//     <div className="overflow-x-auto w-full h-full">
//       {/* Display error message if there's an error */}
//       {error && <div className="error-message text-red-500">{error}</div>}
//       <table className="min-w-full table-auto border-collapse ">
//         <thead>
//           <tr className="bg-slate-500">
//             <th className="px-4 py-2 border">Student Id</th>
//             <th className="px-4 py-2 border">Fullname</th>
//             <th className="px-4 py-2 border">Email</th>
//             <th className="px-4 py-2 border">Course</th>
//             <th className="px-4 py-2 border">Year</th>
//             <th className="px-4 py-2 border">Section</th>
//           </tr>
//         </thead>
//         <tbody>
//           {/* Map over the features array and display each feature in a row */}
//           {features.map((feature) => (
//             <tr key={feature.id}>
//               <td className="border px-4 py-2">{feature.student_id}</td>
//               <td className="border px-4 py-2">{feature.fullname}</td>
//               <td className="border px-4 py-2">{feature.email}</td>
//               <td className="border px-4 py-2">{feature.course}</td>
//               <td className="border px-4 py-2">{feature.year}</td>
//               <td className="border px-4 py-2">{feature.section}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default FeatureTable;










import { useEffect, useState } from "react";

const FeatureTable = () => {
  // State to store the fetched features data
  const [features, setFeatures] = useState([]);
  // State to store the search query
  const [searchQuery, setSearchQuery] = useState("");
  // State to store error messages if any
  const [error, setError] = useState(null);

  // Function to fetch features from the API
  const fetchFeatures = async () => {
    try {
      // Fetch data from API
      const response = await fetch("http://localhost:8000/api/feature");

      // Check if response is okay
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch features");
      }

      // Parse the response data and update the state
      const data = await response.json();
      setFeatures(data);
    } catch (error) {
      // Set error message in state if any error occurs
      setError(error.message);
      console.error("There was an error fetching the features:", error);
    }
  };

  // Fetch features data when the component mounts and set up auto-refresh
  useEffect(() => {
    // Fetch data initially
    fetchFeatures();

    // Set up an interval to refresh the data
    const intervalId = setInterval(fetchFeatures, 5000); // Refresh every 5 seconds

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Filter features based on the search query
  const filteredFeatures = features.filter((feature) => {
    return (
      feature.student_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feature.fullname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feature.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feature.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feature.year.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feature.section.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="overflow-x-auto w-full h-full">
      {/* Display error message if there's an error */}
      {error && <div className="error-message text-red-500">{error}</div>}

      {/* Search Bar */}
      <div className="flex justify-end p-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search"
          className="p-2 border w-[35%] border-gray-300 rounded"
        />
      </div>

      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-slate-500">
            <th className="px-4 py-2 border">Student Id</th>
            <th className="px-4 py-2 border">Fullname</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Course</th>
            <th className="px-4 py-2 border">Year</th>
            <th className="px-4 py-2 border">Section</th>
          </tr>
        </thead>
        <tbody>
          {/* Map over the filtered features array and display each feature in a row */}
          {filteredFeatures.length > 0 ? (
            filteredFeatures.map((feature) => (
              <tr key={feature.id}>
                <td className="border px-4 py-2">{feature.student_id}</td>
                <td className="border px-4 py-2">{feature.fullname}</td>
                <td className="border px-4 py-2">{feature.email}</td>
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
    </div>
  );
};

export default FeatureTable;
