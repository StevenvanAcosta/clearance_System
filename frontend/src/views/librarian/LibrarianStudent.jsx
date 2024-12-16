import React, { useState } from 'react';
import { Students } from '../../constant/ConstantApproved';
import LibrarianHeader from '../../components/header/librarian/LibrarianHeader';
import SignatoryTable from '../../components/datatable/admin/Signatory';

const LibrarianStudent = () => {

    return (
        <div className="w-full h-screen flex overflow-hidden">
            <LibrarianHeader />
            <div className="w-full h-full p-4">
                <SignatoryTable/>
            </div>
        </div>
    );
};

export default LibrarianStudent;
