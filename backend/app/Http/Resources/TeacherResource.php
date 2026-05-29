<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TeacherResource extends JsonResource
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
            'nama' => $this->nama,
            'nip' => $this->nip,
            'jabatan' => $this->jabatan,
            'status' => $this->status,
            'mata_pelajaran' => $this->mata_pelajaran,
            'pendidikan' => $this->pendidikan,
            'foto_url' => $this->foto_url,
            'is_active' => (bool) $this->is_active,
            'urutan' => $this->urutan,
            'tampil_di_profil' => (bool) $this->tampil_di_profil,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
