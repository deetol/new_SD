<?php

namespace App\Http\Controllers;

use App\Http\Traits\HandlesImageUpload;
use App\Http\Traits\SanitizesInput;
use App\Http\Traits\LogsAdminActions;
use App\Models\Gallery;
use Illuminate\Http\Request;
use App\Http\Requests\GalleryStoreRequest;
use App\Http\Requests\GalleryUpdateRequest;
use App\Http\Resources\GalleryResource;
use Illuminate\Http\JsonResponse;

class GalleryController extends Controller
{
    use HandlesImageUpload, SanitizesInput, LogsAdminActions;

    public function index(Request $request): JsonResponse
    {
        $query = Gallery::orderByDesc('tanggal_kegiatan');

        if ($request->filled('kategori')) {
            $query->where('kategori', $request->kategori);
        }

        return GalleryResource::collection($query->paginate(12))->response();
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
    public function store(GalleryStoreRequest $request): JsonResponse
    {
        $validated = $request->validated();

        // Sanitize HTML fields to prevent XSS
        $validated = $this->sanitizeFields($validated, ['deskripsi'], allowBasicFormatting: true);

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

        return (new GalleryResource(Gallery::create($validated)))
            ->response()
            ->setStatusCode(201);
    }

    public function show(Gallery $gallery): JsonResponse
    {
        return (new GalleryResource($gallery))->response();
    }

    /**
     * PUT /api/galleries/{gallery}
     * Kirim sebagai POST + _method=PUT untuk multipart/form-data.
     *
     * foto_tambahan_hapus[]  — array index foto tambahan yang ingin dihapus (0-based)
     * foto_tambahan[]        — file baru yang ditambahkan
     */
    public function update(GalleryUpdateRequest $request, Gallery $gallery): JsonResponse
    {
        $validated = $request->validated();

        // Sanitize HTML fields to prevent XSS
        $validated = $this->sanitizeFields($validated, ['deskripsi'], allowBasicFormatting: true);

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

        $this->logAdminAction('updated', 'gallery', $gallery->id, additionalData: [
            'judul' => $gallery->judul,
            'kategori' => $gallery->kategori,
        ]);

        return (new GalleryResource($gallery))->response();
    }

    public function destroy(Gallery $gallery): JsonResponse
    {
        $galleryId = $gallery->id;
        $galleryJudul = $gallery->judul;

        // Hapus thumbnail utama
        $this->deleteImage($gallery->thumbnail);

        // Hapus semua foto tambahan
        foreach ($gallery->foto_tambahan ?? [] as $path) {
            $this->deleteImage($path);
        }

        $gallery->delete();

        $this->logAdminAction('deleted', 'gallery', $galleryId, additionalData: [
            'judul' => $galleryJudul,
        ]);

        return response()->json(['message' => 'Galeri berhasil dihapus.']);
    }
}
