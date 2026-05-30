<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class Gallery extends Model
{
    const KATEGORI = [
        'Ekstrakurikuler',
        'Galeri Umum',
        'Perayaan',
        'Penghargaan',
    ];

    protected $fillable = [
        'judul',
        'slug',
        'kategori',
        'thumbnail',
        'foto_tambahan',
        'deskripsi',
        'tanggal_kegiatan',
    ];

    protected $casts = [
        'tanggal_kegiatan' => 'date',
        'foto_tambahan'    => 'array',
    ];

    protected $appends = ['thumbnail_url', 'foto_tambahan_urls'];

    public function getThumbnailUrlAttribute(): ?string
    {
        if (!$this->thumbnail) return null;
        return Storage::disk('public')->url($this->thumbnail);
    }

    /**
     * Kembalikan array URL publik untuk semua foto tambahan.
     */
    public function getFotoTambahanUrlsAttribute(): array
    {
        if (empty($this->foto_tambahan)) return [];
        return array_map(
            fn($path) => Storage::disk('public')->url($path),
            $this->foto_tambahan
        );
    }

    public static function generateSlug(string $judul): string
    {
        $base = Str::slug($judul);
        $slug = $base;
        $i    = 1;

        while (static::where('slug', $slug)->exists()) {
            $slug = "{$base}-{$i}";
            $i++;
        }

        return $slug;
    }
}
