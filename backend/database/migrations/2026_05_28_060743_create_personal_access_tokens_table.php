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
        if (!Schema::hasTable('personal_access_tokens')) {
            Schema::create('teachers', function (Blueprint $table) {
                $table->id();

                $table->string('name');
                $table->string('nip')->nullable();

                $table->string('position');
                $table->string('status')->nullable();

                $table->string('subject')->nullable();

                $table->string('education')->nullable();

                $table->string('photo')->nullable();

                $table->text('description')->nullable();

                $table->boolean('is_active')->default(true);

                $table->integer('order')->default(0);

                $table->boolean('show_on_profile')->default(true);

                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('personal_access_tokens');
    }
};
