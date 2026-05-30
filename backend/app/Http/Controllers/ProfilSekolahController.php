<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProfilSekolahResource;
use App\Http\Traits\HandlesImageUpload;
use App\Models\ProfilSekolah;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ProfilSekolahController extends Controller
{
    use HandlesImageUpload;

    /**
     * Validasi rules yang dipakai oleh store dan update.
     */
    private function rules(bool $isUpdate = false): array
    {
        $req = $isUpdate ? 'sometimes|required' : 'required';

        return [
            'nama_sekolah'        => "{$req}|string|max:255",
            'npsn'                => 'nullable|string|max:20',
            'alamat'              => "{$req}|string|max:255",
            'kelurahan'           => 'nullable|string|max:255',
            'kecamatan'           => 'nullable|string|max:255',
            'kabupaten'           => 'nullable|string|max:255',
            'provinsi'            => 'nullable|string|max:255',
            'kode_pos'            => 'nullable|string|max:10',
            'no_telepon'          => 'nullable|string|max:20',
            'email'               => 'nullable|email|max:255',
            'sejarah'             => 'nullable|string',
            'visi'                => 'nullable|string',
            'misi'                => 'nullable|string',
            'pengantar'           => 'nullable|string',
            'visi_misi_pengantar' => 'nullable|string',
            'penghargaan'         => 'nullable|array',
            'timeline'            => 'nullable|array',
            'kepala_sekolah'      => 'nullable|string|max:255',
            // Logo dikirim sebagai file upload
            'logo'                => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ];
    }

    /**
     * GET /api/profil-sekolah
     * Tampilkan profil sekolah (selalu 1 record).
     */
    public function index(): JsonResponse
    {
        $profil = ProfilSekolah::first();

        if (!$profil) {
            return response()->json(['message' => 'Profil sekolah belum diisi.'], 404);
        }

        return (new ProfilSekolahResource($profil))->response();
    }

    /**
     * POST /api/profil-sekolah
     * Buat profil sekolah. Jika sudah ada, update record yang ada
     * (enforce single-record pattern — tidak boleh ada duplikat).
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate($this->rules());

        if ($request->hasFile('logo')) {
            $validated['logo'] = $this->uploadImage($request->file('logo'), 'profil');
        } else {
            unset($validated['logo']);
        }

        // updateOrCreate dengan array kosong sebagai key — selalu update record pertama
        $profil = ProfilSekolah::updateOrCreate([], $validated);

        $status = $profil->wasRecentlyCreated ? 201 : 200;

        return (new ProfilSekolahResource($profil))
            ->response()
            ->setStatusCode($status);
    }

    /**
     * GET /api/profil-sekolah/{profil_sekolah}
     * Tampilkan profil sekolah berdasarkan ID.
     */
    public function show(ProfilSekolah $profilSekolah): JsonResponse
    {
        return (new ProfilSekolahResource($profilSekolah))->response();
    }

    /**
     * PUT /api/profil-sekolah/{profil_sekolah}
     * Update profil sekolah. Kirim sebagai POST + _method=PUT untuk
     * multipart/form-data (upload logo).
     */
    public function update(Request $request, ProfilSekolah $profilSekolah): JsonResponse
    {
        $validated = $request->validate($this->rules(isUpdate: true));

        if ($request->hasFile('logo')) {
            // Hapus logo lama sebelum upload yang baru
            $this->deleteImage($profilSekolah->logo);
            $validated['logo'] = $this->uploadImage($request->file('logo'), 'profil');
        } else {
            unset($validated['logo']);
        }

        $profilSekolah->update($validated);

        return (new ProfilSekolahResource($profilSekolah))->response();
    }

    /**
     * DELETE /api/profil-sekolah/{profil_sekolah}
     */
    public function destroy(ProfilSekolah $profilSekolah): JsonResponse
    {
        $this->deleteImage($profilSekolah->logo);
        $profilSekolah->delete();

        return response()->json(['message' => 'Profil sekolah berhasil dihapus.']);
    }
}
