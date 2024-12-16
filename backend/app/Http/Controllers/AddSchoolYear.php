<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\School_year; // Import the School_year model

class AddSchoolYear extends Controller
{
    public function create(Request $request)
    {
        // Validate the incoming data
        $request->validate([
            'year_field' => 'required|string|max:255|unique:school_year,year_field', // Corrected validation field
        ]);

        // Create a new school year entry
        $schoolYear = new School_year();
        $schoolYear->year_field = $request->input('year_field'); // Corrected input field
        $schoolYear->save(); // Save to the database

        // Return a response
        return response()->json([
            'message' => 'School year added successfully!',
            'school_year' => $schoolYear
        ], 201);
    }
}
