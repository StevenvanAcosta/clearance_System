<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class YearLevel extends Model
{
    protected $table = 'year_level'; // Ensure the table name is plural
    protected $fillable = ['year_level']; // Fillable fields
}
