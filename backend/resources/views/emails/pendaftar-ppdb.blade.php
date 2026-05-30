<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Konfirmasi Pendaftaran PPDB</title>
  <style>
    body { font-family: Arial, sans-serif; background: #f1f5f9; margin: 0; padding: 0; color: #1e293b; }
    .wrapper { max-width: 600px; margin: 32px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,.08); }
    .header { background: #1d4ed8; padding: 32px 40px; text-align: center; }
    .header h1 { color: #ffffff; margin: 0; font-size: 22px; }
    .header p { color: #bfdbfe; margin: 6px 0 0; font-size: 14px; }
    .body { padding: 32px 40px; }
    .nomor-box { background: #eff6ff; border: 2px solid #bfdbfe; border-radius: 10px; padding: 20px; text-align: center; margin: 24px 0; }
    .nomor-box .label { font-size: 11px; text-transform: uppercase; letter-spacing: .08em; color: #64748b; margin-bottom: 6px; }
    .nomor-box .nomor { font-size: 28px; font-weight: 900; color: #1d4ed8; font-family: monospace; letter-spacing: .1em; }
    .info-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    .info-table td { padding: 8px 0; font-size: 14px; border-bottom: 1px solid #f1f5f9; }
    .info-table td:first-child { color: #64748b; width: 45%; }
    .info-table td:last-child { font-weight: 600; }
    .status-badge { display: inline-block; background: #fef3c7; color: #92400e; border-radius: 20px; padding: 3px 12px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: .05em; }
    .cta { text-align: center; margin: 28px 0; }
    .cta a { background: #1d4ed8; color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-weight: 700; font-size: 14px; display: inline-block; }
    .notice { background: #fffbeb; border: 1px solid #fde68a; border-radius: 8px; padding: 14px 18px; font-size: 13px; color: #92400e; margin-top: 24px; }
    .footer { background: #f8fafc; padding: 20px 40px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>Pendaftaran PPDB Diterima</h1>
      <p>SD Negeri Selok Awar-Awar 05</p>
    </div>

    <div class="body">
      <p>Yth. <strong>{{ $pendaftar->nama_lengkap }}</strong>,</p>
      <p>Terima kasih telah mendaftar PPDB
        @if($pendaftar->ppdb)
          <strong>{{ $pendaftar->ppdb->judul }}</strong>
          Tahun Ajaran <strong>{{ $pendaftar->ppdb->tahun_ajaran }}</strong>.
        @endif
        Pendaftaran Anda telah kami terima dan sedang dalam proses verifikasi.
      </p>

      <div class="nomor-box">
        <div class="label">Nomor Pendaftaran Anda</div>
        <div class="nomor">{{ $pendaftar->nomor_pendaftaran }}</div>
      </div>

      <table class="info-table">
        <tr>
          <td>Nama Lengkap</td>
          <td>{{ $pendaftar->nama_lengkap }}</td>
        </tr>
        <tr>
          <td>Jenis Kelamin</td>
          <td>{{ $pendaftar->jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan' }}</td>
        </tr>
        <tr>
          <td>Tanggal Daftar</td>
          <td>{{ $pendaftar->submitted_at?->translatedFormat('d F Y, H:i') ?? '-' }}</td>
        </tr>
        <tr>
          <td>Status</td>
          <td><span class="status-badge">{{ ucfirst($pendaftar->status) }}</span></td>
        </tr>
      </table>

      <div class="cta">
        <a href="{{ env('FRONTEND_URL', 'http://localhost:3000') }}/ppdb/cek?nomor={{ urlencode($pendaftar->nomor_pendaftaran) }}">
          Cek Status Pendaftaran
        </a>
      </div>

      <div class="notice">
        <strong>Penting:</strong> Simpan nomor pendaftaran di atas. Nomor ini digunakan untuk
        mengecek status penerimaan Anda kapan saja melalui website sekolah.
      </div>
    </div>

    <div class="footer">
      Email ini dikirim otomatis oleh sistem PPDB SD Negeri Selok Awar-Awar 05.<br />
      Jangan membalas email ini.
    </div>
  </div>
</body>
</html>
