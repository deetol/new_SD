<?php

namespace App\Http\Controllers;

use App\Http\Traits\HandlesImageUpload;
use App\Models\Teacher;
use Illuminate\Http\Request;
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

        $teachers = $query->orderBy('urutan')->get();

        return response()->json($teachers);
    }

    /**
     * Simpan data guru baru (dengan upload foto opsional).
     *
     * Form-data fields:
     *   nama, nip, jabatan, status, mata_pelajaran, pendidikan,
     *   foto (file), is_active, urutan, tampil_di_profil
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'nama'             => 'required|string|max:255',
            'nip'              => 'nullable|string|max:255',
            'jabatan'          => 'required|string|max:255',
            'status'           => 'required|string|max:255',
            'mata_pelajaran'   => 'nullable|string|max:255',
            'pendidikan'       => 'nullable|string|max:255',
            'foto'             => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'is_active'        => 'boolean',
            'urutan'           => 'integer|min:0',
            'tampil_di_profil' => 'boolean',
        ]);

        if ($request->hasFile('foto')) {
            $validated['foto'] = $this->uploadImage($request->file('foto'), 'teachers');
        } else {
            unset($validated['foto']);
        }

        $teacher = Teacher::create($validated);

        return response()->json($teacher, 201);
    }

    /**
     * Tampilkan detail guru.
     */
    public function show(Teacher $teacher): JsonResponse
    {
        return response()->json($teacher);
    }

    /**
     * Update data guru (dengan ganti foto opsional).
     *
     * Gunakan POST + _method=PUT untuk multipart/form-data.
     */
    public function update(Request $request, Teacher $teacher): JsonResponse
    {
        $validated = $request->validate([
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
        ]);

        if ($request->hasFile('foto')) {
            // Hapus foto lama sebelum simpan yang baru
            $this->deleteImage($teacher->foto);
            $validated['foto'] = $this->uploadImage($request->file('foto'), 'teachers');
        } else {
            unset($validated['foto']);
        }

        $teacher->update($validated);

        return response()->json($teacher);
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
