// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import { SiMinutemailer } from "react-icons/si";

// const Register = () => {
//   const [studentId, setStudentId] = useState('');
//   const [studentInfo, setStudentInfo] = useState(null);
//   const [semester, setSemester] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [availableSemesters, setAvailableSemesters] = useState([]);
//   const [semesterStatus, setSemesterStatus] = useState({});

//   useEffect(() => {
//     const currentMonth = new Date().getMonth() + 1; // JavaScript months are 0-indexed
    
//     let status = {};
//     if (currentMonth >= 7 && currentMonth <= 12) {
//       status = { 'First semester': true, 'Second semester': false };
//       setAvailableSemesters(['First semester']);
//       setSemester('First semester');
//     } else if (currentMonth >= 1 && currentMonth <= 5) {
//       status = { 'First semester': false, 'Second semester': true };
//       setAvailableSemesters(['Second semester']);
//       setSemester('Second semester');
//     } else {
//       setAvailableSemesters([]);
//       setSemester('');
//     }

//     setSemesterStatus(status);
//   }, []);

//   // Function to format the email
//   const formatEmail = (email) => {
//     if (!email) return '';
    
//     const [localPart, domain] = email.split('@');
//     if (localPart.length <= 2) {
//       return `${localPart}${'*'.repeat(domain.length + 1)}@${domain}`;
//     }
    
//     const firstTwoChars = localPart.slice(0, 2);
//     const lastChar = localPart.slice(-1);
//     const masked = '*'.repeat(localPart.length - 3);
    
//     return `${firstTwoChars}${masked}${lastChar}@${domain}`;
//   };

//   const clearMessages = () => {
//     setErrorMessage('');
//     setSuccessMessage('');
//   };

//   const handleStudentIdValidation = async () => {
//     clearMessages();
//     const sanitizedStudentId = studentId.trim();
//     if (!sanitizedStudentId) {
//       setErrorMessage('Student ID is required');
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await axios.post('http://localhost:8000/api/validate-student', { student_id: sanitizedStudentId });
//       if (response.data.success) {
//         setStudentInfo(response.data.data);
//       } else {
//         setStudentInfo(null);
//         setErrorMessage(response.data.message);
//       }
//     } catch (error) {
//       setErrorMessage('Error validating student ID');
//       setStudentInfo(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRegister = async () => {
//     clearMessages();

//     if (!studentInfo) {
//       setErrorMessage('Please validate the student ID first.');
//       return;
//     }

//     if (!semester) {
//       setErrorMessage('No semester available for registration at this time.');
//       return;
//     }

//     setLoading(true);
//     const sanitizedStudentId = studentId.trim();
//     try {
//       const response = await axios.post('http://localhost:8000/api/registerStudentSemester', {
//         student_id: sanitizedStudentId,
//         semester,
//       });

//       if (response.data.success) {
//         setSuccessMessage('Student registered successfully!');
//         setStudentInfo(null);
//         setStudentId('');
//         setSemester('');
//       } else {
//         setErrorMessage(response.data.message);
//       }
//     } catch (error) {
//       if (error.response && error.response.data) {
//         setErrorMessage(error.response.data.message);
//       } else {
//         setErrorMessage('Error registering student');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="w-full h-full">
//       <div className="flex flex-col justify-center items-center w-full h-screen">
//         <div className="mb-4 w-full flex justify-center items-center">
//           <input
//             type="text"
//             placeholder="Student ID"
//             maxLength={10}
//             value={studentId}
//             onChange={(e) => setStudentId(e.target.value)}
//             className="outline-1 outline-slate-300 outline rounded-lg p-2 w-44"
//           />
//           <button
//             onClick={handleStudentIdValidation}
//             className="ml-2 bg-green-500 hover:bg-blue-500 transition duration-300 text-white p-2 rounded-lg"
//             disabled={loading}
//           >
//             {loading ? 'Validating...' : 'Validate'}
//           </button>
//         </div>
//         <div className='w-full flex justify-center -mt-3 mb-3'>
//           <p className='flex justify-center items-center text-xs ml-20'>Already have an Account?</p>
//           <Link to="/">
//             <p className='flex justify-center hover:text-blue-500 text-xs'>Login</p>
//           </Link>
//         </div>
//         {errorMessage && <p className="text-red-500">{errorMessage}</p>}
//         {successMessage && <p className="text-green-500">{successMessage}</p>}

//         {studentInfo && (
//           <div className="w-1/2 bg-slate-200 p-4 rounded-lg">
//             <div className='flex flex-col items-center justify-center'>
//               <p className=' animate-pulse'> <SiMinutemailer color='green' size={100}/> </p>
//               <p className='hidden'><strong>Full Name:</strong>{studentInfo.fullname}</p>
//               <p className='flex mb-2 gap-1'>
//                 <strong>Email:</strong>
//                 {studentInfo && studentInfo.email ? formatEmail(studentInfo.email) : ''}
//               </p>
//               <p className='hidden'><strong>Course:</strong> {studentInfo.course}</p>
//               <p className='hidden'><strong>Year:</strong> {studentInfo.year}</p>
//               <p className='hidden'><strong>Section:</strong> {studentInfo.section}</p>
//             </div>

//             <div className="mt-4 flex-col w-1/2 gap-2 hidden">
//               <label htmlFor="semester" className="mr-2">Select Semester:</label>
//               <select
//                 id="semester"
//                 value={semester}
//                 onChange={(e) => setSemester(e.target.value)}
//                 className="outline-1 outline-slate-300 w-56 outline rounded-lg p-2"
//                 disabled={availableSemesters.length === 0}
//               >
//                 {availableSemesters.map((sem) => (
//                   <option key={sem} value={sem} disabled={!semesterStatus[sem]}>
//                     {sem} {semesterStatus[sem] ? '(Active)' : '(Not Clickable)'}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className='w-full justify-center items-center flex-col flex'>
//              <input type='text' placeholder='Type here OTP' className="outline-1 outline-slate-300 outline w-40 rounded-lg p-2 ml- "/>
//               <button
//                 onClick={handleRegister}
//                 className="mt-4 bg-green-500 w-1/2 hover:bg-blue-500 transition duration-200 text-white p-2 rounded-lg"
//                 disabled={loading || availableSemesters.length === 0 || !semesterStatus[semester]}
//               >
//                 {loading ? 'Registering...' : 'Register'}
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Register;





// Trial and error
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { SiMinutemailer } from "react-icons/si";

const Register = () => {
  const [studentId, setStudentId] = useState('');
  const [email, setEmail] = useState(''); // Store the original email here
  const [maskedEmail, setMaskedEmail] = useState(''); // Masked email for display
  const [isVerified, setIsVerified] = useState(false);
  const [message, setMessage] = useState('');

  const handleValidate = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/validate-student-id', { studentId });
      const { email, verified } = response.data;
  
      if (email) {
        setEmail(email); // Store the original email for sending it back to the backend
        const maskedEmail = `${email[0]}${'*'.repeat(email.length - 3)}${email.slice(-2)}`;
        setMaskedEmail(maskedEmail); // Masked email for user display
        setIsVerified(verified);
  
        if (verified) {
          setMessage('Account is already registered.');
        } else {
          setMessage('Account is not verified. Please check your email.');
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setMessage('Invalid Student_ID'); // Display the specific message for invalid student ID
      } else {
        console.error('Error validating student ID:', error);
        setMessage('An error occurred while validating.');
      }
    }
  };
  

  const handleSendVerificationEmail = async () => {
    try {
      if (!isVerified && email) {
        console.log('Sending POST request to /send-verification-email with:', email);
        await axios.post('http://localhost:8000/api/send-verification-email', { email });
        setMessage('Verification email sent successfully.');
      } else {
        setMessage('No valid email available for verification.');
      }
    } catch (error) {
      console.error('Error sending verification email:', error);
      setMessage('Failed to send verification email.');
    }
  };
  

  return (
    <div className="w-full h-full">
      <div className="flex flex-col justify-center items-center w-full h-screen">
        <div className="mb-4 w-full flex justify-center items-center">
          <input
            type="text"
            placeholder="Student ID"
            maxLength={10}
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className="outline-1 outline-slate-300 outline rounded-lg p-2 w-44"
          />
          <button
            onClick={handleValidate}
            className="ml-2 bg-green-500 hover:bg-blue-500 transition duration-300 text-white p-2 rounded-lg"
          >
            Validate
          </button>
        </div>

        {maskedEmail && (
          <div className="w-1/2 bg-slate-200 p-4 rounded-lg">
            <div className="flex flex-col items-center justify-center">
              <p className="animate-pulse">
                <SiMinutemailer color='green' size={100} />
              </p>
              <p className="flex mb-2 gap-1">
                <strong>Email:</strong> {maskedEmail} {/* Display masked email */}
              </p>
            </div>
            {!isVerified && (
              <button
                onClick={handleSendVerificationEmail}
                className="mt-4 bg-green-500 w-1/2 hover:bg-blue-500 transition duration-200 text-white p-2 rounded-lg"
              >
                Send Verification Email
              </button>
            )}
          </div>
        )}

        {message && <p className="mt-4 text-red-500">{message}</p>}

        <div className='w-full flex justify-center -mt-3 mb-3'>
          <p className='flex justify-center items-center text-xs ml-20'>Already have an Account?</p>
          <Link to="/">
            <p className='flex justify-center hover:text-blue-500 text-xs'>Login</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
