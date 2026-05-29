<?php

namespace App\Http\Requests;

use App\Models\Gallery;
use Illuminate\Foundation\Http\FormRequest;

class GalleryUpdateRequest extends FormRequest
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
        $galleryId = $this->route('gallery')?->id ?? null;

        return [
            'judul'                  => 'sometimes|required|string|max:255',
            'kategori'               => 'sometimes|required|in:' . implode(',', Gallery::KATEGORI),
            'slug'                   => 'nullable|string|max:255|unique:galleries,slug,' . $galleryId,
            'thumbnail'              => 'nullable|image|mimes:jpg,jpeg,png,webp|max:5120',
            'foto_tambahan'          => 'nullable|array|max:10',
            'foto_tambahan.*'        => 'image|mimes:jpg,jpeg,png,webp|max:5120',
            'foto_tambahan_hapus'    => 'nullable|array',
            'foto_tambahan_hapus.*'  => 'integer|min:0',
            'deskripsi'              => 'nullable|string',
            'tanggal_kegiatan'       => 'sometimes|required|date',
        ];
    }
}
