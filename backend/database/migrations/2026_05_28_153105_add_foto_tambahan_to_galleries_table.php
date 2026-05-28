<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('galleries', function (Blueprint $table) {
            // Array path foto tambahan (selain thumbnail utama)
            // Disimpan sebagai JSON: ["galleries/abc.jpg", "galleries/def.jpg", ...]
            $table->json('foto_tambahan')->nullable()->after('thumbnail');
        });
    }

    public function down(): void
    {
        Schema::table('galleries', function (Blueprint $table) {
            $table->dropColumn('foto_tambahan');
        });
    }
};
