import React, { useState } from 'react';
import ScholarshipOfficerHeader from '../../components/header/scholarshipofficer/ScholarshipOfficerHeader';
import Signatorytable from "../../components/datatable/admin/Signatory"

const ScholarshipOfficerStudent = () => {
    
    return (
        <div className="w-full h-screen flex overflow-hidden">
            <ScholarshipOfficerHeader />
            <div className="w-full h-full p-4">
                <Signatorytable/>
            </div>
        </div>
    );
};

export default ScholarshipOfficerStudent;