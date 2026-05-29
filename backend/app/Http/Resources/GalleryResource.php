<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GalleryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'judul' => $this->judul,
            'slug' => $this->slug,
            'kategori' => $this->kategori,
            'thumbnail_url' => $this->thumbnail_url,
            'foto_tambahan_urls' => $this->foto_tambahan_urls,
            'deskripsi' => $this->deskripsi,
            'tanggal_kegiatan' => $this->tanggal_kegiatan,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
