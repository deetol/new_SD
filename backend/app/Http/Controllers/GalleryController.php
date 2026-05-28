<?php

namespace App\Http\Controllers;

use App\Http\Traits\HandlesImageUpload;
use App\Models\Gallery;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class GalleryController extends Controller
{
    use HandlesImageUpload;

    public function index(Request $request): JsonResponse
    {
        $query = Gallery::orderByDesc('tanggal_kegiatan');

        if ($request->filled('kategori')) {
            $query->where('kategori', $request->kategori);
        }

        return response()->json($query->get());
    }

    /**
     * POST /api/galleries
     *
     * Form-data:
     *   judul              required|string
     *   kategori           required|in:...
     *   thumbnail          required|image|max:5120
     *   foto_tambahan[]    nullable|array of image files (maks 10 foto)
     *   deskripsi          nullable|string
     *   tanggal_kegiatan   required|date
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'judul'              => 'required|string|max:255',
            'kategori'           => 'required|in:' . implode(',', Gallery::KATEGORI),
            'slug'               => 'nullable|string|max:255|unique:galleries,slug',
            'thumbnail'          => 'required|image|mimes:jpg,jpeg,png,webp|max:5120',
            'foto_tambahan'      => 'nullable|array|max:10',
            'foto_tambahan.*'    => 'image|mimes:jpg,jpeg,png,webp|max:5120',
            'deskripsi'          => 'nullable|string',
            'tanggal_kegiatan'   => 'required|date',
        ]);

        $validated['slug']      = $validated['slug'] ?? Gallery::generateSlug($validated['judul']);
        $validated['thumbnail'] = $this->uploadImage($request->file('thumbnail'), 'galleries');

        // Upload semua foto tambahan
        if ($request->hasFile('foto_tambahan')) {
            $validated['foto_tambahan'] = array_map(
                fn($file) => $this->uploadImage($file, 'galleries'),
                $request->file('foto_tambahan')
            );
        } else {
            $validated['foto_tambahan'] = [];
        }

        return response()->json(Gallery::create($validated), 201);
    }

    public function show(Gallery $gallery): JsonResponse
    {
        return response()->json($gallery);
    }

    /**
     * PUT /api/galleries/{gallery}
     * Kirim sebagai POST + _method=PUT untuk multipart/form-data.
     *
     * foto_tambahan_hapus[]  — array index foto tambahan yang ingin dihapus (0-based)
     * foto_tambahan[]        — file baru yang ditambahkan
     */
    public function update(Request $request, Gallery $gallery): JsonResponse
    {
        $validated = $request->validate([
            'judul'                  => 'sometimes|required|string|max:255',
            'kategori'               => 'sometimes|required|in:' . implode(',', Gallery::KATEGORI),
            'slug'                   => 'nullable|string|max:255|unique:galleries,slug,' . $gallery->id,
            'thumbnail'              => 'nullable|image|mimes:jpg,jpeg,png,webp|max:5120',
            'foto_tambahan'          => 'nullable|array|max:10',
            'foto_tambahan.*'        => 'image|mimes:jpg,jpeg,png,webp|max:5120',
            'foto_tambahan_hapus'    => 'nullable|array',
            'foto_tambahan_hapus.*'  => 'integer|min:0',
            'deskripsi'              => 'nullable|string',
            'tanggal_kegiatan'       => 'sometimes|required|date',
        ]);

        if (isset($validated['judul']) && !isset($validated['slug'])) {
            $validated['slug'] = Gallery::generateSlug($validated['judul']);
        }

        // Ganti thumbnail utama
        if ($request->hasFile('thumbnail')) {
            $this->deleteImage($gallery->thumbnail);
            $validated['thumbnail'] = $this->uploadImage($request->file('thumbnail'), 'galleries');
        } else {
            unset($validated['thumbnail']);
        }

        // Kelola foto tambahan
        $existingFotos = $gallery->foto_tambahan ?? [];

        // Hapus foto yang diminta
        if (!empty($validated['foto_tambahan_hapus'])) {
            foreach ($validated['foto_tambahan_hapus'] as $idx) {
                if (isset($existingFotos[$idx])) {
                    $this->deleteImage($existingFotos[$idx]);
                    unset($existingFotos[$idx]);
                }
            }
            $existingFotos = array_values($existingFotos); // reindex
        }

        // Tambah foto baru
        if ($request->hasFile('foto_tambahan')) {
            $newFotos = array_map(
                fn($file) => $this->uploadImage($file, 'galleries'),
                $request->file('foto_tambahan')
            );
            $existingFotos = array_merge($existingFotos, $newFotos);
        }

        $validated['foto_tambahan'] = $existingFotos;
        unset($validated['foto_tambahan_hapus']);

        $gallery->update($validated);

        return response()->json($gallery);
    }

    public function destroy(Gallery $gallery): JsonResponse
    {
        // Hapus thumbnail utama
        $this->deleteImage($gallery->thumbnail);

        // Hapus semua foto tambahan
        foreach ($gallery->foto_tambahan ?? [] as $path) {
            $this->deleteImage($path);
        }

        $gallery->delete();

        return response()->json(['message' => 'Galeri berhasil dihapus.']);
    }
}
