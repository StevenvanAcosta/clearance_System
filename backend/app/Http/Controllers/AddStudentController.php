<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Student_Info;

class AddStudentController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'student_id' => 'required|unique:student_info,student_id|max:255',
            'fullname' => 'required|max:255',
            'email' => 'required|unique:student_info,email|max:255',
            'course' => 'required|max:100',
            'year' => 'required|max:10',
            'section' => 'required|max:50',
        ]);

        Student_Info::create($validated);

        return response()->json(['message' => 'Student added successfully'], 201);
    }
}

