import React, { useState } from "react";
import AdminHeader from "../../components/header/admin/AdminHeader";
import FeatureImport from "../../components/datatable/admin/FeatureImport";
import FeatureTable from "../../components/datatable/admin/FeatureTable";

const StudentInformation = () => {
  const [importedData, setImportedData] = useState([]);

  const handleImportSuccess = () => {
    // Refresh the table data after import
    setImportedData((prevData) => [...prevData]);
  };

  return (
    <div className="w-full h-full flex ">
      <div className="w-fit h-full">
        <AdminHeader/>
      </div>  
      <div className="w-full h-full">
        <p className="flex justify-center p-2 font-semibold">Student Information</p>
        <FeatureImport onImportSuccess={handleImportSuccess} />
        <FeatureTable />
      </div>
    </div>
  );
};

export default StudentInformation;
