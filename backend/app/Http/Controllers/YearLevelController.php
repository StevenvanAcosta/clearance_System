<?php

namespace App\Http\Controllers;

use App\Models\YearLevel;  // Import the YearLevel model
use Illuminate\Http\Request;

class YearLevelController extends Controller
{
    // Fetch all year levels
    public function index()
    {
        return response()->json(YearLevel::all());
    }

    // Store a new year level
    public function store(Request $request)
    {
        // Validate the incoming request
        $request->validate([
            'year_level' => 'required|string|unique:year_level|max:255', // Ensure table name is plural
        ]);

        // Create the new year level
        $yearLevel = YearLevel::create([
            'year_level' => $request->year_level,
        ]);

        // Return the created year level with a 201 status
        return response()->json($yearLevel, 201);
    }

    // Show a specific year level by ID
    public function show($id)
    {
        // Find the year level by ID or fail
        $yearLevel = YearLevel::findOrFail($id);
        
        // Return the found year level
        return response()->json($yearLevel);
    }

    // Update an existing year level by ID
    public function update(Request $request, $id)
    {
        // Validate the incoming request
        $request->validate([
            'year_level' => 'required|string|max:255|unique:year_level,year_level,' . $id, // Ensure table name is plural and exclude current record
        ]);

        // Find the year level by ID or fail
        $yearLevel = YearLevel::findOrFail($id);
        
        // Update the year level
        $yearLevel->update([
            'year_level' => $request->year_level,
        ]);

        // Return the updated year level
        return response()->json($yearLevel);
    }

    // Delete a specific year level by ID
    public function destroy($id)
    {
        // Find the year level by ID or fail
        $yearLevel = YearLevel::findOrFail($id);
        
        // Delete the year level
        $yearLevel->delete();

        // Return a 204 No Content status after successful deletion
        return response()->json(null, 204);
    }
}
