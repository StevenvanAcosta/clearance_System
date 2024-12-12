<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Signatory;
use Validator;

class SignatoryController extends Controller
{
    public function store(Request $request)
    {
        // Validate incoming data
        $validator = Validator::make($request->all(), [
            'signatory_office' => 'required|string',
            'fullname' => 'required|string|unique:signatory',
            'email' => 'required|email|unique:signatory',
            'password' => 'nullable|string|min:55',
        ]);

        if ($validator->fails()) {
            // Return validation errors as JSON
            return response()->json(['errors' => $validator->errors()], 422);
        }
        // Default password if not provided
        $password = $request->password ?? 'defaultPassword123';

        try {
            // Create the signatory
            $signatory = Signatory::create([
                'signatory_office' => $request->signatory_office,  // Use the correct field name
                'fullname' => $request->fullname,
                'email' => $request->email,
                'password' => bcrypt($password),
            ]);

            return response()->json(['message' => 'Signatory created successfully!', 'data' => $signatory], 201);
        } catch (\Exception $e) {
            // Catch any exception and return a 500 error
            return response()->json(['message' => 'Server Error', 'error' => $e->getMessage()], 500);
        }
    }
}
