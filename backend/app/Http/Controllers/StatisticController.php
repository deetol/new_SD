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
        $baseGuru = 20;

        $prestasiInternasional = Gallery::where('kategori', 'Penghargaan')->where('judul', 'like', '%Internasional%')->count();
        $prestasiNasional = Gallery::where('kategori', 'Penghargaan')->where('judul', 'like', '%Nasional%')->count();
        $prestasiProvinsi = Gallery::where('kategori', 'Penghargaan')->where('judul', 'like', '%Provinsi%')->count();

        return response()->json([
            'siswa_aktif' => 150,
            'guru_ahli' => max($guruCount, $baseGuru),
            'tahun_mengabdi' => 30,
            'tingkat_kelulusan' => 95,
            'prestasi' => [
                'internasional' => max($prestasiInternasional, 2),
                'nasional' => max($prestasiNasional, 5),
                'provinsi' => max($prestasiProvinsi, 12),
            ]
        ]);
    }
}
