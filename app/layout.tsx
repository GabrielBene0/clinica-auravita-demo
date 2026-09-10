import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Clínica Auravita | Saúde, estética e bem-estar",
    template: "%s | Clínica Auravita",
  },
  description:
    "Cuidado, saúde e bem-estar em cada detalhe. Conheça a Clínica Auravita, uma demonstração de clínica médica e estética premium em São Paulo.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Clínica Auravita",
    description:
      "Cuidado, saúde e bem-estar em cada detalhe. Demonstração comercial de uma clínica fictícia.",
    type: "website",
    locale: "pt_BR",
    siteName: "Clínica Auravita",
  },
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className="antialiased">{children}</body>
    </html>
  );
}
