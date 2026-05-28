export default function GuruGrid() {
  const teachers = [
    {
      id: 1,
      name: "Budi Santoso, S.Pd.",
      role: "Kepala Sekolah",
      nip: "197508122005011002",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBnhfB8sVZbOljSB8jAe_pAoEwpZ9XEhCrdI7BKhi_vDxsCk0aWKEknaSWIv-Tf_FSnejaa0tJkMWloJjkZKxZ0hAp7RmHzDANLDBcJfq9ymzYdR3PFW4nLzKm_Tv1wFLnB_YJJgyCYDR-AFk20k-W8FV9OzJH3EYHehDZcQuphR4osN_7yllcYZGOhWowTCo97INBiKj_n5HL2TzUuLq9SDF32CpbKJBTA8Pu_jwuFuZw76ATnqSu6Em2FCjYpJS0AFHCHN7CooCg",
    },
    {
      id: 2,
      name: "Siti Aminah, M.Pd.",
      role: "Guru Kelas I",
      nip: "198204152010012015",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCPmeyie3GtDypCHp7cw1H1fWfEiGiK81W2-HhF05Z-ugRH6SD2suIKIvMxZiBy8kErRVmA5zBDv7d-JHIClQFtD_20dwqKtmzOhcgl0D6OffmGzY8wlxUUGOI8ZVZcBAdfqrPoRjfzSKWjo7ODNH8v2jVql6PwsiHSwy7y7XLI8Es27uZfxJ5N8kpdhiDWGQpz5s6PwkSFmltiP7KbNyvx0sFmxyQzL5QXvkepry_hg0ZtteqgZnupXtutY5fNv19HB9Bh57XiBWA",
    },
    {
      id: 3,
      name: "Rahmat Hidayat, S.Pd.",
      role: "Guru Kelas II",
      nip: "198801202015031004",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDy5JTG_5EK3tKYv0GuOO5a4CSxb7lmLQm0ttCXaAwDbagNJsxmw65KmN3Lyf-3ya0IA2SWeadjDn_ZY_5cLWh1w5aIOaqnEJRd0hwoBd4DKkQqInXXVifWju2HlTZCEKJeLx7YxsILIB6XHMWJ-GzsHZPNqB8KP7BOc98tfgFmoOK2Eojxhet3bdbmbLh6XaDRYTqBQXGXGBwwXBDyO1pkZ3B0PT8vG7IcmHnX4ieUxnAtVg54W0jLr0YRR2e-o9w69paOuciZwKM",
    },
    {
      id: 4,
      name: "Dewi Lestari, S.Pd.",
      role: "Guru Kelas III",
      nip: "199005302019032010",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBY2qiz3TJ6eTPP0UnuGwMyoi75xeyzuycQ-4s4zzWwwfhpm8ufO6yjXla-yZljL6Wn9M652WQrF3w4PfRZkMurjcuCynblcNB8yHtIErAUMFYeSPvpsN4gjEDMttqx3l78SoF9tVpatwtFcwzQkDRT5euP25J3vrs4G86wbroRj1lItDOgpmi3vjLeYngz61b9lc76ldks8sGBK459ehcsZ1U35zL7W4vjJwiWjAf4Q4Br4VqhnE4f6PC01lJiZ5iZsThU5_IKaMg",
    },
    {
      id: 5,
      name: "Agus Setiawan, S.Pd.",
      role: "Guru Kelas IV",
      nip: "198507222012121003",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDIs_nXcUyxKKIjWvQNaCEesI0Mm3QEi1PYuDcmh4wN9CCc8ds_B7Zxmn5BEo0MgMGK61nMr6KWArrehz50TiK84-vw2oLHXcaEkj49BVQ3jeypwSN8_7tDvSFIGkDe_BsJmbAEWJBuc3dGexc4vGsGmXDVHkkv0jxdVqFM4e8Q8dV7joV1Gwuxnu4_Sge5wCmxFNz6En86STWwsEv55kvmi-LHeMxs3kXbNNjlwYoytNhrJQsuxe9hgTTPJ6bdvQ3anGgWMAh1Fek",
    },
    {
      id: 6,
      name: "Ani Maryani, S.Pd.",
      role: "Guru Kelas V",
      nip: "197911022008012007",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMiSqI4g1G-jjD_ZoRJz8_JA6KVdeLTQx036PzUez0tmQZ2TwzGccdCLjPVBBUmXY7J4jxS8JeTppXSLRK6QDPMVTmqEKNh10z34QyagOPGuLJwPQYNouDISZUk2l9Fak1gJVwEol1tEtLPjBOLLh6xdr-t92YVh55O4e5D5vVoRXMlkGbz_4vbnkTgVRDq1ti5c6-d4o2LgUrU8ER7JBKrjduQ4jFax_551Mhkyo4PG5GJgqQJRalZCQUmLFpKiglDVfcVYoCaNs",
    },
    {
      id: 7,
      name: "Eko Prasetyo, S.Pd.",
      role: "Guru Kelas VI",
      nip: "199203142020121008",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA1pY2B0iwo7iSDJShb0vgopSKdTHKL8t3RBtqEVIznyPKNAge2uibNHzygOYelZdVTBzN4sQu1Cm_rh0UOZ5H3zi5JWXFUxY49pADaYamfYHbpYsQIpy0XTBrY3JuOjNMH075cThucQFJLYfJQkU0PL6bhG1EMQS12EV2wHCjyE8_zN0doK_qFm__cPwIc2rMyA5Wc8na5mgREeAT7s0x3iTWgw-U5dsBDZQzcvH3TeqHQA9njcaIBxZ9qwUYLjZl_xb0MZtoA3os",
    },
    {
      id: 8,
      name: "Fitri Handayani, S.Pd.",
      role: "Guru Olahraga",
      nip: "199506102022032012",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAihPhdajcwu4d8e5KJiyNem6HLEI6kg2vStNq3qVcnc0qik4IdVYMYzU83axAHkkpCUYNe8ysFx9eYC7aI-cYpzw6iqNy_hTF6wgwCOpyDrTck0eq-p2UWwgSCe-CT8RAdw8GOvTsF9qenFOwZZMYWPeainm8wQLl4bU1ixM6bE9PB7O7gHqbqSN6XSngOCOOKKqCmTRf9BjlTtaC-Efj_f--9SASmIexbdUkhSkPl7hpZLSahtPFfesrEcbyQYk0T5pKmPBMvMDY",
    },
  ];

  return (
    <div className="space-y-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {teachers.map((teacher) => (
          <div
            key={teacher.id}
            className="group bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-center"
          >
            <div className="relative inline-block mb-4">
              <div className="size-[120px] rounded-full border-4 border-accent-gold p-1">
                <div
                  className="w-full h-full rounded-full bg-center bg-cover bg-slate-200"
                  style={{
                    backgroundImage: `url('${teacher.image}')`,
                  }}
                ></div>
              </div>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
              {teacher.name}
            </h3>
            <p className="text-primary font-semibold text-sm mb-3">
              {teacher.role}
            </p>
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
              <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-1">
                Nomor Induk Pegawai
              </p>
              <p className="text-xs font-mono text-slate-600 dark:text-slate-400">
                {teacher.nip}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Pagination / Load More (Optional enhancement) */}
      <div className="flex justify-center">
        <button className="bg-primary hover:bg-primary/90 text-background-dark font-bold px-8 py-3 rounded-full flex items-center gap-2 transition-all">
          <span>Muat Lebih Banyak</span>
          <span className="material-symbols-outlined">expand_more</span>
        </button>
      </div>
    </div>
  );
}
