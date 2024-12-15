<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AddCoursesController extends Controller
{
    // Store a new course
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'course_code' => 'required|string|unique:course',
            'course_description' => 'required|string|unique:course',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            $course = Course::create([
                'course_code' => $request->course_code,
                'course_description' => $request->course_description,
            ]);

            return response()->json(['message' => 'Course added successfully!', 'data' => $course], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Server error', 'error' => $e->getMessage()], 500);
        }
    }

    // Update an existing course
    public function update(Request $request, $id)
    {
        $course = Course::find($id);

        if (!$course) {
            return response()->json(['message' => 'Course not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'course_code' => 'required|string|unique:course,course_code,' . $id,
            'course_description' => 'required|string|unique:course,course_description,' . $id,
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            $course->update([
                'course_code' => $request->course_code,
                'course_description' => $request->course_description,
            ]);

            return response()->json(['message' => 'Course updated successfully!', 'data' => $course]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Server error', 'error' => $e->getMessage()], 500);
        }
    }

    // Delete a course
    public function destroy($id)
    {
        $course = Course::find($id);

        if (!$course) {
            return response()->json(['message' => 'Course not found'], 404);
        }

        try {
            $course->delete();
            return response()->json(['message' => 'Course deleted successfully!']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Server error', 'error' => $e->getMessage()], 500);
        }
    }
    // fetch Course data
    public function index()
    {
        $courses = Course::all();
        return response()->json([
            'success' => true,
            'data' => $courses
        ], 200);
    }
}
