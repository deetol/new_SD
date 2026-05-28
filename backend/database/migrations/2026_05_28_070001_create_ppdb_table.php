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
        if (Schema::hasTable('ppdb')) {
            return;
        }

        Schema::create('ppdb', function (Blueprint $table) {
            $table->id();
            $table->string('judul');
            $table->integer('tahun_ajaran');
            $table->longText('deskripsi')->nullable();
            $table->longText('persyaratan')->nullable();
            $table->json('alur_langkah')->nullable();
            $table->json('jadwal_kegiatan')->nullable();
            $table->date('tanggal_buka');
            $table->date('tanggal_tutup');
            $table->integer('kuota')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ppdb');
    }
};
