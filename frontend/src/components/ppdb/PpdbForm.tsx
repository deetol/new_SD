"use client";

import { useRef, useState, type FormEvent } from "react";

interface Props {
  ppdbId: number;
  tahunAjaran: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";

const inputCls =
  "w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary transition-shadow";

function Field({ label, required, hint, children }: {
  label: string; required?: boolean; hint?: string; children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {hint && <p className="mt-1 text-[11px] text-slate-400">{hint}</p>}
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

// ── Komponen upload berkas ────────────────────────────────────────────────────
function FileUpload({
  label, required, hint, accept, file, onFile, icon,
}: {
  label: string; required?: boolean; hint?: string;
  accept: string; file: File | null;
  onFile: (f: File | null) => void; icon: string;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const isPdf = file?.type === "application/pdf";

  return (
    <div>
      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div
        onClick={() => ref.current?.click()}
        className={`relative flex items-center gap-4 p-4 rounded-xl border-2 border-dashed cursor-pointer transition-all ${
          file
            ? "border-primary/40 bg-primary/5 dark:bg-primary/10"
            : "border-slate-300 dark:border-slate-600 hover:border-primary bg-slate-50 dark:bg-slate-800"
        }`}
      >
        <div className={`shrink-0 size-10 rounded-xl flex items-center justify-center ${
          file ? "bg-primary/10" : "bg-slate-200 dark:bg-slate-700"
        }`}>
          <span className={`material-symbols-outlined text-[20px] ${file ? "text-primary" : "text-slate-400"}`}>
            {file ? (isPdf ? "picture_as_pdf" : "image") : icon}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          {file ? (
            <>
              <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{file.name}</p>
              <p className="text-xs text-slate-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </>
          ) : (
            <>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Klik untuk pilih file</p>
              <p className="text-xs text-slate-400">{hint}</p>
            </>
          )}
        </div>
        {file && (
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onFile(null); }}
            className="shrink-0 p-1 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        )}
      </div>
      <input
        ref={ref} type="file" accept={accept} className="hidden"
        onChange={(e) => onFile(e.target.files?.[0] ?? null)}
      />
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function PpdbForm({ ppdbId, tahunAjaran }: Props) {
  // Data diri
  const [namaLengkap, setNamaLengkap]   = useState("");
  const [jenisKelamin, setJenisKelamin] = useState<"L" | "P">("L");
  const [tempatLahir, setTempatLahir]   = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [nik, setNik]                   = useState("");
  const [agama, setAgama]               = useState("");
  const [asalTk, setAsalTk]             = useState("");

  // Alamat
  const [alamat, setAlamat]       = useState("");
  const [rt, setRt]               = useState("");
  const [rw, setRw]               = useState("");
  const [kelurahan, setKelurahan] = useState("");
  const [kecamatan, setKecamatan] = useState("");
  const [kabupaten, setKabupaten] = useState("");
  const [provinsi, setProvinsi]   = useState("");
  const [kodePos, setKodePos]     = useState("");

  // Orang tua
  const [namaAyah, setNamaAyah] = useState("");
  const [namaIbu, setNamaIbu]   = useState("");
  const [namaWali, setNamaWali] = useState("");
  const [noHp, setNoHp]         = useState("");
  const [email, setEmail]       = useState("");

  // Berkas
  const [foto, setFoto]         = useState<File | null>(null);
  const [fileKk, setFileKk]     = useState<File | null>(null);
  const [fileAkta, setFileAkta] = useState<File | null>(null);
  const [fileSurat, setFileSurat] = useState<File | null>(null);

  // UI
  const [submitting, setSubmitting] = useState(false);
  const [error, setError]           = useState<string | null>(null);
  const [success, setSuccess]       = useState<{ nomor: string } | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const form = new FormData();
      form.append("ppdb_id",       String(ppdbId));
      form.append("nama_lengkap",  namaLengkap);
      form.append("jenis_kelamin", jenisKelamin);
      form.append("tempat_lahir",  tempatLahir);
      form.append("tanggal_lahir", tanggalLahir);
      form.append("alamat",        alamat);
      form.append("no_hp",         noHp);
      if (nik)       form.append("nik",       nik);
      if (agama)     form.append("agama",     agama);
      if (asalTk)    form.append("asal_tk",   asalTk);
      if (rt)        form.append("rt",        rt);
      if (rw)        form.append("rw",        rw);
      if (kelurahan) form.append("kelurahan", kelurahan);
      if (kecamatan) form.append("kecamatan", kecamatan);
      if (kabupaten) form.append("kabupaten", kabupaten);
      if (provinsi)  form.append("provinsi",  provinsi);
      if (kodePos)   form.append("kode_pos",  kodePos);
      if (namaAyah)  form.append("nama_ayah", namaAyah);
      if (namaIbu)   form.append("nama_ibu",  namaIbu);
      if (namaWali)  form.append("nama_wali", namaWali);
      if (email)     form.append("email",     email);
      // Berkas
      if (foto)      form.append("foto",                  foto);
      if (fileKk)    form.append("file_kk",               fileKk);
      if (fileAkta)  form.append("file_akta",             fileAkta);
      if (fileSurat) form.append("file_surat_pernyataan", fileSurat);

      const res = await fetch(`${API_URL}/pendaftar-ppdb`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: form,
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

  // ── Sukses ──────────────────────────────────────────────────────────────────
  if (success) {
    return (
      <section className="py-20 bg-white dark:bg-background-dark">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="size-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-4xl">check_circle</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-3">Pendaftaran Berhasil!</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-6">
            Terima kasih telah mendaftar. Simpan nomor pendaftaran Anda.
          </p>
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
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl px-5 py-4 text-sm text-amber-700 dark:text-amber-400 text-left mb-6 flex items-start gap-3">
            <span className="material-symbols-outlined text-[18px] shrink-0 mt-0.5">info</span>
            <p>Simpan nomor ini untuk mengecek status pendaftaran kapan saja.</p>
          </div>
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

  // ── Form ─────────────────────────────────────────────────────────────────────
  return (
    <section id="form-daftar" className="py-20 bg-white dark:bg-background-dark">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-bold uppercase tracking-widest text-primary mb-2">Formulir Pendaftaran</p>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white">
            Daftar PPDB {tahunAjaran}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-3 max-w-xl mx-auto">
            Isi formulir dengan data yang benar dan lengkap. Pastikan nomor HP aktif.
          </p>
          <a href="/ppdb/cek" className="inline-flex items-center gap-1.5 mt-4 text-sm text-primary hover:underline font-medium">
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

          {/* Data Diri */}
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
                <select value={jenisKelamin} onChange={(e) => setJenisKelamin(e.target.value as "L" | "P")} className={inputCls}>
                  <option value="L">Laki-laki</option>
                  <option value="P">Perempuan</option>
                </select>
              </Field>
              <Field label="Agama">
                <select value={agama} onChange={(e) => setAgama(e.target.value)} className={inputCls}>
                  <option value="">-- Pilih Agama --</option>
                  {["Islam","Kristen","Katolik","Hindu","Buddha","Konghucu"].map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </Field>
              <Field label="Tempat Lahir" required>
                <input required value={tempatLahir} onChange={(e) => setTempatLahir(e.target.value)}
                  className={inputCls} placeholder="Kota tempat lahir" />
              </Field>
              <Field label="Tanggal Lahir" required>
                <input required type="date" value={tanggalLahir} onChange={(e) => setTanggalLahir(e.target.value)} className={inputCls} />
              </Field>
              <Field label="NIK">
                <input value={nik} onChange={(e) => setNik(e.target.value)} className={inputCls} placeholder="16 digit NIK" maxLength={16} />
              </Field>
              <Field label="Asal TK / PAUD">
                <input value={asalTk} onChange={(e) => setAsalTk(e.target.value)} className={inputCls} placeholder="Nama TK/PAUD asal" />
              </Field>
            </div>
          </div>

          {/* Alamat */}
          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8">
            <SectionTitle icon="home" title="Alamat Tempat Tinggal" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <Field label="Alamat Lengkap" required>
                  <textarea required rows={2} value={alamat} onChange={(e) => setAlamat(e.target.value)}
                    className={`${inputCls} resize-none`} placeholder="Jalan, nomor rumah" />
                </Field>
              </div>
              <Field label="RT"><input value={rt} onChange={(e) => setRt(e.target.value)} className={inputCls} placeholder="001" /></Field>
              <Field label="RW"><input value={rw} onChange={(e) => setRw(e.target.value)} className={inputCls} placeholder="002" /></Field>
              <Field label="Kelurahan / Desa"><input value={kelurahan} onChange={(e) => setKelurahan(e.target.value)} className={inputCls} /></Field>
              <Field label="Kecamatan"><input value={kecamatan} onChange={(e) => setKecamatan(e.target.value)} className={inputCls} /></Field>
              <Field label="Kabupaten / Kota"><input value={kabupaten} onChange={(e) => setKabupaten(e.target.value)} className={inputCls} /></Field>
              <Field label="Provinsi"><input value={provinsi} onChange={(e) => setProvinsi(e.target.value)} className={inputCls} /></Field>
              <Field label="Kode Pos"><input value={kodePos} onChange={(e) => setKodePos(e.target.value)} className={inputCls} placeholder="67xxx" /></Field>
            </div>
          </div>

          {/* Orang Tua */}
          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8">
            <SectionTitle icon="family_restroom" title="Data Orang Tua / Wali" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field label="Nama Ayah"><input value={namaAyah} onChange={(e) => setNamaAyah(e.target.value)} className={inputCls} /></Field>
              <Field label="Nama Ibu"><input value={namaIbu} onChange={(e) => setNamaIbu(e.target.value)} className={inputCls} /></Field>
              <Field label="Nama Wali (jika ada)"><input value={namaWali} onChange={(e) => setNamaWali(e.target.value)} className={inputCls} /></Field>
              <Field label="No. HP / WhatsApp" required>
                <input required type="tel" value={noHp} onChange={(e) => setNoHp(e.target.value)} className={inputCls} placeholder="08xxxxxxxxxx" />
              </Field>
              <div className="md:col-span-2">
                <Field label="Email">
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} placeholder="email@contoh.com" />
                </Field>
              </div>
            </div>
          </div>

          {/* ── Upload Berkas ── */}
          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8">
            <SectionTitle icon="upload_file" title="Upload Berkas Persyaratan" />

            <div className="mb-5 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl px-4 py-3 text-sm text-blue-700 dark:text-blue-400 flex items-start gap-2">
              <span className="material-symbols-outlined text-[16px] shrink-0 mt-0.5">info</span>
              <p>Format yang diterima: JPG, PNG, PDF. Ukuran maksimal masing-masing file: 5 MB.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FileUpload
                label="Foto Calon Siswa"
                icon="photo_camera"
                accept="image/jpeg,image/png"
                hint="JPG/PNG · maks 2 MB"
                file={foto}
                onFile={setFoto}
              />
              <FileUpload
                label="Kartu Keluarga (KK)"
                icon="badge"
                accept="image/jpeg,image/png,application/pdf"
                hint="JPG/PNG/PDF · maks 5 MB"
                file={fileKk}
                onFile={setFileKk}
              />
              <FileUpload
                label="Akta Kelahiran"
                icon="description"
                accept="image/jpeg,image/png,application/pdf"
                hint="JPG/PNG/PDF · maks 5 MB"
                file={fileAkta}
                onFile={setFileAkta}
              />
              <FileUpload
                label="Surat Pernyataan"
                icon="edit_document"
                accept="image/jpeg,image/png,application/pdf"
                hint="JPG/PNG/PDF · maks 5 MB"
                file={fileSurat}
                onFile={setFileSurat}
              />
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
                <><span className="material-symbols-outlined text-[20px] animate-spin">progress_activity</span>Mengirim...</>
              ) : (
                <><span className="material-symbols-outlined text-[20px]">send</span>Kirim Pendaftaran</>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
