<?php

use App\Models\User;
use Illuminate\Support\Facades\Hash;

beforeEach(function () {
    $this->user = User::factory()->create([
        'email'    => 'admin@test.com',
        'password' => Hash::make('password123'),
    ]);
});

// ── Login ─────────────────────────────────────────────────────────────────────

test('admin dapat login dengan kredensial yang benar', function () {
    $res = $this->postJson('/api/auth/login', [
        'email'    => 'admin@test.com',
        'password' => 'password123',
    ]);

    $res->assertOk()
        ->assertJsonStructure(['user', 'token'])
        ->assertJsonPath('user.email', 'admin@test.com');
});

test('login gagal dengan password salah', function () {
    $res = $this->postJson('/api/auth/login', [
        'email'    => 'admin@test.com',
        'password' => 'salah',
    ]);

    $res->assertUnprocessable()
        ->assertJsonValidationErrors(['email']);
});

test('login gagal dengan email tidak terdaftar', function () {
    $res = $this->postJson('/api/auth/login', [
        'email'    => 'tidakada@test.com',
        'password' => 'password123',
    ]);

    $res->assertUnprocessable();
});

test('login memerlukan email dan password', function () {
    $this->postJson('/api/auth/login', [])
        ->assertUnprocessable()
        ->assertJsonValidationErrors(['email', 'password']);
});

// ── Me ────────────────────────────────────────────────────────────────────────

test('GET /auth/me mengembalikan user yang sedang login', function () {
    $token = $this->user->createToken('test')->plainTextToken;

    $this->getJson('/api/auth/me', ['Authorization' => "Bearer {$token}"])
        ->assertOk()
        ->assertJsonPath('email', 'admin@test.com');
});

test('GET /auth/me ditolak tanpa token', function () {
    $this->getJson('/api/auth/me')
        ->assertUnauthorized();
});

// ── Logout ────────────────────────────────────────────────────────────────────

test('logout menghapus token', function () {
    $token = $this->user->createToken('test')->plainTextToken;

    $this->postJson('/api/auth/logout', [], ['Authorization' => "Bearer {$token}"])
        ->assertOk();

    // Verifikasi token dihapus dari database
    expect(\Laravel\Sanctum\PersonalAccessToken::count())->toBe(0);
});
