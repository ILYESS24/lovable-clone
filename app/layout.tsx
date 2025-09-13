import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BuilderAI - Plateforme IA de Développement d'Applications",
  description: "Créez des applications web complètes avec l'IA. Plateforme moderne de développement avec éditeur de code intégré, déploiement automatique et collaboration en équipe.",
  keywords: "IA, développement, applications web, code, déploiement, collaboration",
  authors: [{ name: "BuilderAI Team" }],
  openGraph: {
    title: "BuilderAI - Plateforme IA de Développement",
    description: "Créez des applications web avec l'IA",
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "BuilderAI - Plateforme IA de Développement",
    description: "Créez des applications web avec l'IA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}