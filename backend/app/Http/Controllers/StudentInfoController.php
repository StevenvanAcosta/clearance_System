<?php

// namespace App\Http\Controllers;

// use Illuminate\Http\Request;
// use App\Models\Student_Info;
// use App\Models\student_semester;
// use App\Models\User;
// use Illuminate\Support\Facades\Mail;
// use Illuminate\Support\Facades\Hash;
// use Illuminate\Support\Str;
// use Illuminate\Support\Facades\Session; // Add session for OTP
// use App\Mail\VerificationEmail;  // Import the VerificationEmail class

// class StudentInfoController extends Controller
// {
//     public function validateStudentId(Request $request)
//     {
//         $studentId = $request->input('student_id');

//         $student = Student_Info::where('student_id', $studentId)->first();

//         if ($student) {
//             return response()->json(['success' => true, 'data' => $student]);
//         }

//         return response()->json(['success' => false, 'message' => 'Student ID not found']);
//     }

//     public function registerStudentSemester(Request $request)
//     {
//         $validatedData = $request->validate([
//             'student_id' => 'required|exists:student_info,student_id',
//             'semester' => 'required|string|in:First semester,Second semester',
//         ]);

//         // Fetch student details from the `student_info` table
//         $student = Student_Info::where('student_id', $validatedData['student_id'])->first();
//         if (!$student) {
//             return response()->json(['success' => false, 'message' => 'Student not found']);
//         }

//         // Check if already registered for the semester
//         $existingRegistration = student_semester::where([
//             ['student_id', '=', $validatedData['student_id']],
//             ['semester', '=', $validatedData['semester']],
//         ])->first();

//         if ($existingRegistration) {
//             return response()->json(['success' => false, 'message' => 'Student is already registered for this semester']);
//         }

//         // Save the data to `student_semester`
//         student_semester::create([
//             'student_id' => $student->student_id,
//             'fullname' => $student->fullname,
//             'email' => $student->email,
//             'course' => $student->course,
//             'year' => $student->year,
//             'section' => $student->section,
//             'semester' => $validatedData['semester'],
//         ]);

//         // Check if the user already exists in the `users` table
//         $existingUser = User::where('email', $student->email)->first();
//         if (!$existingUser) {
//             // Set a default password if the user does not exist
//             $defaultPassword = 'student@1234'; // You can set a specific default password here

//             // Create the user with the default password and the default role
//             User::create([
//                 'name' => $student->fullname,
//                 'email' => $student->email,
//                 'password' => Hash::make($defaultPassword), // Ensure the password is hashed
//                 'role' => 'Student', // Set default role value here
//             ]);
//         }

//         return response()->json(['success' => true, 'message' => 'Student registered successfully']);
//     }

// }







namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Student_Info;
use App\Models\student_semester;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Session; // Add session for OTP
use App\Mail\VerificationEmail;  // Import the VerificationEmail class

class StudentInfoController extends Controller
{
    public function validateStudentId(Request $request)
    {
        $studentId = $request->input('student_id');

        $student = Student_Info::where('student_id', $studentId)->first();

        if (!$student) {
            return response()->json(['success' => false, 'message' => 'Student ID not found']);
        }

        // Check if the user is already registered and email verified
        $existingUser = User::where('email', $student->email)->first();
        if ($existingUser && $existingUser->email_verified_at) {
            return response()->json(['success' => false, 'message' => 'Already registered']);
        }

        // If email is not verified, generate OTP and send email
        if ($existingUser && !$existingUser->email_verified_at) {
            $otp = Str::random(6); // Generate OTP
            Session::put('otp', $otp); // Store OTP in session

            // Send OTP email
            Mail::to($student->email)->send(new VerificationEmail($otp));

            return response()->json(['success' => true, 'message' => 'OTP sent to email for verification']);
        }

        return response()->json(['success' => true, 'data' => $student]);
    }

    public function verifyOtp(Request $request)
    {
        $otp = $request->input('otp');
        
        // Check if OTP matches
        if ($otp === Session::get('otp')) {
            $student = Student_Info::where('email', $request->input('email'))->first();
            
            // Check if the user exists in the users table
            $existingUser = User::where('email', $student->email)->first();
            if (!$existingUser) {
                // Create user if it doesn't exist
                $defaultPassword = 'student@1234'; // You can set a specific default password here
                User::create([
                    'name' => $student->fullname,
                    'email' => $student->email,
                    'password' => Hash::make($defaultPassword), // Ensure the password is hashed
                    'role' => 'Student', // Set default role value here
                ]);
            }

            // Mark the email as verified
            $existingUser->email_verified_at = now();
            $existingUser->save();

            // Proceed with semester registration
            return response()->json(['success' => true, 'message' => 'Email verified successfully, you can now register for the semester']);
        }

        return response()->json(['success' => false, 'message' => 'Invalid OTP']);
    }

    public function registerStudentSemester(Request $request)
    {
        $validatedData = $request->validate([
            'student_id' => 'required|exists:student_info,student_id',
            'semester' => 'required|string|in:First semester,Second semester',
        ]);

        // Fetch student details from the student_info table
        $student = Student_Info::where('student_id', $validatedData['student_id'])->first();
        if (!$student) {
            return response()->json(['success' => false, 'message' => 'Student not found']);
        }

        // Check if the user is verified before registration
        $existingUser = User::where('email', $student->email)->first();
        if (!$existingUser || !$existingUser->email_verified_at) {
            return response()->json(['success' => false, 'message' => 'Please verify your email before registering']);
        }

        // Check if already registered for the semester
        $existingRegistration = student_semester::where([
            ['student_id', '=', $validatedData['student_id']],
            ['semester', '=', $validatedData['semester']],
        ])->first();

        if ($existingRegistration) {
            return response()->json(['success' => false, 'message' => 'Student is already registered for this semester']);
        }

        // Save the data to student_semester
        student_semester::create([
            'student_id' => $student->student_id,
            'fullname' => $student->fullname,
            'email' => $student->email,
            'course' => $student->course,
            'year' => $student->year,
            'section' => $student->section,
            'semester' => $validatedData['semester'],
        ]);

        return response()->json(['success' => true, 'message' => 'Student registered successfully']);
    }
}