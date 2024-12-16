import React, { useState } from 'react';
import ScholarshipHeader from '../../components/header/scholarship/ScholarshipHeader';

const ScholarshipStudent = () => {


    return (
        <div className="w-full h-screen flex overflow-hidden">
            <ScholarshipHeader />
            <div className="w-full h-full p-4">
                <Signatorytable/>
            </div>
            
        </div>
    );
};

export default ScholarshipStudent;
