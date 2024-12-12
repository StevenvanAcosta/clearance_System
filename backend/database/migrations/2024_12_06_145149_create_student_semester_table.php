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
            Schema::create('student_semester', function (Blueprint $table) {
                $table->id();
                $table->string('student_id');
                $table->string('fullname');;
                $table->string('email');
                $table->string('course');
                $table->string('year');
                $table->string('section');
                $table->string('semester'); // Added semester field
                $table->timestamps()->nullable(); // Add timestamps for auditing
            });
        }
        

        /**
         * Reverse the migrations.
         */
        public function down(): void
        {
            Schema::dropIfExists('student_semester');
        }
    };
