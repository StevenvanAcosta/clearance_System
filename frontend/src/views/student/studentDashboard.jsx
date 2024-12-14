import React from 'react';
import StudentHeader from '../../components/header/student/StudentHeader';
// import { Offices } from '../../constant/StudentConstant';

const StudentDashboard = () => {

  return (
    <div className='w-full h-full flex overflow-hidden'>
      <StudentHeader />
      <div className="w-full h-screen p-4">
        <p className='flex justify-center text-lg font-semibold mb-5'>Active Clearance</p>
        <table className="table-auto w-[100%] text-left ">
          <thead>
            <tr className="bg-slate-200">
              <th className="users-th p-6">#</th>
              <th className="users-th"><p className='flex justify-center'>Office</p></th>
              <th className="users-th"><p className='flex justify-center'>Signatory</p></th>
              <th className="users-th">
              <p className='flex justify-center'>Upload Proof</p>
                </th>
              <th className="users-th"><p className='flex justify-center'>Remarks</p></th>
            </tr>
          </thead>
          <tbody>
              <tr  className="hover:bg-gray-100">
                <td className="users-td pt-6 pl-6"></td>
                <td className="users-td pt-6">MIS Office</td>
                <td className="users-td pt-6"></td>
                <td className="users-td pt-6 flex justify-center">
                  
                  {/* Custom file input placeholder */}
                  <div          
                    className="cursor-pointer p-2 flex text-gray-600 text-center justify-center items-center gap-2"
                  >      
                  </div>
                  <input
                    type="file"
                  />
                </td>
                <td className="users-td pt-6"></td>
              </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentDashboard;
