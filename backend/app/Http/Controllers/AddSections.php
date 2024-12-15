<?php

namespace App\Http\Controllers;

use App\Models\Sections;
use Illuminate\Http\Request;

class AddSections extends Controller
{
    public function addSection(Request $request)
    {
        // Validate the request
        $request->validate([
            'section_field' => 'required|string|unique:sections,section_field',
        ]);

        // Create a new section
        $section = Sections::create([
            'section_field' => $request->section_field,
        ]);

        // Return a response
        return response()->json([
            'message' => 'Section created successfully!',
            'section' => $section,
        ], 201);
    }
    public function fetchSections()
    {
        // Retrieve all sections
        $sections = Sections::all();

        // Return the sections as JSON
        return response()->json([
            'sections' => $sections,
        ]);
    }
}
