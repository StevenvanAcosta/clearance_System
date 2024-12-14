import React from 'react'
import { Students } from '../../constant/ConstantApproved'
import ScholarshipHeader from "../../components/header/scholarship/ScholarshipHeader"

const ScholarshipApproved = () => {
  return (
    <div className="w-full h-screen flex overflow-hidden">
      <ScholarshipHeader/>
      <div className="w-full h-full p-4">
              <p className='flex justify-center text-lg font-semibold mb-5'>List of Approved</p>
                <table className="table-auto w-[100%] text-left ">
                    <thead>
                        <tr className="bg-slate-200">
                            <th className="users-th p-6">#</th>
                            <th className="users-th">Name</th>
                            <th className="users-th">Student ID</th>
                            <th className="users-th">Course</th>
                            <th className="users-th">Year</th>
                            <th className="users-th">Section</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Students.map((Cleared, index) => (
                            <tr key={Cleared.student_id} className="hover:bg-gray-100">
                                <td className="users-td pt-6 pl-6">{index + 1}</td>
                                <td className="users-td pt-6">{Cleared.name}</td>
                                <td className="users-td pt-6">{Cleared.student_id}</td>
                                <td className="users-td pt-6">{Cleared.course}</td>
                                <td className="users-td pt-6">{Cleared.year}</td>
                                <td className="users-td pt-6">{Cleared.section}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
    </div>
  )
}

export default ScholarshipApproved
