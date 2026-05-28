<?php

namespace App\Http\Controllers;

use App\Models\ProfilSekolah;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ProfilSekolahController extends Controller
{
    /**
     * Tampilkan profil sekolah (hanya 1 record).
     */
    public function index(): JsonResponse
    {
        $profil = ProfilSekolah::first();

        if (!$profil) {
            return response()->json(['message' => 'Profil sekolah belum diisi.'], 404);
        }

        return response()->json($profil);
    }

    /**
     * Simpan profil sekolah baru.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'nama_sekolah'       => 'required|string|max:255',
            'npsn'               => 'nullable|string|max:255',
            'alamat'             => 'required|string|max:255',
            'kelurahan'          => 'nullable|string|max:255',
            'kecamatan'          => 'nullable|string|max:255',
            'kabupaten'          => 'nullable|string|max:255',
            'provinsi'           => 'nullable|string|max:255',
            'kode_pos'           => 'nullable|string|max:255',
            'no_telepon'         => 'nullable|string|max:255',
            'email'              => 'nullable|email|max:255',
            'sejarah'            => 'nullable|string',
            'visi'               => 'nullable|string',
            'misi'               => 'nullable|string',
            'pengantar'          => 'nullable|string',
            'visi_misi_pengantar'=> 'nullable|string',
            'penghargaan'        => 'nullable|array',
            'timeline'           => 'nullable|array',
            'kepala_sekolah'     => 'nullable|string|max:255',
            'logo'               => 'nullable|string|max:255',
        ]);

        $profil = ProfilSekolah::create($validated);

        return response()->json($profil, 201);
    }

    /**
     * Tampilkan profil sekolah berdasarkan ID.
     */
    public function show(ProfilSekolah $profilSekolah): JsonResponse
    {
        return response()->json($profilSekolah);
    }

    /**
     * Update profil sekolah.
     */
    public function update(Request $request, ProfilSekolah $profilSekolah): JsonResponse
    {
        $validated = $request->validate([
            'nama_sekolah'       => 'sometimes|required|string|max:255',
            'npsn'               => 'nullable|string|max:255',
            'alamat'             => 'sometimes|required|string|max:255',
            'kelurahan'          => 'nullable|string|max:255',
            'kecamatan'          => 'nullable|string|max:255',
            'kabupaten'          => 'nullable|string|max:255',
            'provinsi'           => 'nullable|string|max:255',
            'kode_pos'           => 'nullable|string|max:255',
            'no_telepon'         => 'nullable|string|max:255',
            'email'              => 'nullable|email|max:255',
            'sejarah'            => 'nullable|string',
            'visi'               => 'nullable|string',
            'misi'               => 'nullable|string',
            'pengantar'          => 'nullable|string',
            'visi_misi_pengantar'=> 'nullable|string',
            'penghargaan'        => 'nullable|array',
            'timeline'           => 'nullable|array',
            'kepala_sekolah'     => 'nullable|string|max:255',
            'logo'               => 'nullable|string|max:255',
        ]);

        $profilSekolah->update($validated);

        return response()->json($profilSekolah);
    }

    /**
     * Hapus profil sekolah.
     */
    public function destroy(ProfilSekolah $profilSekolah): JsonResponse
    {
        $profilSekolah->delete();

        return response()->json(['message' => 'Profil sekolah berhasil dihapus.']);
    }
}
