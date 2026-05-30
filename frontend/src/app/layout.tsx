import "./globals.css";
import { Lexend } from "next/font/google";
import type { Metadata } from "next";

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
});

export const metadata: Metadata = {
  title: "SD Negeri 5 - Mewujudkan Generasi Cerdas & Berkarakter",
  description: "Selamat datang di official website SD Negeri 5. Mewujudkan Generasi Cerdas, Berkarakter, dan Berakhlak Mulia melalui pendidikan yang inovatif dan inklusif.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${lexend.variable} font-display bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
