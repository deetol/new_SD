<?php

namespace App\Http\Controllers;

use App\Models\PendaftarPpdb;
use App\Models\Ppdb;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Str;

use App\Http\Traits\HandlesImageUpload;

class PendaftarPpdbController extends Controller
{
    use HandlesImageUpload;
    /**
     * Tampilkan semua pendaftar (bisa filter by ppdb_id atau status).
     */
    public function index(Request $request): JsonResponse
    {
        $query = PendaftarPpdb::with('ppdb');

        if ($request->filled('ppdb_id')) {
            $query->where('ppdb_id', $request->ppdb_id);
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $pendaftar = $query->latest()->paginate(20);

        return response()->json($pendaftar);
    }

    /**
     * GET /api/pendaftar-ppdb/cek?nomor=PPDB-2026-XXXXX
     *
     * Cek status pendaftaran berdasarkan nomor pendaftaran — publik.
     * Hanya mengembalikan data yang aman ditampilkan ke publik.
     */
    public function cek(Request $request): JsonResponse
    {
        $request->validate([
            'nomor' => 'required|string|max:50',
        ]);

        $pendaftar = PendaftarPpdb::with('ppdb')
            ->where('nomor_pendaftaran', strtoupper(trim($request->nomor)))
            ->first();

        if (!$pendaftar) {
            return response()->json([
                'message' => 'Nomor pendaftaran tidak ditemukan.',
            ], 404);
        }

        // Hanya kembalikan data yang aman — jangan expose data sensitif
        return response()->json([
            'nomor_pendaftaran' => $pendaftar->nomor_pendaftaran,
            'nama_lengkap'      => $pendaftar->nama_lengkap,
            'jenis_kelamin'     => $pendaftar->jenis_kelamin,
            'status'            => $pendaftar->status,
            'catatan_admin'     => $pendaftar->catatan_admin,
            'submitted_at'      => $pendaftar->submitted_at,
            'ppdb'              => $pendaftar->ppdb ? [
                'judul'        => $pendaftar->ppdb->judul,
                'tahun_ajaran' => $pendaftar->ppdb->tahun_ajaran,
            ] : null,
        ]);
    }

    /**
     * Daftarkan pendaftar baru.
     * Menerima multipart/form-data karena ada upload berkas.
     *
     * Berkas yang diterima:
     *   foto                  — foto calon siswa (jpg/png, maks 2MB)
     *   file_kk               — scan Kartu Keluarga (jpg/png/pdf, maks 5MB)
     *   file_akta             — scan akta kelahiran (jpg/png/pdf, maks 5MB)
     *   file_surat_pernyataan — surat pernyataan (jpg/png/pdf, maks 5MB)
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'ppdb_id'               => 'required|exists:ppdb,id',
            'nama_lengkap'          => 'required|string|max:255',
            'jenis_kelamin'         => 'required|in:L,P',
            'tempat_lahir'          => 'required|string|max:255',
            'tanggal_lahir'         => 'required|date',
            'nik'                   => 'nullable|string|max:255',
            'agama'                 => 'nullable|string|max:255',
            'alamat'                => 'required|string',
            'rt'                    => 'nullable|string|max:255',
            'rw'                    => 'nullable|string|max:255',
            'kelurahan'             => 'nullable|string|max:255',
            'kecamatan'             => 'nullable|string|max:255',
            'kabupaten'             => 'nullable|string|max:255',
            'provinsi'              => 'nullable|string|max:255',
            'kode_pos'              => 'nullable|string|max:255',
            'nama_ayah'             => 'nullable|string|max:255',
            'nama_ibu'              => 'nullable|string|max:255',
            'nama_wali'             => 'nullable|string|max:255',
            'no_hp'                 => 'required|string|max:255',
            'email'                 => 'nullable|email|max:255',
            'asal_tk'               => 'nullable|string|max:255',
            // Berkas upload
            'foto'                  => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'file_kk'               => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:5120',
            'file_akta'             => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:5120',
            'file_surat_pernyataan' => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:5120',
        ]);

        // Upload berkas ke storage/app/public/ppdb-berkas/
        foreach (['foto', 'file_kk', 'file_akta', 'file_surat_pernyataan'] as $field) {
            if ($request->hasFile($field)) {
                $validated[$field] = $request->file($field)->store('ppdb-berkas', 'public');
            } else {
                unset($validated[$field]);
            }
        }

        // Generate nomor pendaftaran otomatis: PPDB-YYYY-XXXXX
        $ppdb = Ppdb::findOrFail($validated['ppdb_id']);
        $validated['nomor_pendaftaran'] = 'PPDB-' . $ppdb->tahun_ajaran . '-' . strtoupper(Str::random(5));
        $validated['status']            = 'menunggu';
        $validated['submitted_at']      = now();

        $pendaftar = PendaftarPpdb::create($validated);

        return response()->json($pendaftar, 201);
    }

    /**
     * Tampilkan detail pendaftar.
     */
    public function show(PendaftarPpdb $pendaftarPpdb): JsonResponse
    {
        $pendaftarPpdb->load('ppdb');

        return response()->json($pendaftarPpdb);
    }

    /**
     * Update data pendaftar.
     */
    public function update(Request $request, PendaftarPpdb $pendaftarPpdb): JsonResponse
    {
        $validated = $request->validate([
            'nama_lengkap'          => 'sometimes|required|string|max:255',
            'jenis_kelamin'         => 'sometimes|required|in:L,P',
            'tempat_lahir'          => 'sometimes|required|string|max:255',
            'tanggal_lahir'         => 'sometimes|required|date',
            'nik'                   => 'nullable|string|max:255',
            'agama'                 => 'nullable|string|max:255',
            'alamat'                => 'sometimes|required|string',
            'rt'                    => 'nullable|string|max:255',
            'rw'                    => 'nullable|string|max:255',
            'kelurahan'             => 'nullable|string|max:255',
            'kecamatan'             => 'nullable|string|max:255',
            'kabupaten'             => 'nullable|string|max:255',
            'provinsi'              => 'nullable|string|max:255',
            'kode_pos'              => 'nullable|string|max:255',
            'nama_ayah'             => 'nullable|string|max:255',
            'nama_ibu'              => 'nullable|string|max:255',
            'nama_wali'             => 'nullable|string|max:255',
            'no_hp'                 => 'sometimes|required|string|max:255',
            'email'                 => 'nullable|email|max:255',
            'asal_tk'               => 'nullable|string|max:255',
            'foto'                  => 'nullable|string|max:255',
            'file_kk'               => 'nullable|string|max:255',
            'file_akta'             => 'nullable|string|max:255',
            'file_surat_pernyataan' => 'nullable|string|max:255',
            'catatan_admin'         => 'nullable|string',
            'status'                => 'nullable|in:menunggu,diterima,ditolak',
        ]);

        $pendaftarPpdb->update($validated);

        return response()->json($pendaftarPpdb);
    }

    /**
     * Hapus data pendaftar.
     */
    public function destroy(PendaftarPpdb $pendaftarPpdb): JsonResponse
    {
        $pendaftarPpdb->delete();

        return response()->json(['message' => 'Data pendaftar berhasil dihapus.']);
    }

    /**
     * Update status pendaftar (diterima / ditolak / menunggu).
     */
    public function updateStatus(Request $request, PendaftarPpdb $pendaftarPpdb): JsonResponse
    {
        $validated = $request->validate([
            'status'         => 'required|in:menunggu,diterima,ditolak',
            'catatan_admin'  => 'nullable|string',
        ]);

        $pendaftarPpdb->update($validated);

        return response()->json([
            'message'    => 'Status pendaftar berhasil diperbarui.',
            'pendaftar'  => $pendaftarPpdb,
        ]);
    }
}
