<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Rename teachers table columns from the old English schema
 * (created by the broken personal_access_tokens migration) to the
 * correct Indonesian schema used by the Teacher model.
 *
 * Old → New:
 *   name          → nama
 *   position      → jabatan
 *   photo         → foto
 *   subject       → mata_pelajaran
 *   education     → pendidikan
 *   order         → urutan
 *   show_on_profile → tampil_di_profil
 *   description   → (drop — not in current model)
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::table('teachers', function (Blueprint $table) {
            // Only rename if the old column names still exist
            if (Schema::hasColumn('teachers', 'name') && !Schema::hasColumn('teachers', 'nama')) {
                $table->renameColumn('name', 'nama');
            }
            if (Schema::hasColumn('teachers', 'position') && !Schema::hasColumn('teachers', 'jabatan')) {
                $table->renameColumn('position', 'jabatan');
            }
            if (Schema::hasColumn('teachers', 'photo') && !Schema::hasColumn('teachers', 'foto')) {
                $table->renameColumn('photo', 'foto');
            }
            if (Schema::hasColumn('teachers', 'subject') && !Schema::hasColumn('teachers', 'mata_pelajaran')) {
                $table->renameColumn('subject', 'mata_pelajaran');
            }
            if (Schema::hasColumn('teachers', 'education') && !Schema::hasColumn('teachers', 'pendidikan')) {
                $table->renameColumn('education', 'pendidikan');
            }
            if (Schema::hasColumn('teachers', 'order') && !Schema::hasColumn('teachers', 'urutan')) {
                $table->renameColumn('order', 'urutan');
            }
            if (Schema::hasColumn('teachers', 'show_on_profile') && !Schema::hasColumn('teachers', 'tampil_di_profil')) {
                $table->renameColumn('show_on_profile', 'tampil_di_profil');
            }
            // Drop description column — not used in current model
            if (Schema::hasColumn('teachers', 'description')) {
                $table->dropColumn('description');
            }
        });
    }

    public function down(): void
    {
        Schema::table('teachers', function (Blueprint $table) {
            if (Schema::hasColumn('teachers', 'nama'))           $table->renameColumn('nama', 'name');
            if (Schema::hasColumn('teachers', 'jabatan'))        $table->renameColumn('jabatan', 'position');
            if (Schema::hasColumn('teachers', 'foto'))           $table->renameColumn('foto', 'photo');
            if (Schema::hasColumn('teachers', 'mata_pelajaran')) $table->renameColumn('mata_pelajaran', 'subject');
            if (Schema::hasColumn('teachers', 'pendidikan'))     $table->renameColumn('pendidikan', 'education');
            if (Schema::hasColumn('teachers', 'urutan'))         $table->renameColumn('urutan', 'order');
            if (Schema::hasColumn('teachers', 'tampil_di_profil')) $table->renameColumn('tampil_di_profil', 'show_on_profile');
        });
    }
};
