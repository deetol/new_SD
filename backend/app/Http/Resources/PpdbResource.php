<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PpdbResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * Explicitly maps all fields to decouple the API contract
     * from the underlying database schema.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'               => $this->id,
            'judul'            => $this->judul,
            'tahun_ajaran'     => $this->tahun_ajaran,
            'deskripsi'        => $this->deskripsi,
            'persyaratan'      => $this->persyaratan,
            'alur_langkah'     => $this->alur_langkah ?? [],
            'jadwal_kegiatan'  => $this->jadwal_kegiatan ?? [],
            'tanggal_buka'     => $this->tanggal_buka,
            'tanggal_tutup'    => $this->tanggal_tutup,
            'kuota'            => $this->kuota,
            'is_active'        => (bool) $this->is_active,
            'created_at'       => $this->created_at,
            'updated_at'       => $this->updated_at,
        ];
    }
}
