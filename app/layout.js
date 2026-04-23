import { Lora } from "next/font/google";
import "./globals.css";

const lora = Lora({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Korepetycje z Matematyki i Fizyki | Paulina — Warszawa & Online",
  description:
    "Korepetycje z matematyki i fizyki dla uczniów klas 5–matura. Warszawa i online. Doktorantka UW — uczę od podstaw, bez stresu.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pl" className={`${lora.variable} h-full`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
