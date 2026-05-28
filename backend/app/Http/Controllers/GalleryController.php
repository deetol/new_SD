<?php

namespace App\Http\Controllers;

use App\Http\Traits\HandlesImageUpload;
use App\Models\Gallery;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class GalleryController extends Controller
{
    use HandlesImageUpload;

    /**
     * GET /api/galleries
     *
     * Tampilkan semua galeri, diurutkan tanggal kegiatan terbaru.
     */
    public function index(): JsonResponse
    {
        $galleries = Gallery::orderByDesc('tanggal_kegiatan')->get();

        return response()->json($galleries);
    }

    /**
     * POST /api/galleries
     *
     * Simpan galeri baru.
     *
     * Form-data fields:
     *   judul            (required|string)
     *   slug             (opsional — auto-generate dari judul jika kosong)
     *   thumbnail        (required|image|jpg,jpeg,png,webp|max:5 MB)
     *   deskripsi        (opsional|string)
     *   tanggal_kegiatan (required|date, format: Y-m-d)
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'judul'            => 'required|string|max:255',
            'slug'             => 'nullable|string|max:255|unique:galleries,slug',
            'thumbnail'        => 'required|image|mimes:jpg,jpeg,png,webp|max:5120',
            'deskripsi'        => 'nullable|string',
            'tanggal_kegiatan' => 'required|date',
        ]);

        // Auto-generate slug jika tidak dikirim
        $validated['slug'] = $validated['slug'] ?? Gallery::generateSlug($validated['judul']);

        // Upload thumbnail ke storage/app/public/galleries/
        $validated['thumbnail'] = $this->uploadImage($request->file('thumbnail'), 'galleries');

        $gallery = Gallery::create($validated);

        return response()->json([
            'message' => 'Galeri berhasil ditambahkan.',
            'data'    => $gallery,
        ], 201);
    }

    /**
     * GET /api/galleries/{gallery}
     *
     * Tampilkan detail satu galeri (by ID atau slug via route model binding).
     */
    public function show(Gallery $gallery): JsonResponse
    {
        return response()->json([
            'message' => 'Detail galeri berhasil diambil.',
            'data'    => $gallery,
        ]);
    }

    /**
     * PUT /api/galleries/{gallery}
     *
     * Update galeri. Kirim sebagai POST + _method=PUT untuk multipart/form-data.
     *
     * Form-data fields (semua opsional kecuali yang diubah):
     *   judul, slug, thumbnail (file), deskripsi, tanggal_kegiatan
     */
    public function update(Request $request, Gallery $gallery): JsonResponse
    {
        $validated = $request->validate([
            'judul'            => 'sometimes|required|string|max:255',
            'slug'             => 'nullable|string|max:255|unique:galleries,slug,' . $gallery->id,
            'thumbnail'        => 'nullable|image|mimes:jpg,jpeg,png,webp|max:5120',
            'deskripsi'        => 'nullable|string',
            'tanggal_kegiatan' => 'sometimes|required|date',
        ]);

        // Jika judul berubah dan slug tidak dikirim, regenerate slug
        if (isset($validated['judul']) && !isset($validated['slug'])) {
            $validated['slug'] = Gallery::generateSlug($validated['judul']);
        }

        // Ganti thumbnail jika ada file baru
        if ($request->hasFile('thumbnail')) {
            $this->deleteImage($gallery->thumbnail);
            $validated['thumbnail'] = $this->uploadImage($request->file('thumbnail'), 'galleries');
        } else {
            unset($validated['thumbnail']);
        }

        $gallery->update($validated);

        return response()->json([
            'message' => 'Galeri berhasil diperbarui.',
            'data'    => $gallery,
        ]);
    }

    /**
     * DELETE /api/galleries/{gallery}
     *
     * Hapus galeri beserta file thumbnail dari storage.
     */
    public function destroy(Gallery $gallery): JsonResponse
    {
        $this->deleteImage($gallery->thumbnail);
        $gallery->delete();

        return response()->json([
            'message' => 'Galeri berhasil dihapus.',
        ]);
    }
}
