<?php

use App\Models\Gallery;

// ── Slug generation ───────────────────────────────────────────────────────────

test('generateSlug menghasilkan slug dari judul', function () {
    $slug = Gallery::generateSlug('Lomba Seni Budaya');
    expect($slug)->toBe('lomba-seni-budaya');
});

test('generateSlug menambahkan suffix numerik jika slug sudah ada', function () {
    Gallery::create([
        'judul'            => 'Lomba Seni',
        'slug'             => 'lomba-seni',
        'kategori'         => 'Perayaan',
        'thumbnail'        => 'galleries/test.jpg',
        'tanggal_kegiatan' => now(),
    ]);

    $slug = Gallery::generateSlug('Lomba Seni');
    expect($slug)->toBe('lomba-seni-1');
});

test('generateSlug tidak menghasilkan duplikat meski ada slug serupa', function () {
    // Buat 'lomba' dan 'lomba-seni' — keduanya mengandung 'lomba'
    // Bug lama (LIKE-based) akan menghasilkan 'lomba-2' yang bisa bentrok
    Gallery::create([
        'judul'            => 'Lomba',
        'slug'             => 'lomba',
        'kategori'         => 'Perayaan',
        'thumbnail'        => 'galleries/a.jpg',
        'tanggal_kegiatan' => now(),
    ]);
    Gallery::create([
        'judul'            => 'Lomba Seni',
        'slug'             => 'lomba-seni',
        'kategori'         => 'Perayaan',
        'thumbnail'        => 'galleries/b.jpg',
        'tanggal_kegiatan' => now(),
    ]);

    // Menambah 'Lomba' lagi — harus menghasilkan 'lomba-1', bukan 'lomba-2'
    $slug = Gallery::generateSlug('Lomba');
    expect($slug)->toBe('lomba-1');
    expect(Gallery::where('slug', $slug)->exists())->toBeFalse();
});

test('generateSlug terus increment sampai menemukan slug unik', function () {
    foreach (['lomba', 'lomba-1', 'lomba-2'] as $s) {
        Gallery::create([
            'judul'            => $s,
            'slug'             => $s,
            'kategori'         => 'Perayaan',
            'thumbnail'        => "galleries/{$s}.jpg",
            'tanggal_kegiatan' => now(),
        ]);
    }

    $slug = Gallery::generateSlug('Lomba');
    expect($slug)->toBe('lomba-3');
});

// ── Gallery API ───────────────────────────────────────────────────────────────

test('GET /galleries mengembalikan data terpaginasi', function () {
    Gallery::create([
        'judul'            => 'Foto Kegiatan',
        'slug'             => 'foto-kegiatan',
        'kategori'         => 'Galeri Umum',
        'thumbnail'        => 'galleries/test.jpg',
        'tanggal_kegiatan' => now(),
    ]);

    $this->getJson('/api/galleries')
        ->assertOk()
        ->assertJsonStructure(['data', 'meta', 'links']);
});

test('GET /galleries dapat difilter berdasarkan kategori', function () {
    Gallery::create(['judul' => 'A', 'slug' => 'a', 'kategori' => 'Perayaan',      'thumbnail' => 'galleries/a.jpg', 'tanggal_kegiatan' => now()]);
    Gallery::create(['judul' => 'B', 'slug' => 'b', 'kategori' => 'Galeri Umum',   'thumbnail' => 'galleries/b.jpg', 'tanggal_kegiatan' => now()]);

    $res = $this->getJson('/api/galleries?kategori=Perayaan');
    $res->assertOk();
    $items = $res->json('data');
    expect(collect($items)->every(fn($i) => $i['kategori'] === 'Perayaan'))->toBeTrue();
});
