<?php

namespace App\Http\Controllers;

use App\Models\Ppdb;
use Illuminate\Http\Request;
use App\Http\Requests\PpdbStoreRequest;
use App\Http\Requests\PpdbUpdateRequest;
use App\Http\Resources\PpdbResource;
use Illuminate\Http\JsonResponse;

class PpdbController extends Controller
{
    /**
     * Tampilkan semua data PPDB.
     */
    public function index(): JsonResponse
    {
        $ppdb = Ppdb::latest()->paginate(10);

        return PpdbResource::collection($ppdb)->response();
    }

    /**
     * Simpan data PPDB baru.
     */
    public function store(PpdbStoreRequest $request): JsonResponse
    {
        $validated = $request->validated();

        $ppdb = Ppdb::create($validated);

        return (new PpdbResource($ppdb))->response()->setStatusCode(201);
    }

    /**
     * Tampilkan detail PPDB beserta pendaftar.
     */
    public function show(Ppdb $ppdb): JsonResponse
    {
        $ppdb->load('pendaftar');

        return (new PpdbResource($ppdb))->response();
    }

    /**
     * Update data PPDB.
     */
    public function update(PpdbUpdateRequest $request, Ppdb $ppdb): JsonResponse
    {
        $validated = $request->validated();

        $ppdb->update($validated);

        return (new PpdbResource($ppdb))->response();
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

        return (new PpdbResource($ppdb))->response();
    }
}
