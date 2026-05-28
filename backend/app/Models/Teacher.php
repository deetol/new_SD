<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Teacher extends Model
{
    protected $fillable = [
        'nama',
        'nip',
        'jabatan',
        'status',
        'mata_pelajaran',
        'pendidikan',
        'foto',
        'is_active',
        'urutan',
        'tampil_di_profil',
    ];

    protected $casts = [
        'is_active'        => 'boolean',
        'tampil_di_profil' => 'boolean',
    ];

    /**
     * Append foto_url ke setiap response JSON.
     */
    protected $appends = ['foto_url'];

    /**
     * Accessor: kembalikan URL publik foto.
     */
    public function getFotoUrlAttribute(): ?string
    {
        if (!$this->foto) {
            return null;
        }

        return Storage::disk('public')->url($this->foto);
    }
}
