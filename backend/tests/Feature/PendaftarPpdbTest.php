<?php

use App\Models\Ppdb;
use App\Models\PendaftarPpdb;
use App\Models\User;
use App\Mail\PendaftarPpdbMail;
use Illuminate\Support\Facades\Mail;

// ── Helpers ───────────────────────────────────────────────────────────────────

function makePpdb(array $overrides = []): Ppdb
{
    return Ppdb::create(array_merge([
        'judul'         => 'PPDB 2026',
        'tahun_ajaran'  => 2026,
        'tanggal_buka'  => now()->subDay(),
        'tanggal_tutup' => now()->addMonth(),
        'is_active'     => true,
    ], $overrides));
}

function validPayload(int $ppdbId, array $overrides = []): array
{
    return array_merge([
        'ppdb_id'       => $ppdbId,
        'nama_lengkap'  => 'Budi Santoso',
        'jenis_kelamin' => 'L',
        'tempat_lahir'  => 'Lumajang',
        'tanggal_lahir' => '2019-05-10',
        'alamat'        => 'Jl. Raya No. 1',
        'no_hp'         => '081234567890',
    ], $overrides);
}

// ── Store (publik) ────────────────────────────────────────────────────────────

test('pendaftar baru dapat mendaftar PPDB', function () {
    $ppdb = makePpdb();

    $res = $this->postJson('/api/pendaftar-ppdb', validPayload($ppdb->id));

    $res->assertCreated()
        ->assertJsonStructure(['nomor_pendaftaran', 'status'])
        ->assertJsonPath('status', 'menunggu');

    expect(PendaftarPpdb::count())->toBe(1);
});

test('nomor pendaftaran mengikuti format PPDB-YYYY-XXXXX', function () {
    $ppdb = makePpdb(['tahun_ajaran' => 2026]);

    $res = $this->postJson('/api/pendaftar-ppdb', validPayload($ppdb->id));

    $res->assertCreated();
    expect($res->json('nomor_pendaftaran'))->toMatch('/^PPDB-2026-[A-Z0-9]{5}$/');
});

test('email konfirmasi dikirim jika pendaftar menyertakan email', function () {
    Mail::fake();
    $ppdb = makePpdb();

    $this->postJson('/api/pendaftar-ppdb', validPayload($ppdb->id, [
        'email' => 'orang_tua@test.com',
    ]))->assertCreated();

    Mail::assertQueued(PendaftarPpdbMail::class, function ($mail) {
        return $mail->hasTo('orang_tua@test.com');
    });
});

test('email konfirmasi tidak dikirim jika tidak ada email', function () {
    Mail::fake();
    $ppdb = makePpdb();

    $this->postJson('/api/pendaftar-ppdb', validPayload($ppdb->id))
        ->assertCreated();

    Mail::assertNothingQueued();
});

test('pendaftaran gagal jika ppdb_id tidak valid', function () {
    $this->postJson('/api/pendaftar-ppdb', validPayload(9999))
        ->assertUnprocessable()
        ->assertJsonValidationErrors(['ppdb_id']);
});

test('pendaftaran gagal jika field wajib kosong', function () {
    $ppdb = makePpdb();

    $this->postJson('/api/pendaftar-ppdb', ['ppdb_id' => $ppdb->id])
        ->assertUnprocessable()
        ->assertJsonValidationErrors(['nama_lengkap', 'jenis_kelamin', 'tempat_lahir', 'tanggal_lahir', 'alamat', 'no_hp']);
});

// ── Cek status (publik) ───────────────────────────────────────────────────────

test('publik dapat cek status pendaftaran via nomor', function () {
    $ppdb      = makePpdb();
    $pendaftar = PendaftarPpdb::create(array_merge(validPayload($ppdb->id), [
        'nomor_pendaftaran' => 'PPDB-2026-ABCDE',
        'status'            => 'menunggu',
        'submitted_at'      => now(),
    ]));

    $this->getJson('/api/pendaftar-ppdb/cek?nomor=PPDB-2026-ABCDE')
        ->assertOk()
        ->assertJsonPath('nomor_pendaftaran', 'PPDB-2026-ABCDE')
        ->assertJsonPath('status', 'menunggu');
});

test('cek status mengembalikan 404 untuk nomor tidak dikenal', function () {
    $this->getJson('/api/pendaftar-ppdb/cek?nomor=PPDB-0000-XXXXX')
        ->assertNotFound();
});

// ── Admin endpoints (protected) ───────────────────────────────────────────────

test('admin dapat melihat semua pendaftar', function () {
    $ppdb = makePpdb();
    PendaftarPpdb::create(array_merge(validPayload($ppdb->id), [
        'nomor_pendaftaran' => 'PPDB-2026-TEST1',
        'status'            => 'menunggu',
        'submitted_at'      => now(),
    ]));

    $admin = User::factory()->create();
    $token = $admin->createToken('test')->plainTextToken;

    $this->getJson('/api/pendaftar-ppdb', ['Authorization' => "Bearer {$token}"])
        ->assertOk()
        ->assertJsonStructure(['data', 'total', 'current_page']);
});

test('non-admin tidak dapat melihat daftar pendaftar', function () {
    $this->getJson('/api/pendaftar-ppdb')
        ->assertUnauthorized();
});

test('admin dapat update status pendaftar', function () {
    $ppdb      = makePpdb();
    $pendaftar = PendaftarPpdb::create(array_merge(validPayload($ppdb->id), [
        'nomor_pendaftaran' => 'PPDB-2026-TEST2',
        'status'            => 'menunggu',
        'submitted_at'      => now(),
    ]));

    $admin = User::factory()->create();
    $token = $admin->createToken('test')->plainTextToken;

    $this->patchJson(
        "/api/pendaftar-ppdb/{$pendaftar->id}/status",
        ['status' => 'diterima', 'catatan_admin' => 'Selamat!'],
        ['Authorization' => "Bearer {$token}"]
    )->assertOk()->assertJsonPath('pendaftar.status', 'diterima');

    expect($pendaftar->fresh()->status)->toBe('diterima');
});
