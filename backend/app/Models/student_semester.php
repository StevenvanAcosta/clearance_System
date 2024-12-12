<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class student_semester extends Model
{
    // Specify the table name explicitly (if it's not the default plural form)
    protected $table = 'student_semester';  // Corrected the table name
    public $timestamps = true;

    // Define the fillable attributes to prevent mass-assignment vulnerabilities
    protected $fillable = [
        'student_id',
        'fullname', 
        'email', 
        'course', 
        'year', 
        'section', 
        'semester',
        'created_at'  // Added semester
    ];
}
