<?php

namespace App\Http\Controllers;
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    // // Register
    // public function register(Request $request)
    // {
    //     $request->validate([
    //         'name' => 'required|string',
    //         'email' => 'required|email|unique:users,email',
    //         'password' => 'required|min:6',
    //         'role' => 'required|in:Admin,Student,PTCA,Program Head,MIS Office,Accounting Clerk,SG Adviser,Adviser,Scholarship Officer,Scholarship,Librarian,Vp for Research and Extension',
    //         'student_id' => 'nullable|string', // Allow null or string
    //         'course' => 'nullable|string',    // Allow null or string
    //         'year' => 'nullable|string',      // Allow null or string
    //         'section' => 'nullable|string',   // Allow null or string
    //     ]);
        
    //     // Enforce additional rules if the role is 'Student'
    //     if ($request->role === 'Student') {
    //         $request->validate([
    //             'student_id' => 'required|string|unique:users,student_id',  // Make student_id required
    //             'course' => 'required|string',      // Make course required
    //             'year' => 'required|string',        // Make year required
    //             'section' => 'required|string',     // Make section required
    //         ]);
    //     }
        
    //     $user = User::create([
    //         'name' => $request->name,
    //         'email' => $request->email,
    //         'password' => Hash::make($request->password),
    //         'role' => $request->role,
    //         'student_id' => $request->student_id,
    //         'course' => $request->course,
    //         'year' => $request->year,
    //         'section' => $request->section,
    //     ]);

    //     return response()->json(['message' => 'User registered successfully'], 201);
    // }





    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|unique:users,name|string', // Fixed extra space
            'email' => 'required|email|unique:users,email',
            'role' => 'required|in:Admin,Student,PTCA,Program Head,MIS Office,Accounting Clerk,SG Adviser,Adviser,Scholarship Officer,Scholarship,Librarian,Vp for Research and Extension',
            // 'student_id' => 'nullable|string', 
            // 'course' => 'nullable|string',
            // 'year' => 'nullable|string',
            // 'section' => 'nullable|string',
        ]);
    
        // if ($request->role === 'Student') {
        //     $request->validate([
        //         'student_id' => 'required|string|unique:users,student_id',
        //         'course' => 'required|string',
        //         'year' => 'required|string',
        //         'section' => 'required|string',
        //     ]);
        // }
    
        $defaultPassword = $this->generateDefaultPassword();
    
        $user = User::create([
            'name' => trim($request->name), // Trimmed to ensure no extra spaces
            'email' => $request->email,
            'password' => Hash::make($defaultPassword),
            'role' => $request->role,
            // 'student_id' => $request->student_id,
            // 'course' => $request->course,
            // 'year' => $request->year,
            // 'section' => $request->section,
        ]);
    
        return response()->json(['message' => 'User registered successfully'], 201);
    }
    

// Function to generate the default password
private function generateDefaultPassword()
{
    return 'Default@123'; // Change this to whatever default password you want
}


    // Login
    public function login(Request $request)
{
    $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);

    try {
        $email = strtolower($request->email);
        $user = User::where('email', $email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['error' => 'Invalid credentials'], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'token' => $token,
            'role' => $user->role,
            'name' => $user->name, // Add user name here
        ]);

    } catch (\Exception $e) {
        return response()->json(['error' => 'Something went wrong. Please try again.'], 500);
    }
}


    // Logout
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out successfully']);
    }


    // show Users
    public function getUsers()
    {
        $users = User::all();
        return response()->json($users);
    }
    // Update user profile
    public function updateProfileAdmin(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email',
            'password' => 'nullable|min:6', // Password is optional on update
        ]);

        $user = $request->user(); // Get the authenticated user

        // Check if the email is unique, except for the authenticated user's email
        $request->validate([
            'email' => 'required|email|unique:users,email,' . $user->id,
        ]);

        // Update user information
        $user->name = $request->name;
        $user->email = $request->email;
        if ($request->filled('password')) {
            $user->password = Hash::make($request->password);
        }

        $user->save();

        return response()->json(['message' => 'Profile updated successfully'], 200);
    }
    public function updateProfileStudent(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email',
            'password' => 'nullable|min:6', // Password is optional on update
        ]);

        $user = $request->user(); // Get the authenticated user

        // Check if the email is unique, except for the authenticated user's email
        $request->validate([
            'email' => 'required|email|unique:users,email,' . $user->id,
        ]);

        // Check if password is provided and it is different from the current password
        if ($request->filled('password') && Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'New password cannot be the same as the current password'], 400);
        }

        // Update user information
        $user->name = $request->name;
        $user->email = $request->email;
        if ($request->filled('password')) {
            $user->password = Hash::make($request->password);
        }

        $user->save();

        return response()->json(['message' => 'Profile updated successfully'], 200);
    }


    // Show logged-in user data
    public function getUser(Request $request)
    {
        return response()->json($request->user());
    }
    
}

