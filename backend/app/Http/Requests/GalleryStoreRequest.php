<?php

namespace App\Http\Requests;

use App\Models\Gallery;
use Illuminate\Foundation\Http\FormRequest;

class GalleryStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'judul'              => 'required|string|max:255',
            'kategori'           => 'required|in:' . implode(',', Gallery::KATEGORI),
            'slug'               => 'nullable|string|max:255|unique:galleries,slug',
            'thumbnail'          => 'required|image|mimes:jpg,jpeg,png,webp|max:5120',
            'foto_tambahan'      => 'nullable|array|max:10',
            'foto_tambahan.*'    => 'image|mimes:jpg,jpeg,png,webp|max:5120',
            'deskripsi'          => 'nullable|string',
            'tanggal_kegiatan'   => 'required|date',
        ];
    }
}
