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
            'email' => 'required|email|unique:signatory|unique:users',
            'password' => 'nullable|string|min:6',
            'role' => 'required',
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
                'signatory_office' => $request->signatory_office,
                'fullname' => $request->fullname,
                'email' => $request->email,
                
            ]);
    
            // Create the user
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'role' => $request->role,
                'password' => bcrypt($password),
            ]);
    
            return response()->json(['message' => 'Signatory created successfully!', 'data' => $signatory], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Server Error', 'error' => $e->getMessage()], 500);
        }
    }
    
}
