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
        if (Schema::hasTable('pendaftar_ppdb')) {
            return;
        }

        Schema::create('pendaftar_ppdb', function (Blueprint $table) {
            $table->id();
            $table->foreignId('ppdb_id')->constrained('ppdb')->onDelete('cascade');
            $table->string('nomor_pendaftaran')->unique();
            $table->string('status')->default('menunggu');
            $table->string('nama_lengkap');
            $table->enum('jenis_kelamin', ['L', 'P']);
            $table->string('tempat_lahir');
            $table->date('tanggal_lahir');
            $table->string('nik')->nullable();
            $table->string('agama')->nullable();
            $table->text('alamat');
            $table->string('rt')->nullable();
            $table->string('rw')->nullable();
            $table->string('kelurahan')->nullable();
            $table->string('kecamatan')->nullable();
            $table->string('kabupaten')->nullable();
            $table->string('provinsi')->nullable();
            $table->string('kode_pos')->nullable();
            $table->string('nama_ayah')->nullable();
            $table->string('nama_ibu')->nullable();
            $table->string('nama_wali')->nullable();
            $table->string('no_hp');
            $table->string('email')->nullable();
            $table->string('asal_tk')->nullable();
            $table->string('foto')->nullable();
            $table->string('file_kk')->nullable();
            $table->string('file_akta')->nullable();
            $table->string('file_surat_pernyataan')->nullable();
            $table->text('catatan_admin')->nullable();
            $table->timestamp('submitted_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pendaftar_ppdb');
    }
};
