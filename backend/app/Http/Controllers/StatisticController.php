<?php

namespace App\Http\Controllers;

use App\Models\Teacher;
use App\Models\Gallery;
use Illuminate\Http\JsonResponse;

class StatisticController extends Controller
{
    public function index(): JsonResponse
    {
        $guruCount = Teacher::where('is_active', true)->count();

        // Hitung jumlah galeri per kategori secara dinamis
        $galeriCounts = Gallery::selectRaw('kategori, COUNT(*) as total')
            ->groupBy('kategori')
            ->pluck('total', 'kategori');

        return response()->json([
            'siswa_aktif'       => 150,
            'guru_ahli'         => max($guruCount, 20),
            'tahun_mengabdi'    => 30,
            'tingkat_kelulusan' => 95,
            'prestasi' => [
                'internasional' => Gallery::where('kategori', 'Penghargaan')
                    ->where('judul', 'like', '%Internasional%')->count(),
                'nasional'      => Gallery::where('kategori', 'Penghargaan')
                    ->where('judul', 'like', '%Nasional%')->count(),
                'provinsi'      => Gallery::where('kategori', 'Penghargaan')
                    ->where('judul', 'like', '%Provinsi%')->count(),
            ],
            'galeri' => [
                'ekstrakurikuler' => (int) ($galeriCounts['Ekstrakurikuler'] ?? 0),
                'galeri_umum'     => (int) ($galeriCounts['Galeri Umum']     ?? 0),
                'perayaan'        => (int) ($galeriCounts['Perayaan']        ?? 0),
                'penghargaan'     => (int) ($galeriCounts['Penghargaan']     ?? 0),
            ],
        ]);
    }
}
