import React, { useState } from 'react';
import AdviserHeader from '../../components/header/adviser/AdviserHeader';
import Signatory from "../../components/datatable/admin/Signatory"

const AdviserStudent = () => {


  return (
    <div className="w-full h-screen flex overflow-hidden">
      <AdviserHeader />
      <div className="w-full h-full p-4">
        <p className='flex justify-center text-2xl mt-7 text-slate-700 font-bold'>List of Students</p>
        <Signatory/>
      </div>
    </div>
  );
};

export default AdviserStudent;
