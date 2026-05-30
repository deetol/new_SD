<?php

namespace App\Console\Commands;

use App\Models\Gallery;
use App\Models\PendaftarPpdb;
use App\Models\Teacher;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

class CleanOrphanedFiles extends Command
{
    protected $signature   = 'storage:clean-orphans {--dry-run : Tampilkan file yang akan dihapus tanpa benar-benar menghapus}';
    protected $description = 'Hapus file di storage/app/public yang tidak direferensikan oleh database';

    public function handle(): int
    {
        $isDryRun = $this->option('dry-run');

        if ($isDryRun) {
            $this->info('Mode DRY RUN — tidak ada file yang dihapus.');
        }

        $deleted = 0;
        $freed   = 0;

        // ── Kumpulkan semua path yang masih dipakai di DB ─────────────────────

        $usedPaths = collect();

        // Gallery thumbnails + foto tambahan
        Gallery::select('thumbnail', 'foto_tambahan')->get()->each(function ($g) use (&$usedPaths) {
            if ($g->thumbnail) $usedPaths->push($g->thumbnail);
            foreach ($g->foto_tambahan ?? [] as $path) {
                $usedPaths->push($path);
            }
        });

        // Teacher photos
        Teacher::select('foto')->whereNotNull('foto')->pluck('foto')
            ->each(fn($p) => $usedPaths->push($p));

        // PPDB berkas
        PendaftarPpdb::select('foto', 'file_kk', 'file_akta', 'file_surat_pernyataan')->get()
            ->each(function ($p) use (&$usedPaths) {
                foreach (['foto', 'file_kk', 'file_akta', 'file_surat_pernyataan'] as $field) {
                    if ($p->$field) $usedPaths->push($p->$field);
                }
            });

        $usedPaths = $usedPaths->filter()->unique()->values();

        // ── Scan semua file di disk ───────────────────────────────────────────

        $folders = ['galleries', 'teachers', 'ppdb-berkas', 'profil'];

        foreach ($folders as $folder) {
            if (!Storage::disk('public')->exists($folder)) continue;

            $files = Storage::disk('public')->files($folder);

            foreach ($files as $filePath) {
                if ($usedPaths->contains($filePath)) continue;

                $size = Storage::disk('public')->size($filePath);

                if ($isDryRun) {
                    $this->line(sprintf(
                        '  <comment>AKAN DIHAPUS</comment>  %s  (%s KB)',
                        $filePath,
                        number_format($size / 1024, 1)
                    ));
                } else {
                    Storage::disk('public')->delete($filePath);
                    $this->line(sprintf(
                        '  <info>DIHAPUS</info>  %s  (%s KB)',
                        $filePath,
                        number_format($size / 1024, 1)
                    ));
                }

                $deleted++;
                $freed += $size;
            }
        }

        // ── Ringkasan ─────────────────────────────────────────────────────────

        $this->newLine();
        if ($deleted === 0) {
            $this->info('Tidak ada file orphan ditemukan. Storage sudah bersih.');
        } else {
            $action = $isDryRun ? 'akan dihapus' : 'dihapus';
            $this->info(sprintf(
                '%d file %s, membebaskan %s KB.',
                $deleted,
                $action,
                number_format($freed / 1024, 1)
            ));

            if ($isDryRun) {
                $this->newLine();
                $this->comment('Jalankan tanpa --dry-run untuk benar-benar menghapus file tersebut.');
            }
        }

        return self::SUCCESS;
    }
}
