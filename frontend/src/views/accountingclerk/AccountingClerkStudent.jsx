import React, { useState, useEffect } from 'react';
import AccountingClerkHeader from '../../components/header/accountingclerk/AccountingClerkHeader';
import SignatoryTable from '../../components/datatable/admin/Signatory';

const AccountingClerkStudent = () => {

    return (
        <div className='w-full h-screen flex overflow-hidden'>
            <AccountingClerkHeader />
            <div className="w-full h-full p-4">
            <p className='flex justify-center mb-2 text-2xl p-6 font-bold px-4'>List of Students</p>
                {/* Feature table with the search query passed as a prop */}
                <SignatoryTable />
            </div>
        </div>
    );
};

export default AccountingClerkStudent;
