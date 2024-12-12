<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\course;
use App\Models\section;
use App\Models\Office;

class DataControllerOffice extends Controller
{
    // Store Office
    public function addOffice(Request $request)
    {
        $request->validate([
            'office_name' => 'required|string|max:255',
        ]);

        $office = Office::create([
            'office_name' => $request->office_name,
        ]);

        return response()->json($office, 201);
    }

    // Store Section
   // Store Section
   public function addSection(Request $request)
   {
       $request->validate([
           'section_field' => 'required|string|max:255', // Updated to match the frontend key 'section_name'
       ]);
   
       $section = section::create([
           'section_field' => $request->section_field, // Corrected to match 'section_name' from frontend
       ]);
   
       return response()->json($section, 201);
   }
   

    // Fetch Offices for select dropdown
    public function getOffices()
    {
        $offices = Office::all();
        return response()->json($offices);
    }

}
