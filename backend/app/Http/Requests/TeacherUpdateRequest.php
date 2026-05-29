<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TeacherUpdateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nama'             => 'sometimes|required|string|max:255',
            'nip'              => 'nullable|string|max:255',
            'jabatan'          => 'sometimes|required|string|max:255',
            'status'           => 'sometimes|required|string|max:255',
            'mata_pelajaran'   => 'nullable|string|max:255',
            'pendidikan'       => 'nullable|string|max:255',
            'foto'             => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'is_active'        => 'boolean',
            'urutan'           => 'integer|min:0',
            'tampil_di_profil' => 'boolean',
        ];
    }
}
