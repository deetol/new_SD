<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Mengizinkan Next.js frontend mengakses Laravel API menggunakan Bearer
    | token. Set CORS_ALLOWED_ORIGINS di .env untuk production, pisahkan
    | beberapa origin dengan koma.
    | Contoh: CORS_ALLOWED_ORIGINS=https://sekolah.id,https://www.sekolah.id
    |
    */

    'paths' => ['api/*'],

    'allowed_methods' => ['*'],

    'allowed_origins' => array_filter(
        array_map('trim', explode(',', env('CORS_ALLOWED_ORIGINS', 'http://localhost:3000,http://127.0.0.1:3000')))
    ),

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    // false karena kita pakai Bearer token, bukan cookie/session
    'supports_credentials' => false,

];
