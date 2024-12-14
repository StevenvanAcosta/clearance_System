<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Signatory;
use App\Models\User;
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
            'role' => 'required|in:Admin,Student,PTCA,Program Head,MIS Office,Accounting Clerk,SG Adviser,Adviser,Scholarship Officer,Scholarship,Librarian,Vp for Research and Extension',
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
            $user = User::create([
                'fullname' => $request->fullname,
                'email' => $request->email,
                'role' => $request->role,
            ]);

            return response()->json(['message' => 'Signatory created successfully!', 'data' => $signatory], 201);
        } catch (\Exception $e) {
            // Catch any exception and return a 500 error
            return response()->json(['message' => 'Server Error', 'error' => $e->getMessage()], 500);
        }
    }
}
