<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Student_Info;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class AddStudentController extends Controller
{
    public function store(Request $request)
    {
        // Validate incoming data
        $validated = $request->validate([
            'student_id' => 'required|unique:student_info,student_id|max:255',
            'fullname' => 'required|max:255',
            'email' => 'required|email|unique:student_info,email|max:255',  // Added 'email' validation
            'course' => 'required|max:100',
            'year' => 'required|max:10',
            'section' => 'required|max:50',
        ]);

        try {
            // Create student record
            $student = Student_Info::create($validated);

            // Return success message
            return response()->json(['message' => 'Student added successfully', 'student' => $student], 201);
        } catch (\Exception $e) {
            // Handle any errors during creation
            return response()->json(['message' => 'Failed to add student', 'error' => $e->getMessage()], 500);
        }
    }
}
