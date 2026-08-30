import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LocaleProvider } from "./i18n/context";
import { jsonLd } from "./seo";

const SITE_URL = "https://www.diones.dev";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Diones Alves — Full Stack Software Engineer | Java, Node.js & React",
    template: "%s | Diones Alves",
  },
  description:
    "Full Stack Software Engineer with 6+ years of experience in Java, Spring Boot, Node.js, NestJS, React, Next.js, and cloud solutions (AWS, Azure). Building enterprise-grade REST APIs and microservices from Brazil.",
  keywords: [
    "software engineer",
    "full stack developer",
    "java developer",
    "spring boot",
    "node.js developer",
    "nestjs",
    "react developer",
    "next.js",
    "typescript",
    "backend developer",
    "microservices",
    "aws",
    "azure",
  ],
  authors: [{ name: "Diones Alves", url: SITE_URL }],
  creator: "Diones Alves",
  publisher: "Diones Alves",
  alternates: {
    canonical: "/",
    languages: {
      "en": "/",
      "pt-BR": "/",
    },
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Diones Alves",
    title: "Diones Alves — Full Stack Software Engineer",
    description:
      "Full Stack Software Engineer specializing in enterprise applications, REST APIs, microservices, and cloud-based solutions.",
    locale: "en_US",
    alternateLocale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Diones Alves — Full Stack Software Engineer",
    description:
      "Full Stack Software Engineer specializing in enterprise applications, REST APIs, microservices, and cloud-based solutions.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#0A0A0F",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body style={{ fontFamily: 'Inter, system-ui, sans-serif', background: '#0A0A0F', color: '#F0F0F5', margin: 0 }}>
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
