<?php

namespace Database\Seeders;

use App\Models\ProfilSekolah;
use Illuminate\Database\Seeder;

class ProfilSekolahSeeder extends Seeder
{
    public function run(): void
    {
        ProfilSekolah::updateOrCreate(
            ['id' => 1],
            [
                'nama_sekolah'       => 'SD Negeri Selok Awar-Awar 05',
                'npsn'               => '20520123',
                'alamat'             => 'Jl. Raya Selok Awar-Awar No. 05',
                'kelurahan'          => 'Selok Awar-Awar',
                'kecamatan'          => 'Pasirian',
                'kabupaten'          => 'Lumajang',
                'provinsi'           => 'Jawa Timur',
                'kode_pos'           => '67371',
                'no_telepon'         => '0334-123456',
                'email'              => 'sdn.selokawarawar05@gmail.com',
                'kepala_sekolah'     => 'Nama Kepala Sekolah',

                'sejarah' => "SD Negeri Selok Awar-Awar 05 didirikan pada tahun 1985 dengan semangat untuk memberikan akses pendidikan berkualitas bagi masyarakat sekitar. Berawal dari gedung sederhana dengan tiga ruang kelas, sekolah ini terus bertransformasi seiring berjalannya waktu.\n\nHingga kini, kami telah meluluskan ribuan alumni yang berkontribusi dalam berbagai bidang di tingkat lokal maupun nasional. Komitmen kami tetap sama: mengedepankan integritas, kreativitas, dan karakter dalam setiap proses pembelajaran.",

                'visi' => 'Terwujudnya generasi yang beriman, cerdas, terampil, dan berwawasan lingkungan.',

                'misi' => implode("\n", [
                    'Menanamkan nilai-nilai keagamaan dan moral dalam setiap aspek kegiatan pembelajaran harian.',
                    'Mengembangkan potensi akademik siswa melalui metode pembelajaran yang inovatif dan partisipatif.',
                    'Membekali siswa dengan keterampilan hidup dan kreativitas untuk menghadapi tantangan masa depan.',
                    'Membudayakan sikap peduli lingkungan melalui program Adiwiyata dan pengelolaan sekolah hijau.',
                    'Menumbuhkan jiwa sosial, kerjasama, dan toleransi antar warga sekolah serta masyarakat luas.',
                    'Mengintegrasikan teknologi informasi dalam tata kelola dan proses pembelajaran sekolah.',
                ]),

                'visi_misi_pengantar' => 'Dalam mencapai tujuan pendidikan yang berkualitas',

                'pengantar' => 'Selamat datang di SD Negeri Selok Awar-Awar 05. Kami berkomitmen untuk memberikan pendidikan terbaik bagi putra-putri Anda dalam lingkungan yang kondusif, aman, dan menyenangkan. Bersama-sama, kita wujudkan generasi penerus bangsa yang beriman, cerdas, dan berkarakter.',
            ]
        );
    }
}
