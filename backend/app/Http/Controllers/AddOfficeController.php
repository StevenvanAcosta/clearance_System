<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Office;

class AddOfficeController extends Controller
{
    /**
     * Store a new office.
     */
    public function createOffice(Request $request)
    {
        // Validate request data
        $request->validate([
            'office_name' => 'required|string|unique:offices|max:255',
        ]);

        // Create the office
        $office = Office::create([
            'office_name' => $request->office_name,
        ]);

        // Return a response
        return response()->json([
            'message' => 'Office created successfully!',
            'data' => $office,
        ], 201);
    }

    /**
     * Update an existing office.
     */
    public function editOffice(Request $request, $id)
    {
        // Validate request data
        $request->validate([
            'office_name' => 'required|string|unique:offices,office_name,' . $id . '|max:255',
        ]);

        // Find and update the office
        $office = Office::findOrFail($id);
        $office->update([
            'office_name' => $request->office_name,
        ]);

        // Return a response
        return response()->json([
            'message' => 'Office updated successfully!',
            'data' => $office,
        ]);
    }

    /**
     * Delete an office.
     */
    public function deleteOffice($id)
    {
        try {
            // Find the office, or return a 404 response if not found
            $office = Office::findOrFail($id);
    
            // Delete the office
            $office->delete();
    
            // Return a success response
            return response()->json([
                'message' => 'Office deleted successfully!',
            ]);
        } catch (\Exception $e) {
            // Log the exception for debugging (you can remove this in production)
            \Log::error('Error deleting office: ' . $e->getMessage());
    
            // Return a custom error response
            return response()->json([
                'message' => 'An error occurred while deleting the office. Please try again later.',
            ], 500);
        }
    }

    /**
     * Fetch all offices.
     */
    public function getOffices()
    {
        $offices = Office::all(); // Fetch all offices
        return response()->json($offices); // Return them as JSON
    }
}
