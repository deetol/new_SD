import Image from "next/image";
import Link from "next/link";
import { GalleryItem } from "@/data/galeri";

export default function GaleriDetailContent({ item }: { item: GalleryItem }) {
  return (
    <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
      {/* Back Button */}
      <div className="mb-6">
        <Link
          href="/galeri"
          className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors font-medium"
        >
          <span className="material-symbols-outlined">arrow_back</span>
          Kembali ke Galeri
        </Link>
      </div>

      {/* Hero Section */}
      <div className="@container">
        <div className="w-full relative overflow-hidden rounded-xl h-[300px] md:h-[480px] bg-slate-200 dark:bg-slate-800">
          <img
            alt={item.title}
            className="w-full h-full object-cover"
            src={item.image}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6 md:p-10">
            {item.highlighted && (
              <span className="inline-block bg-primary text-slate-900 text-xs font-bold px-3 py-1 rounded-full w-fit mb-3 uppercase">
                Acara Unggulan
              </span>
            )}
            <h1 className="text-white text-3xl md:text-5xl font-black leading-tight tracking-tight text-balance">
              {item.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Metadata Row */}
      <div className="flex flex-wrap gap-4 py-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
          <span className="material-symbols-outlined text-primary">
            calendar_month
          </span>
          <span className="text-sm font-medium">{item.date}</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
          <span className="material-symbols-outlined text-primary">
            category
          </span>
          <span className="text-sm font-medium">{item.category}</span>
        </div>
        {item.location && (
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
            <span className="material-symbols-outlined text-primary">
              location_on
            </span>
            <span className="text-sm font-medium">{item.location}</span>
          </div>
        )}
      </div>

      {/* Detailed Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 py-8">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold">Tentang Kegiatan</h2>
          {item.content?.map((paragraph, index) => (
            <p
              key={index}
              className="text-slate-600 dark:text-slate-400 leading-relaxed text-balance"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Mini Gallery / Side Images */}
        {item.subImages && item.subImages.length > 0 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold">Sorotan Kegiatan</h3>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
              {item.subImages.map((img, idx) => (
                <div
                  key={idx}
                  className="relative aspect-video rounded-lg overflow-hidden bg-slate-200"
                >
                  <img
                    alt={img.alt}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    src={img.url}
                  />
                </div>
              ))}
            </div>
            <button className="w-full py-3 bg-primary/10 hover:bg-primary/20 text-slate-900 dark:text-slate-100 font-bold rounded-lg border border-primary/30 transition-all flex items-center justify-center gap-2 mt-4">
              <span className="material-symbols-outlined text-sm">
                grid_view
              </span>
              Lihat Semua Foto
            </button>
          </div>
        )}
      </div>

      {/* Bottom Action */}
      <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex justify-center">
        <button className="bg-primary hover:bg-primary/90 text-background-dark font-bold px-8 py-3 rounded-lg flex items-center gap-2 transition-all shadow-lg shadow-primary/20">
          <span className="material-symbols-outlined">share</span>
          Bagikan Kegiatan Ini
        </button>
      </div>
    </div>
  );
}
