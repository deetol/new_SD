<?php

namespace App\Http\Traits;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

trait HandlesImageUpload
{
    /**
     * Upload gambar ke storage/app/public/{folder}
     * Kembalikan path relatif yang disimpan ke database.
     *
     * @param  UploadedFile  $file
     * @param  string        $folder  contoh: 'teachers', 'galleries'
     * @return string                 contoh: 'teachers/abc123.jpg'
     */
    protected function uploadImage(UploadedFile $file, string $folder): string
    {
        // Generate secure random filename to prevent path traversal
        $extension = $file->getClientOriginalExtension();
        $filename = bin2hex(random_bytes(16)) . '.' . $extension;
        
        // Store with custom filename
        return $file->storeAs($folder, $filename, 'public');
    }

    /**
     * Hapus file lama dari storage jika ada.
     *
     * @param  string|null  $path  path relatif yang tersimpan di DB
     */
    protected function deleteImage(?string $path): void
    {
        if ($path && Storage::disk('public')->exists($path)) {
            Storage::disk('public')->delete($path);
        }
    }

    /**
     * Bangun URL publik dari path relatif.
     *
     * @param  string|null  $path
     * @return string|null
     */
    protected function imageUrl(?string $path): ?string
    {
        if (!$path) {
            return null;
        }

        return Storage::disk('public')->url($path);
    }
}
