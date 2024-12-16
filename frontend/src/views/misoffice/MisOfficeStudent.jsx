import React, { useState } from 'react';
import { Students } from '../../constant/ConstantApproved';
import MisOfficeHeader from '../../components/header/misoffice/MisOfficeHeader';
import SignatoryTable from '../../components/datatable/admin/Signatory';

const MisOfficeStudent = () => {

    return (
        <div className="w-full h-screen flex overflow-hidden">
            <MisOfficeHeader />
            <div className="w-full h-full p-4">
                <SignatoryTable/>
            </div>
        </div>
    );
};

export default MisOfficeStudent;
