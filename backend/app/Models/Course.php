<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    protected $table = 'course'; // Table name
    protected $fillable = [
        'course_code',
        'course_description'
    ]; // Fillable fields
}
