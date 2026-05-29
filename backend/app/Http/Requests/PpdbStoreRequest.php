<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PpdbStoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'judul'           => 'required|string|max:255',
            'tahun_ajaran'    => 'required|integer',
            'deskripsi'       => 'nullable|string',
            'persyaratan'     => 'nullable|string',
            'alur_langkah'    => 'nullable|array',
            'jadwal_kegiatan' => 'nullable|array',
            'tanggal_buka'    => 'required|date',
            'tanggal_tutup'   => 'required|date|after_or_equal:tanggal_buka',
            'kuota'           => 'nullable|integer|min:1',
            'is_active'       => 'boolean',
        ];
    }
}
