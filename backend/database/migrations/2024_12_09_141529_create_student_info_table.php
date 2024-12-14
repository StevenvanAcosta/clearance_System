<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
//     public function up(): void
// {
//     Schema::table('student_info', function (Blueprint $table) {
//         $table->id();
//         $table->string('student_id')->unique(); // Make student_id unique
//         $table->string('fullname');
//         $table->string('email');
//         $table->timestamp('email_verified_at')->nullable();
//         $table->string('course');
//         $table->string('year');
//         $table->string('section');
//         $table->timestamps(false);
//     });
// }
public function up(): void
{
    Schema::create('student_info', function (Blueprint $table) {
        $table->id();
        $table->string('student_id')->unique();
        $table->string('fullname');
        $table->string('email')->unique();
        $table->string('course');
        $table->string('year');
        $table->string('section');
        $table->timestamps();
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('student_info', function (Blueprint $table) {
            //
        });
    }
};
