<?php

namespace App\Http\Controllers;

use App\Models\Student_Info;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\StudentInfoImport;

class FeatureController extends Controller
{
    // Method to get all features from the database
    public function feature()
    {
        try {
            $features = Student_Info::all();
            return response()->json($features, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error fetching features: ' . $e->getMessage()], 500);
        }
    }

    // Method to import features (for Excel files)
    public function import(Request $request)
    {
        $request->validate([
            'features_file' => 'required|file|mimes:xlsx,csv|max:2048',
        ]);

        try {
            if (!$request->hasFile('features_file')) {
                return response()->json(['message' => 'No file was uploaded'], 400);
            }

            $data = $request->file('features_file');
            
            // Process the file and import data
            Excel::import(new StudentInfoImport, $data);

            return response()->json(['message' => 'Features imported successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error importing features: ' . $e->getMessage()], 500);
        }
    }
}
