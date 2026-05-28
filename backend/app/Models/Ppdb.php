<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Ppdb extends Model
{
    protected $table = 'ppdb';

    protected $fillable = [
        'judul',
        'tahun_ajaran',
        'deskripsi',
        'persyaratan',
        'alur_langkah',
        'jadwal_kegiatan',
        'tanggal_buka',
        'tanggal_tutup',
        'kuota',
        'is_active',
    ];

    protected $casts = [
        'alur_langkah'    => 'array',
        'jadwal_kegiatan' => 'array',
        'tanggal_buka'    => 'date',
        'tanggal_tutup'   => 'date',
        'is_active'       => 'boolean',
    ];

    public function pendaftar(): HasMany
    {
        return $this->hasMany(PendaftarPpdb::class, 'ppdb_id');
    }
}
