<?php

namespace Database\Seeders;

use App\Models\Ppdb;
use Illuminate\Database\Seeder;

class PpdbSeeder extends Seeder
{
    public function run(): void
    {
        Ppdb::firstOrCreate(
            ['tahun_ajaran' => 2026],
            [
                'judul'       => 'Penerimaan Peserta Didik Baru (PPDB) Tahun Ajaran 2026/2027',
                'tahun_ajaran' => 2026,
                'is_active'   => true,
                'tanggal_buka'  => '2026-06-01',
                'tanggal_tutup' => '2026-07-05',
                'kuota'       => 60,

                'deskripsi' => 'SD Negeri Selok Awar-Awar 05 membuka pendaftaran Penerimaan Peserta Didik Baru (PPDB) Tahun Ajaran 2026/2027. Kami mengundang putra-putri terbaik di wilayah Kecamatan Pasirian dan sekitarnya untuk bergabung bersama kami dalam menciptakan generasi yang beriman, cerdas, terampil, dan berwawasan lingkungan.',

                'persyaratan' => implode("\n", [
                    '1. Berusia minimal 6 tahun per 1 Juli 2026 (diutamakan usia 7 tahun).',
                    '2. Berusia maksimal 12 tahun per 1 Juli 2026.',
                    '3. Belum pernah terdaftar sebagai peserta didik di sekolah dasar manapun.',
                    '4. Melampirkan fotokopi Akta Kelahiran (1 lembar).',
                    '5. Melampirkan fotokopi Kartu Keluarga (1 lembar).',
                    '6. Melampirkan fotokopi KTP orang tua/wali (1 lembar).',
                    '7. Melampirkan pas foto berwarna ukuran 3×4 sebanyak 2 lembar.',
                    '8. Melampirkan Surat Keterangan Sehat dari dokter atau puskesmas.',
                    '9. Melampirkan Surat Pernyataan Orang Tua/Wali bermaterai Rp10.000.',
                    '10. Domisili diutamakan dalam wilayah Desa Selok Awar-Awar dan sekitarnya.',
                ]),

                'alur_langkah' => [
                    [
                        'judul'     => 'Ambil Formulir',
                        'deskripsi' => 'Ambil formulir pendaftaran secara langsung di kantor sekolah atau unduh melalui website ini. Formulir tersedia mulai 1 Juni 2026.',
                    ],
                    [
                        'judul'     => 'Isi & Lengkapi Berkas',
                        'deskripsi' => 'Isi formulir dengan data yang benar dan lengkap. Siapkan seluruh dokumen persyaratan yang telah ditentukan.',
                    ],
                    [
                        'judul'     => 'Daftar Online atau Langsung',
                        'deskripsi' => 'Kirimkan formulir melalui website ini atau serahkan langsung ke kantor sekolah pada jam kerja (Senin–Jumat, 08.00–13.00 WIB).',
                    ],
                    [
                        'judul'     => 'Verifikasi Berkas',
                        'deskripsi' => 'Panitia PPDB akan memverifikasi kelengkapan dan keabsahan berkas pendaftaran. Proses ini berlangsung 1–3 hari kerja.',
                    ],
                    [
                        'judul'     => 'Pengumuman Hasil',
                        'deskripsi' => 'Hasil seleksi diumumkan melalui website sekolah dan papan pengumuman. Peserta yang diterima wajib melakukan daftar ulang.',
                    ],
                    [
                        'judul'     => 'Daftar Ulang',
                        'deskripsi' => 'Peserta yang dinyatakan diterima wajib melakukan daftar ulang pada tanggal yang telah ditentukan dengan membawa berkas asli.',
                    ],
                ],

                'jadwal_kegiatan' => [
                    [
                        'no'       => 1,
                        'kegiatan' => 'Pembukaan Pendaftaran',
                        'tanggal'  => '1 Juni 2026',
                        'jam'      => '08.00 WIB',
                        'tempat'   => 'Website & Kantor Sekolah',
                    ],
                    [
                        'no'       => 2,
                        'kegiatan' => 'Batas Akhir Pendaftaran',
                        'tanggal'  => '5 Juli 2026',
                        'jam'      => '13.00 WIB',
                        'tempat'   => 'Website & Kantor Sekolah',
                    ],
                    [
                        'no'       => 3,
                        'kegiatan' => 'Verifikasi Berkas',
                        'tanggal'  => '7–9 Juli 2026',
                        'jam'      => '08.00–13.00 WIB',
                        'tempat'   => 'Ruang Panitia PPDB',
                    ],
                    [
                        'no'       => 4,
                        'kegiatan' => 'Pengumuman Hasil Seleksi',
                        'tanggal'  => '11 Juli 2026',
                        'jam'      => '10.00 WIB',
                        'tempat'   => 'Website & Papan Pengumuman',
                    ],
                    [
                        'no'       => 5,
                        'kegiatan' => 'Daftar Ulang Peserta Diterima',
                        'tanggal'  => '14–16 Juli 2026',
                        'jam'      => '08.00–12.00 WIB',
                        'tempat'   => 'Kantor Sekolah',
                    ],
                    [
                        'no'       => 6,
                        'kegiatan' => 'Hari Pertama Masuk Sekolah',
                        'tanggal'  => '14 Juli 2026',
                        'jam'      => '07.00 WIB',
                        'tempat'   => 'SD Negeri Selok Awar-Awar 05',
                    ],
                ],
            ]
        );
    }
}
