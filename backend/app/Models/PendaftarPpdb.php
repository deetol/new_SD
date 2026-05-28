<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PendaftarPpdb extends Model
{
    protected $table = 'pendaftar_ppdb';

    protected $fillable = [
        'ppdb_id',
        'nomor_pendaftaran',
        'status',
        'nama_lengkap',
        'jenis_kelamin',
        'tempat_lahir',
        'tanggal_lahir',
        'nik',
        'agama',
        'alamat',
        'rt',
        'rw',
        'kelurahan',
        'kecamatan',
        'kabupaten',
        'provinsi',
        'kode_pos',
        'nama_ayah',
        'nama_ibu',
        'nama_wali',
        'no_hp',
        'email',
        'asal_tk',
        'foto',
        'file_kk',
        'file_akta',
        'file_surat_pernyataan',
        'catatan_admin',
        'submitted_at',
    ];

    protected $casts = [
        'tanggal_lahir' => 'date',
        'submitted_at'  => 'datetime',
    ];

    public function ppdb(): BelongsTo
    {
        return $this->belongsTo(Ppdb::class, 'ppdb_id');
    }
}
