<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProfilSekolah extends Model
{
    protected $table = 'profil_sekolah';

    protected $fillable = [
        'nama_sekolah',
        'npsn',
        'alamat',
        'kelurahan',
        'kecamatan',
        'kabupaten',
        'provinsi',
        'kode_pos',
        'no_telepon',
        'email',
        'sejarah',
        'visi',
        'misi',
        'pengantar',
        'visi_misi_pengantar',
        'penghargaan',
        'timeline',
        'kepala_sekolah',
        'logo',
    ];

    protected $casts = [
        'penghargaan' => 'array',
        'timeline'    => 'array',
    ];
}
