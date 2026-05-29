<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class PendaftarPpdb extends Model
{
    protected $table = 'pendaftar_ppdb';

    protected $fillable = [
        'ppdb_id', 'nomor_pendaftaran', 'status',
        'nama_lengkap', 'jenis_kelamin', 'tempat_lahir', 'tanggal_lahir',
        'nik', 'agama', 'alamat', 'rt', 'rw',
        'kelurahan', 'kecamatan', 'kabupaten', 'provinsi', 'kode_pos',
        'nama_ayah', 'nama_ibu', 'nama_wali', 'no_hp', 'email', 'asal_tk',
        'foto', 'file_kk', 'file_akta', 'file_surat_pernyataan',
        'catatan_admin', 'submitted_at',
    ];

    protected $casts = [
        'tanggal_lahir' => 'date',
        'submitted_at'  => 'datetime',
    ];

    protected $appends = ['foto_url', 'file_kk_url', 'file_akta_url', 'file_surat_pernyataan_url'];

    public function getFotoUrlAttribute(): ?string
    {
        return $this->foto ? Storage::disk('public')->url($this->foto) : null;
    }

    public function getFileKkUrlAttribute(): ?string
    {
        return $this->file_kk ? Storage::disk('public')->url($this->file_kk) : null;
    }

    public function getFileAktaUrlAttribute(): ?string
    {
        return $this->file_akta ? Storage::disk('public')->url($this->file_akta) : null;
    }

    public function getFileSuratPernyataanUrlAttribute(): ?string
    {
        return $this->file_surat_pernyataan
            ? Storage::disk('public')->url($this->file_surat_pernyataan)
            : null;
    }

    public function ppdb(): BelongsTo
    {
        return $this->belongsTo(Ppdb::class, 'ppdb_id');
    }
}
