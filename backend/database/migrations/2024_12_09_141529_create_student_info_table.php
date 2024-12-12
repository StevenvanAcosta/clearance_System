<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
{
    Schema::table('student_info', function (Blueprint $table) {
        $table->id();
        $table->string('student_id')->unique(); // Make student_id unique
        $table->string('fullname');
        $table->string('email');
        $table->string('course');
        $table->string('year');
        $table->string('section');
        $table->timestamps(false);
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
