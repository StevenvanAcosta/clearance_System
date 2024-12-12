<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class section extends Model
{
    protected $table = 'section'; // Table name
    protected $fillable = ['section_field']; // Fillable fields
}
