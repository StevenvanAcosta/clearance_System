<?php

namespace App\Http\Controllers;

use App\Models\student_semester;
use Illuminate\Http\Request;

class FetchStudents extends Controller
{
    public function StudentInformation(Request $request)
    {
        // Start building the query
        $query = student_semester::query();

        // Apply filters based on the incoming request parameters
        if ($request->has('student_id')) {
            $query->where('student_id', $request->input('student_id'));
        }

        if ($request->has('fullname')) {
            $query->where('fullname', 'like', '%' . $request->input('fullname') . '%'); // Use 'like' for partial matching
        }

        if ($request->has('course')) {
            $query->where('course', $request->input('course'));
        }

        if ($request->has('year')) {
            $query->where('year', $request->input('year')); 
        }

        if ($request->has('section')) {
            $query->where('section', $request->input('section'));
        }

        if ($request->has('created_at')) {
            // Assuming 'created_at' is a datetime field, you might need to handle it differently depending on your use case
            $query->whereDate('created_at', $request->input('created_at'));
        }

        // Execute the query and get the filtered results
        $students = $query->get();

        // Return the students as a JSON response
        return response()->json($students);
    }
}
