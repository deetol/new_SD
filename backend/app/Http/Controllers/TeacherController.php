<?php

namespace App\Http\Controllers;

use App\Http\Traits\HandlesImageUpload;
use App\Models\Teacher;
use Illuminate\Http\Request;
use App\Http\Requests\TeacherStoreRequest;
use App\Http\Requests\TeacherUpdateRequest;
use App\Http\Resources\TeacherResource;
use Illuminate\Http\JsonResponse;

class TeacherController extends Controller
{
    use HandlesImageUpload;

    /**
     * Tampilkan semua guru.
     * Query params: ?is_active=true  ?tampil_di_profil=true
     */
    public function index(Request $request): JsonResponse
    {
        $query = Teacher::query();

        if ($request->filled('is_active')) {
            $query->where('is_active', filter_var($request->is_active, FILTER_VALIDATE_BOOLEAN));
        }

        if ($request->filled('tampil_di_profil')) {
            $query->where('tampil_di_profil', filter_var($request->tampil_di_profil, FILTER_VALIDATE_BOOLEAN));
        }

        $teachers = $query->orderBy('urutan')->paginate(20);

        return TeacherResource::collection($teachers)->response();
    }

    /**
     * Simpan data guru baru (dengan upload foto opsional).
     *
     * Form-data fields:
     *   nama, nip, jabatan, status, mata_pelajaran, pendidikan,
     *   foto (file), is_active, urutan, tampil_di_profil
     */
    public function store(TeacherStoreRequest $request): JsonResponse
    {
        $validated = $request->validated();

        if ($request->hasFile('foto')) {
            $validated['foto'] = $this->uploadImage($request->file('foto'), 'teachers');
        } else {
            unset($validated['foto']);
        }

        $teacher = Teacher::create($validated);

        return (new TeacherResource($teacher))
            ->response()
            ->setStatusCode(201);
    }

    /**
     * Tampilkan detail guru.
     */
    public function show(Teacher $teacher): JsonResponse
    {
        return (new TeacherResource($teacher))->response();
    }

    /**
     * Update data guru (dengan ganti foto opsional).
     *
     * Gunakan POST + _method=PUT untuk multipart/form-data.
     */
    public function update(TeacherUpdateRequest $request, Teacher $teacher): JsonResponse
    {
        $validated = $request->validated();

        if ($request->hasFile('foto')) {
            // Hapus foto lama sebelum simpan yang baru
            $this->deleteImage($teacher->foto);
            $validated['foto'] = $this->uploadImage($request->file('foto'), 'teachers');
        } else {
            unset($validated['foto']);
        }

        $teacher->update($validated);

        return (new TeacherResource($teacher))->response();
    }

    /**
     * Hapus data guru beserta fotonya.
     */
    public function destroy(Teacher $teacher): JsonResponse
    {
        $this->deleteImage($teacher->foto);
        $teacher->delete();

        return response()->json(['message' => 'Data guru berhasil dihapus.']);
    }
}
