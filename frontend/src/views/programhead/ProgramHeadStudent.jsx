import React, { useState } from 'react';
import ProgramHeadHeader from '../../components/header/programhead/ProgramHeadHeader';
import SignatoryTable from '../../components/datatable/admin/Signatory';

const ProgramHeadStudent = () => {

    return (
        <div className="w-full h-screen flex overflow-hidden">
            <ProgramHeadHeader />
            <div className="w-full h-full p-4">
                <SignatoryTable/>
            </div>
        </div>
    );
};

export default ProgramHeadStudent;
