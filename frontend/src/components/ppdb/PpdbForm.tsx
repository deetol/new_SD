"use client";

import { useState, type FormEvent } from "react";

interface Props {
  ppdbId: number;
  tahunAjaran: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";

const inputCls =
  "w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary transition-shadow";

const selectCls = inputCls;

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  );
}

function SectionTitle({ icon, title }: { icon: string; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-6 pb-3 border-b border-slate-200 dark:border-slate-800">
      <div className="size-9 rounded-xl bg-primary/10 flex items-center justify-center">
        <span className="material-symbols-outlined text-primary text-[20px]">{icon}</span>
      </div>
      <h3 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h3>
    </div>
  );
}

export default function PpdbForm({ ppdbId, tahunAjaran }: Props) {
  // Data diri
  const [namaLengkap, setNamaLengkap]     = useState("");
  const [jenisKelamin, setJenisKelamin]   = useState<"L" | "P">("L");
  const [tempatLahir, setTempatLahir]     = useState("");
  const [tanggalLahir, setTanggalLahir]   = useState("");
  const [nik, setNik]                     = useState("");
  const [agama, setAgama]                 = useState("");
  const [asalTk, setAsalTk]               = useState("");

  // Alamat
  const [alamat, setAlamat]               = useState("");
  const [rt, setRt]                       = useState("");
  const [rw, setRw]                       = useState("");
  const [kelurahan, setKelurahan]         = useState("");
  const [kecamatan, setKecamatan]         = useState("");
  const [kabupaten, setKabupaten]         = useState("");
  const [provinsi, setProvinsi]           = useState("");
  const [kodePos, setKodePos]             = useState("");

  // Orang tua
  const [namaAyah, setNamaAyah]           = useState("");
  const [namaIbu, setNamaIbu]             = useState("");
  const [namaWali, setNamaWali]           = useState("");
  const [noHp, setNoHp]                   = useState("");
  const [email, setEmail]                 = useState("");

  // UI
  const [submitting, setSubmitting]       = useState(false);
  const [error, setError]                 = useState<string | null>(null);
  const [success, setSuccess]             = useState<{ nomor: string } | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch(`${API_URL}/pendaftar-ppdb`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ppdb_id:        ppdbId,
          nama_lengkap:   namaLengkap,
          jenis_kelamin:  jenisKelamin,
          tempat_lahir:   tempatLahir,
          tanggal_lahir:  tanggalLahir,
          nik:            nik || null,
          agama:          agama || null,
          asal_tk:        asalTk || null,
          alamat,
          rt:             rt || null,
          rw:             rw || null,
          kelurahan:      kelurahan || null,
          kecamatan:      kecamatan || null,
          kabupaten:      kabupaten || null,
          provinsi:       provinsi || null,
          kode_pos:       kodePos || null,
          nama_ayah:      namaAyah || null,
          nama_ibu:       namaIbu || null,
          nama_wali:      namaWali || null,
          no_hp:          noHp,
          email:          email || null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        const msg =
          data?.message ??
          Object.values(data?.errors ?? {}).flat().join(", ") ??
          "Pendaftaran gagal.";
        throw new Error(String(msg));
      }

      setSuccess({ nomor: data.nomor_pendaftaran });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan.");
    } finally {
      setSubmitting(false);
    }
  }

  // ── Sukses ──
  if (success) {
    return (
      <section className="py-20 bg-white dark:bg-background-dark">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="size-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-4xl">check_circle</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-3">
            Pendaftaran Berhasil!
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-6">
            Terima kasih telah mendaftar. Simpan nomor pendaftaran Anda — nomor ini digunakan untuk mengecek status pendaftaran.
          </p>

          {/* Nomor pendaftaran */}
          <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 mb-6">
            <p className="text-xs uppercase tracking-widest text-slate-400 mb-2">Nomor Pendaftaran Anda</p>
            <p className="text-3xl font-black text-primary tracking-wider font-mono mb-3">{success.nomor}</p>
            <button
              onClick={() => navigator.clipboard.writeText(success.nomor)}
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-[14px]">content_copy</span>
              Salin nomor
            </button>
          </div>

          {/* Info */}
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl px-5 py-4 text-sm text-amber-700 dark:text-amber-400 text-left mb-6 flex items-start gap-3">
            <span className="material-symbols-outlined text-[18px] shrink-0 mt-0.5">info</span>
            <p>
              Simpan nomor pendaftaran di atas. Gunakan nomor ini untuk mengecek status pendaftaran kapan saja melalui halaman <strong>Cek Status</strong>.
            </p>
          </div>

          {/* Tombol cek status */}
          <a
            href={`/ppdb/cek?nomor=${encodeURIComponent(success.nomor)}`}
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold px-8 py-3 rounded-xl transition-colors shadow-lg shadow-primary/20"
          >
            <span className="material-symbols-outlined text-[20px]">manage_search</span>
            Cek Status Pendaftaran
          </a>
        </div>
      </section>
    );
  }

  // ── Form ──
  return (
    <section id="form-daftar" className="py-20 bg-white dark:bg-background-dark">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-bold uppercase tracking-widest text-primary mb-2">
            Formulir Pendaftaran
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white">
            Daftar PPDB {tahunAjaran}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-3 max-w-xl mx-auto">
            Isi formulir di bawah ini dengan data yang benar dan lengkap.
            Pastikan nomor HP aktif untuk menerima informasi selanjutnya.
          </p>
          <a
            href="/ppdb/cek"
            className="inline-flex items-center gap-1.5 mt-4 text-sm text-primary hover:underline font-medium"
          >
            <span className="material-symbols-outlined text-[16px]">manage_search</span>
            Sudah punya nomor pendaftaran? Cek status di sini
          </a>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {error && (
            <div className="rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-5 py-4 text-sm text-red-700 dark:text-red-400 flex items-start gap-3">
              <span className="material-symbols-outlined text-[18px] shrink-0 mt-0.5">error</span>
              {error}
            </div>
          )}

          {/* ── Data Diri ── */}
          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8">
            <SectionTitle icon="person" title="Data Diri Calon Siswa" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <Field label="Nama Lengkap" required>
                  <input required value={namaLengkap} onChange={(e) => setNamaLengkap(e.target.value)}
                    className={inputCls} placeholder="Nama sesuai akta kelahiran" />
                </Field>
              </div>
              <Field label="Jenis Kelamin" required>
                <select value={jenisKelamin} onChange={(e) => setJenisKelamin(e.target.value as "L" | "P")} className={selectCls}>
                  <option value="L">Laki-laki</option>
                  <option value="P">Perempuan</option>
                </select>
              </Field>
              <Field label="Agama">
                <select value={agama} onChange={(e) => setAgama(e.target.value)} className={selectCls}>
                  <option value="">-- Pilih Agama --</option>
                  {["Islam", "Kristen", "Katolik", "Hindu", "Buddha", "Konghucu"].map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </Field>
              <Field label="Tempat Lahir" required>
                <input required value={tempatLahir} onChange={(e) => setTempatLahir(e.target.value)}
                  className={inputCls} placeholder="Kota tempat lahir" />
              </Field>
              <Field label="Tanggal Lahir" required>
                <input required type="date" value={tanggalLahir} onChange={(e) => setTanggalLahir(e.target.value)}
                  className={inputCls} />
              </Field>
              <Field label="NIK">
                <input value={nik} onChange={(e) => setNik(e.target.value)}
                  className={inputCls} placeholder="16 digit NIK" maxLength={16} />
              </Field>
              <Field label="Asal TK / PAUD">
                <input value={asalTk} onChange={(e) => setAsalTk(e.target.value)}
                  className={inputCls} placeholder="Nama TK/PAUD asal" />
              </Field>
            </div>
          </div>

          {/* ── Alamat ── */}
          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8">
            <SectionTitle icon="home" title="Alamat Tempat Tinggal" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <Field label="Alamat Lengkap" required>
                  <textarea required rows={2} value={alamat} onChange={(e) => setAlamat(e.target.value)}
                    className={`${inputCls} resize-none`} placeholder="Jalan, nomor rumah, RT/RW" />
                </Field>
              </div>
              <Field label="RT">
                <input value={rt} onChange={(e) => setRt(e.target.value)} className={inputCls} placeholder="001" />
              </Field>
              <Field label="RW">
                <input value={rw} onChange={(e) => setRw(e.target.value)} className={inputCls} placeholder="002" />
              </Field>
              <Field label="Kelurahan / Desa">
                <input value={kelurahan} onChange={(e) => setKelurahan(e.target.value)} className={inputCls} />
              </Field>
              <Field label="Kecamatan">
                <input value={kecamatan} onChange={(e) => setKecamatan(e.target.value)} className={inputCls} />
              </Field>
              <Field label="Kabupaten / Kota">
                <input value={kabupaten} onChange={(e) => setKabupaten(e.target.value)} className={inputCls} />
              </Field>
              <Field label="Provinsi">
                <input value={provinsi} onChange={(e) => setProvinsi(e.target.value)} className={inputCls} />
              </Field>
              <Field label="Kode Pos">
                <input value={kodePos} onChange={(e) => setKodePos(e.target.value)} className={inputCls} placeholder="67xxx" />
              </Field>
            </div>
          </div>

          {/* ── Orang Tua / Wali ── */}
          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8">
            <SectionTitle icon="family_restroom" title="Data Orang Tua / Wali" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field label="Nama Ayah">
                <input value={namaAyah} onChange={(e) => setNamaAyah(e.target.value)} className={inputCls} />
              </Field>
              <Field label="Nama Ibu">
                <input value={namaIbu} onChange={(e) => setNamaIbu(e.target.value)} className={inputCls} />
              </Field>
              <Field label="Nama Wali (jika ada)">
                <input value={namaWali} onChange={(e) => setNamaWali(e.target.value)} className={inputCls} />
              </Field>
              <Field label="No. HP / WhatsApp" required>
                <input required type="tel" value={noHp} onChange={(e) => setNoHp(e.target.value)}
                  className={inputCls} placeholder="08xxxxxxxxxx" />
              </Field>
              <div className="md:col-span-2">
                <Field label="Email">
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    className={inputCls} placeholder="email@contoh.com" />
                </Field>
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-3 bg-primary hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-base px-10 py-4 rounded-xl transition-colors shadow-xl shadow-primary/30"
            >
              {submitting ? (
                <>
                  <span className="material-symbols-outlined text-[20px] animate-spin">progress_activity</span>
                  Mengirim...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[20px]">send</span>
                  Kirim Pendaftaran
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
