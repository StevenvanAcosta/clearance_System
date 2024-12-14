<?php

// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');
use App\Http\Controllers\AddStudentController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ForgotPassword;
use App\Http\Controllers\StudentInfoController;
use App\Http\Controllers\FetchStudents;
use App\Http\Controllers\FeatureController;
use App\Http\Controllers\DataControllerOffice;
use App\Http\Controllers\AddOfficeController;
use App\Http\Controllers\AddCoursesController;
use App\Http\Controllers\EmailController;
use App\Http\Controllers\LoginControllerEmail;
use App\Http\Controllers\YearLevelController;
use App\Http\Controllers\SignatoryController;
use App\Http\Controllers\AddSections;
use App\Mail\VerificationEmail;
use Illuminate\Support\Facades\Mail;



Route::post('/adduser', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
// OFFICES ADD, DELETE, UPDATE
Route::get('/offices', [AddOfficeController::class, 'getOffices']);  // Fetch all offices
Route::post('/offices', [AddOfficeController::class, 'createOffice']);
Route::put('/offices/{id}', [AddOfficeController::class, 'editOffice']);
Route::delete('/offices/{id}', [AddOfficeController::class, 'deleteOffice']);

// SIGNATORY CREATE!!!
Route::post('/signatory', [SignatoryController::class, 'store']);


Route::get('/courses', [AddCoursesController::class, 'index']); // Fetch all courses
Route::post('/courses', [AddCoursesController::class, 'store']); // Add new course
Route::put('/courses/{id}', [AddCoursesController::class, 'update']); // Edit existing course
Route::delete('/courses/{id}', [AddCoursesController::class, 'destroy']); // Delete a course
// MIDDLEWARE
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});
// USERS AUTHENTICATION
Route::get('/users', [AuthController::class, 'getUsers']); // Or UserController

// Get current user data (GET request)
Route::middleware('auth:sanctum')->get('/profile', [AuthController::class, 'getUser']);

// Update user profile (PUT request)
Route::middleware('auth:sanctum')->put('/profile', [AuthController::class, 'updateProfileAdmin']);
Route::middleware('auth:sanctum')->put('/profile', [AuthController::class, 'updateProfileStudent']);


// Forgot Password
Route::post('/forgot-password', [forgotPassword::class, 'forgotPassword']);
Route::post('/reset-password', [resetPassword::class, 'resetPassword']);

// Fetching student semester
Route::get('/students', [FetchStudents::class, 'StudentInformation']);

// validation register students
Route::post('/validate-student', [StudentInfoController::class, 'validateStudentId']);
Route::post('/registerStudentSemester', [StudentInfoController::class, 'registerStudentSemester']);

// Define routes for FeatureController
Route::get('/feature', [FeatureController::class, 'feature']); // Fetch all features
Route::post('/import-features', [FeatureController::class, 'import']); // Import features from a file
// add students
Route::post('/add-student', [AddStudentController::class, 'store']);

// EMAIL
Route::post('/validate-student-id', [EmailController::class, 'validateStudentId']);
Route::any('/send-verification-email', function () {
    return response()->json(['error' => 'Method not allowed. Use POST.'], 405);
})->methods(['GET']);

Route::get('/verify-email/{token}', [EmailController::class, 'verifyEmail'])->name('verify.email');

Route::get('/year-levels', [YearLevelController::class, 'index']);
Route::post('/year-levels', [YearLevelController::class, 'store']);
Route::get('/year-levels/{id}', [YearLevelController::class, 'show']);
Route::put('/year-levels/{id}', [YearLevelController::class, 'update']);
Route::delete('/year-levels/{id}', [YearLevelController::class, 'destroy']);
// add Section
Route::post('/add-section', [AddSections::class, 'addSection']);
