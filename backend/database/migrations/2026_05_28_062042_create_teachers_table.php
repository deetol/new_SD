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
        if (Schema::hasTable('teachers')) {
            return;
        }

        Schema::create('teachers', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('nip')->nullable();
            $table->string('jabatan');
            $table->string('status');
            $table->string('mata_pelajaran')->nullable();
            $table->string('pendidikan')->nullable();
            $table->string('foto')->nullable();
            $table->boolean('is_active')->default(true);
            $table->integer('urutan')->default(0);
            $table->boolean('tampil_di_profil')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('teachers');
    }
};
