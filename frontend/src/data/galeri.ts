export interface GalleryItem {
  id: string;
  category: string;
  title: string;
  date: string;
  location?: string;
  image: string;
  highlighted: boolean;
  content?: string[];
  subImages?: { url: string; alt: string; description: string }[];
}

export const galleryData: GalleryItem[] = [
  {
    id: "upacara-senin",
    category: "Upacara",
    title: "Upacara Bendera Senin",
    date: "14 Agustus 2023",
    location: "Lapangan Utama",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDlvrRmLxxLXIFDyov3_sVtqWKHX-etjEkEMNNPKVGfDXrFFNvlRvRpNgDZKoJPx5NcmsUnbxbrxS-ZiRZTYKtoUkjYcBc78SHYRhtUpledXpCXwyKIgCfFQ62qIQDfhyCf6pPljvq8Q86Y7yChGo0xHQ82CBI_9iwGkLPkkeoms8kxRqZN3t5tc_vmvN6ACUZMyD1OV2CH09TlkVIMkZIp_OqMKMd9HA_ueI11MJ6-VjbbyAj7fvNJpSt6ErPQdmgI651vAFG1uJg",
    highlighted: false,
    content: [
      "Setiap hari Senin, siswa SD Negeri 5 melaksanakan upacara bendera merah putih di lapangan utama sekolah. Kegiatan ini bertujuan untuk menumbuhkan jiwa nasionalisme dan kedisiplinan sejak dini.",
      "Seluruh guru, siswa, dan staf sekolah mengikuti upacara dengan khidmat. Pembina upacara menyampaikan pesan-pesan moral dan motivasi kepada seluruh peserta upacara.",
    ],
    subImages: [],
  },
  {
    id: "hari-kemerdekaan-79",
    category: "Seni & Budaya",
    title: "Perayaan Hari Kemerdekaan RI ke-79",
    date: "17 August 2024",
    location: "Main Hall & Field",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCM_e8fx15VRAJwNIHxD65X8M-ueOFpiY9DxGWoSpWRGhqRd0Fmb0clerx0HyQsZgtSIaf_v6tzAn8rKRSYZO9ZMm2HNXo3QjceClzndMgR0WK7xVqdhSh4Dhhkw7c4zmEzanMjnLxtOPRywCrOwABL4ZZX2JqwMxIUSCqaORt1pE4RYtRQ4ezCBC8yCo5pBCN3_L8eXFKKmzNystdZACZchXav2G53zekS7Enc2J1YYKFG6WVcUkRtZ5uFHJTfadjFtGkC1Qu0E7I",
    highlighted: true,
    content: [
      'Acara peringatan Hari Kemerdekaan Republik Indonesia ke-79 di sekolah kami berlangsung dengan sangat meriah dan penuh semangat patriotisme. Seluruh siswa, guru, dan staf berkumpul di lapangan utama sejak pagi hari untuk melaksanakan upacara bendera yang khidmat. Tema tahun ini adalah "Nusantara Baru, Indonesia Maju," yang tercermin dalam setiap aspek dekorasi dan penampilan yang disuguhkan.',
      "Setelah upacara formal, kegiatan dilanjutkan dengan berbagai lomba tradisional yang menguji ketangkasan dan kerjasama tim. Mulai dari lomba balap karung, tarik tambang, hingga kompetisi menghias kelas dengan tema kemerdekaan. Tidak hanya itu, panggung seni juga dimeriahkan oleh penampilan paduan suara siswa yang membawakan lagu-lagu nasional dengan aransemen modern, serta pertunjukan tari tradisional dari berbagai daerah di Indonesia.",
      "Kemeriahan ditutup dengan pengumuman pemenang lomba dan pembagian hadiah bagi para peserta yang telah berpartisipasi aktif. Kegiatan ini diharapkan dapat terus memupuk rasa cinta tanah air dan mempererat tali persaudaraan antar warga sekolah, sekaligus memberikan wadah bagi siswa untuk mengekspresikan bakat seni dan sportivitas mereka.",
    ],
    subImages: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuADw55doQrjWQDDO--QilEZZYBYZ-jRDDl_CjT_G6B7dcb-6gcc6SskwXViL45ckCan0gyotAzFo1-40Czoip_7iSBRLBtsTBkiCBY3ZFfAvJBdKGfV4mpx-AhuD9cP5-1RMgiJvyE48kS1j0XIPamK-9w_0tgv4OEZFBnbLjVGqlxxlbWMS64rq3Sfm2yg0b_glbOHuBTIAwsS2Ilfvtrkfu1NY59vRav3I2p8liwU4CKNIZJwjbVhJJF3yM03sUN8cBh3qR6-mwk",
        alt: "Cultural dance",
        description:
          "Students performing traditional Indonesian dance on stage",
      },
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBmG6yinnzXsAhxoskRmRrH7dv1qJNznWol4fVMCeNxv5wHTOVwLQxrPYdCXQT8L4TtDiFy1z_btaTYED3JwPzwvEWrV5zU1PGMut4xmIQmy48b7faMJaajr-ypmLxwHxJSDyGCK_Oyk9tDYAM5h2_ZfFQDwQfKXoWV9_wOkYaqGfWcDpS9VItY6UP8W23xzUqiGe7Z70BAmfckelGxW09bf63xiURIn3TXOLviScFnbRXkYZC_4Xm4n430nYSur6lhlso-2wyMuLA",
        alt: "Team activity",
        description:
          "Students participating in a team-building tug-of-war competition",
      },
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCockYtjH9Jq3HQ9KKujd2AVdIgQnjpfAhtZPh1muZcisHUniBMInoRRVJ4l88l7w96H-SgBs-INC57QHvCSYnFy6YJOAaNzNYl7rbd0O87A8GhgqbDTLu0LVCm8HyXaN15oBcXRLAiX19FIaX1XjxMyOV_sbmc-Zd_rvbcwqMbNMS7T9Tn41YNGVoV8BlsqOFUahv0y1lqj7rHUeFjyskQd0HYTmhn67fxuOSh5qwEMdGaFJAZE404Sz127TY7VLhSuHvwWOyPEYw",
        alt: "Ceremony",
        description:
          "School choir singing national anthems during the ceremony",
      },
    ],
  },
  {
    id: "lomba-estafet",
    category: "Olahraga",
    title: "Lomba Lari Estafet",
    date: "17 Agustus 2023",
    location: "Lapangan Olahraga",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDmr_GqAG6L0yu9fWWKYPBvz-SHWsmSK77x-C0-SW5RToqEshNsL3gh4KZvqtmG1BX9rKWcB3SjK7InFA0wF5IzIpRaHPJ92-30QoNXO6xVjn7aa2lY-uUVz0ZkzNcui39ZFpmjlyRRrIlKPLhe20KyIb7pz2K-gkEaNOTwhUVA-0ZithVOlZMJYjewUibjfbIrda17py66xH3jBNR3c4icWWiTwcDqkL4NIgI_Y3FD4lH2MaOOib1kg1LDt5A9kXut1jwC0WLwAhU",
    highlighted: false,
    content: [
      "Pertandingan olahraga lari estafet antar kelas berlangsung meriah. Siswa saling berkompetisi memperebutkan gelar juara kelas dengan semangat sportivitas yang tinggi.",
    ],
    subImages: [],
  },
  {
    id: "hari-guru",
    category: "Akademik",
    title: "Peringatan Hari Guru",
    date: "25 November 2023",
    location: "Aula Sekolah",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBBEzV4eo3jq0swAG4WVTzyjHq-Hf6_hXYzYHfL7paFIadDFW3mB-LqsZ2LoEAPDzDhIK-Hrcf2tg7ivYJYn04syKiSqYaRmr6f8_ePxcj7mQPewIAIlMAAU1Vy_tMGjLUqKd4D6nx147b116NkYhex3aVUkgCcOsQRsY-dmQ7GmkyLNroyJGvmbStbjuYeyU-QCvjZSkZiY8wEvmc8rgS9H149FaAXMz6zoI6sU30yHClTuXAy6uJFwC0ExPf3nu0WZtawUxcaBbI",
    highlighted: false,
    content: [
      "Perayaan Hari Guru Nasional di SD Negeri 5 dimeriahkan dengan berbagai penampilan dari kreativitas siswa. Para guru juga memberikan apresiasi kepada siswa-siswi yang berprestasi.",
    ],
    subImages: [],
  },
  {
    id: "tari-tradisional",
    category: "Seni & Budaya",
    title: "Latihan Tari Tradisional",
    date: "20 September 2023",
    location: "Ruang Kesenian",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBb7828DLL06-Cdp5fj9OB-Rl35EHsb-nMRbDO0JEp-DB-TK64O3rWb8xq-HBRrtJ1F_0NXfMklG5dMD9ecNTBR1WLPxCGD4dj6utensrsMtjd-QszkDVS1F3QOrgRAhF1vop0GK96BzGbJ4Hxm7z238YKTIuNcijb9NbI5jKDNQAlpCZnOsXCm6je90soqcNZjUzrRBfQer-Y0EEGMw4F_Lx5MLF39htTzRlimXvk780P7LA8fCQ1boQ_vydhxJ4GejtQAj8IDIF4",
    highlighted: false,
    content: [
      "Kegiatan ekstrakurikuler tari tradisional menjadi salah satu kegiatan unggulan di sekolah kami. Siswa-siswi antusias mengikuti latihan setiap pekannya.",
    ],
    subImages: [],
  },
  {
    id: "pameran-lukisan",
    category: "Seni & Budaya",
    title: "Pameran Lukisan Siswa",
    date: "12 Desember 2023",
    location: "Lorong Pameran",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBj_ljWm-Fq-4AlvHkb2rpio1rmYiczoEv-BX_3xEOcgBctshyYu0MMIiqKvqPblfR37Yu-mZNzoY8L8TgxveHkFXfbvk7mQzHGXZ0-ZCgu90E8aQ-uyVZUAxOfef9OlSXiylz6Qso8f_H-Qz5JSRkuFv1KXBx1JaK2ImvkZ3Vnnw1V4jT73HzavTvD1y_kBfdpVE4TxTkrZXp6JHG2n41qzxS9Ai1JBkJ3gY34Anda0d57zxIQfLFTuKg5lDef0QGrjakpAgaLQs0",
    highlighted: false,
    content: [
      "Pameran karya lukisan dan kerajinan tangan siswa kelas 1 sampai 6 dalam rangka gelar karya kreativitas akhir semester.",
    ],
    subImages: [],
  },
  {
    id: "prestasi-sekolah",
    category: "Prestasi",
    title: "Prestasi Tanpa Batas",
    date: "12 Desember 2023",
    location: "Ruang Kepala Sekolah",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA3nknIlr1HRbLGCrjNpqJEeb40evjFwuAOyDh7SJntEiEPd_GAHrIbDsq3csrwIkmnBrGEY7Zfsq5DUQSSEjaGCZF-00tUsthfUU1CuI7955v0-qtzpV_nTIYi2ZqesDfoHwmplA-T_Fu3q-ZsXrNcmKztnuWFCr4qRvdSOnNjdFZRUWGe_fkDhNWjDmPo9hMPeJSE4NW0_iDLGDrtXWtKDlcbQTfRtjL8heBvDnNR2F557SJ05vBSUXpZX9vFGCM8uGoOOsi1emU",
    highlighted: false,
    content: [
      "SD Negeri Selok Awar-Awar 05 telah meraih berbagai macam penghargaan baik di tingkat kecamatan, kabupaten, maupun provinsi.",
      "Hingga saat ini, koleksi piala kami mencapai lebih dari 50 piala dan lebih dari 100 sertifikat dari berbagai kejuaraan akademik dan non-akademik.",
    ],
    subImages: [],
  },
];
