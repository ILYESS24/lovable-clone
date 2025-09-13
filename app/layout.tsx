import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lovable Clone - Plateforme de Développement avec IA",
  description: "Créez des applications web complètes avec l'intelligence artificielle. Plateforme moderne de développement avec éditeur de code intégré, déploiement automatique et collaboration en équipe.",
  keywords: "IA, développement, applications web, code, déploiement, collaboration, GPT-4, Claude, Lovable",
  authors: [{ name: "Lovable Clone Team" }],
  openGraph: {
    title: "Lovable Clone - Plateforme de Développement avec IA",
    description: "Créez des applications web avec l'IA",
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lovable Clone - Plateforme de Développement avec IA",
    description: "Créez des applications web avec l'IA",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
