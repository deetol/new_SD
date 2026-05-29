<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PpdbUpdateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'judul'           => 'sometimes|required|string|max:255',
            'tahun_ajaran'    => 'sometimes|required|integer',
            'deskripsi'       => 'nullable|string',
            'persyaratan'     => 'nullable|string',
            'alur_langkah'    => 'nullable|array',
            'jadwal_kegiatan' => 'nullable|array',
            'tanggal_buka'    => 'sometimes|required|date',
            'tanggal_tutup'   => 'sometimes|required|date|after_or_equal:tanggal_buka',
            'kuota'           => 'nullable|integer|min:1',
            'is_active'       => 'boolean',
        ];
    }
}
