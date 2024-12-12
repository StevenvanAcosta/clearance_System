<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Student_Info;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use App\Mail\VerificationEmail;

class EmailController extends Controller
{
    public function validateStudentId(Request $request)
    {
        $studentId = $request->studentId;
    
        $student = Student_Info::where('student_id', $studentId)->first();
        if (!$student) {
            return response()->json(['error' => 'Invalid Student_ID'], 404); // Updated error message for consistency
        }
    
        $user = User::where('email', $student->email)->first();
        return response()->json([
            'email' => $student->email,
            'verified' => $user ? $user->email_verified_at !== null : false,
        ]);
    }
    

    public function sendVerificationEmail(Request $request)
{
    $email = $request->email;

    $student = Student_Info::where('email', $email)->first(); // Fix variable name
    if (!$student) {
        return response()->json(['error' => 'Invalid Email'], 404);
    }

    $user = User::firstOrCreate(
        ['email' => $student->email],
        ['name' => $student->name, 'password' => bcrypt('defaultPassword')]
    );

    // Generate a secure token (you can also use signed routes here)
    $verificationUrl = route('verify.email', ['token' => base64_encode($user->id)]);

    // Send email using the Mailable
    Mail::to($student->email)->send(new VerificationEmail($verificationUrl));

    return response()->json(['message' => 'Verification email sent successfully']);
}
public function verifyEmail($token)
{
    $userId = base64_decode($token);
    $user = User::find($userId);

    if ($user) {
        $user->email_verified_at = now();
        $user->save();

        return response()->json(['message' => 'Email verified successfully.']);
    }

    return response()->json(['error' => 'Invalid verification token.'], 400);
}

}
