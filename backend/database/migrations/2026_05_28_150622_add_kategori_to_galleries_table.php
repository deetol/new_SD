<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('galleries', function (Blueprint $table) {
            // Tambah setelah kolom slug
            // Kategori: Ekstrakurikuler | Galeri Umum | Perayaan | Penghargaan
            $table->string('kategori')->default('Galeri Umum')->after('slug');
        });
    }

    public function down(): void
    {
        Schema::table('galleries', function (Blueprint $table) {
            $table->dropColumn('kategori');
        });
    }
};
