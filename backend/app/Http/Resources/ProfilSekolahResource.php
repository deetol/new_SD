<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProfilSekolahResource extends JsonResource
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
            'id'                 => $this->id,
            'nama_sekolah'       => $this->nama_sekolah,
            'npsn'               => $this->npsn,
            'alamat'             => $this->alamat,
            'kelurahan'          => $this->kelurahan,
            'kecamatan'          => $this->kecamatan,
            'kabupaten'          => $this->kabupaten,
            'provinsi'           => $this->provinsi,
            'kode_pos'           => $this->kode_pos,
            'no_telepon'         => $this->no_telepon,
            'email'              => $this->email,
            'sejarah'            => $this->sejarah,
            'visi'               => $this->visi,
            'misi'               => $this->misi,
            'pengantar'          => $this->pengantar,
            'visi_misi_pengantar'=> $this->visi_misi_pengantar,
            'penghargaan'        => $this->penghargaan ?? [],
            'timeline'           => $this->timeline ?? [],
            'kepala_sekolah'     => $this->kepala_sekolah,
            'logo_url'           => $this->logo_url,
        ];
    }
}
