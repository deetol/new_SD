<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class Gallery extends Model
{
    protected $fillable = [
        'judul',
        'slug',
        'thumbnail',
        'deskripsi',
        'tanggal_kegiatan',
    ];

    protected $casts = [
        'tanggal_kegiatan' => 'date',
    ];

    /**
     * Append thumbnail_url ke setiap response JSON.
     */
    protected $appends = ['thumbnail_url'];

    /**
     * Accessor: URL publik thumbnail.
     */
    public function getThumbnailUrlAttribute(): ?string
    {
        if (!$this->thumbnail) {
            return null;
        }

        return Storage::disk('public')->url($this->thumbnail);
    }

    /**
     * Auto-generate slug dari judul jika belum diset.
     */
    public static function generateSlug(string $judul): string
    {
        $slug = Str::slug($judul);
        $count = static::where('slug', 'like', "{$slug}%")->count();

        return $count > 0 ? "{$slug}-{$count}" : $slug;
    }
}
