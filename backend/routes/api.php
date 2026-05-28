<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\ProfilSekolahController;
use App\Http\Controllers\PpdbController;
use App\Http\Controllers\PendaftarPpdbController;
use App\Http\Controllers\GalleryController;

/*
|--------------------------------------------------------------------------
| Auth Routes (public)
|--------------------------------------------------------------------------
*/
Route::prefix('auth')->group(function () {
    Route::post('login',  [AuthController::class, 'login']);

    // logout & me butuh token
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('logout', [AuthController::class, 'logout']);
        Route::get('me',      [AuthController::class, 'me']);
    });
});

/*
|--------------------------------------------------------------------------
| Public Routes — bisa diakses tanpa token
|--------------------------------------------------------------------------
*/
Route::get('teachers',          [TeacherController::class, 'index']);
Route::get('teachers/{teacher}', [TeacherController::class, 'show']);

Route::get('profil-sekolah',                      [ProfilSekolahController::class, 'index']);
Route::get('profil-sekolah/{profil_sekolah}',     [ProfilSekolahController::class, 'show']);

Route::get('ppdb/aktif',    [PpdbController::class, 'aktif']);
Route::get('ppdb',          [PpdbController::class, 'index']);
Route::get('ppdb/{ppdb}',   [PpdbController::class, 'show']);

Route::get('galleries',             [GalleryController::class, 'index']);
Route::get('galleries/{gallery}',   [GalleryController::class, 'show']);

// Pendaftar PPDB — store boleh publik (form pendaftaran)
Route::post('pendaftar-ppdb', [PendaftarPpdbController::class, 'store']);

/*
|--------------------------------------------------------------------------
| Protected Routes — butuh Bearer token (admin only)
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function () {

    // Teachers — CUD
    Route::post('teachers',              [TeacherController::class, 'store']);
    Route::post('teachers/{teacher}',    [TeacherController::class, 'update']);   // POST + _method=PUT
    Route::put('teachers/{teacher}',     [TeacherController::class, 'update']);
    Route::patch('teachers/{teacher}',   [TeacherController::class, 'update']);
    Route::delete('teachers/{teacher}',  [TeacherController::class, 'destroy']);

    // Profil Sekolah — CUD
    Route::post('profil-sekolah',                  [ProfilSekolahController::class, 'store']);
    Route::post('profil-sekolah/{profil_sekolah}', [ProfilSekolahController::class, 'update']);
    Route::put('profil-sekolah/{profil_sekolah}',  [ProfilSekolahController::class, 'update']);
    Route::delete('profil-sekolah/{profil_sekolah}', [ProfilSekolahController::class, 'destroy']);

    // PPDB — CUD
    Route::post('ppdb',          [PpdbController::class, 'store']);
    Route::put('ppdb/{ppdb}',    [PpdbController::class, 'update']);
    Route::patch('ppdb/{ppdb}',  [PpdbController::class, 'update']);
    Route::delete('ppdb/{ppdb}', [PpdbController::class, 'destroy']);

    // Pendaftar PPDB — admin actions
    Route::get('pendaftar-ppdb',                              [PendaftarPpdbController::class, 'index']);
    Route::get('pendaftar-ppdb/{pendaftar_ppdb}',             [PendaftarPpdbController::class, 'show']);
    Route::put('pendaftar-ppdb/{pendaftar_ppdb}',             [PendaftarPpdbController::class, 'update']);
    Route::delete('pendaftar-ppdb/{pendaftar_ppdb}',          [PendaftarPpdbController::class, 'destroy']);
    Route::patch('pendaftar-ppdb/{pendaftar_ppdb}/status',    [PendaftarPpdbController::class, 'updateStatus']);

    // Galleries — CUD
    Route::post('galleries',             [GalleryController::class, 'store']);
    Route::post('galleries/{gallery}',   [GalleryController::class, 'update']);
    Route::put('galleries/{gallery}',    [GalleryController::class, 'update']);
    Route::delete('galleries/{gallery}', [GalleryController::class, 'destroy']);
});
