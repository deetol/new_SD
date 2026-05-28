<?php

namespace App\Http\Controllers;

use App\Models\Ppdb;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class PpdbController extends Controller
{
    /**
     * Tampilkan semua data PPDB.
     */
    public function index(): JsonResponse
    {
        $ppdb = Ppdb::latest()->get();

        return response()->json($ppdb);
    }

    /**
     * Simpan data PPDB baru.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
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
        ]);

        $ppdb = Ppdb::create($validated);

        return response()->json($ppdb, 201);
    }

    /**
     * Tampilkan detail PPDB beserta pendaftar.
     */
    public function show(Ppdb $ppdb): JsonResponse
    {
        $ppdb->load('pendaftar');

        return response()->json($ppdb);
    }

    /**
     * Update data PPDB.
     */
    public function update(Request $request, Ppdb $ppdb): JsonResponse
    {
        $validated = $request->validate([
            'judul'           => 'sometimes|required|string|max:255',
            'tahun_ajaran'    => 'sometimes|required|integer',
            'deskripsi'       => 'nullable|string',
            'persyaratan'     => 'nullable|string',
            'alur_langkah'    => 'nullable|array',
            'jadwal_kegiatan' => 'nullable|array',
            'tanggal_buka'    => 'sometimes|required|date',
            'tanggal_tutup'   => 'sometimes|required|date|after_or_equal:tanggal_buka',
            'kuota'           => 'nullable|integer|min:1',
            'is_active'       => 'boolean',
        ]);

        $ppdb->update($validated);

        return response()->json($ppdb);
    }

    /**
     * Hapus data PPDB.
     */
    public function destroy(Ppdb $ppdb): JsonResponse
    {
        $ppdb->delete();

        return response()->json(['message' => 'Data PPDB berhasil dihapus.']);
    }

    /**
     * Tampilkan PPDB yang sedang aktif.
     */
    public function aktif(): JsonResponse
    {
        $ppdb = Ppdb::where('is_active', true)
            ->whereDate('tanggal_buka', '<=', now())
            ->whereDate('tanggal_tutup', '>=', now())
            ->first();

        if (!$ppdb) {
            return response()->json(['message' => 'Tidak ada PPDB yang sedang aktif.'], 404);
        }

        return response()->json($ppdb);
    }
}
