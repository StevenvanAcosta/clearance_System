<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Signatory extends Model
{
    use HasFactory;
    protected $table = 'signatory';
    protected $fillable = ['signatory_office', 'fullname', 'email', 'password'];  // Ensure signatory_office is in fillable

    protected $hidden = ['password']; // Avoid exposing the password in the response
}
