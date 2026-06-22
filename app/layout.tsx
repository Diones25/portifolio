import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Diones Alves — Full Stack Software Engineer",
  description:
    "Full Stack Software Engineer with 4+ years of experience in Java, Spring Boot, Node.js, NestJS, React, Next.js, and cloud solutions. Based in Brazil.",
  keywords: ["software engineer", "full stack", "react", "nodejs", "nestjs", "java", "spring boot", "typescript"],
  authors: [{ name: "Diones Alves" }],
  openGraph: {
    title: "Diones Alves — Full Stack Software Engineer",
    description: "Full Stack Software Engineer specializing in enterprise applications, REST APIs, and cloud-based solutions.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Diones Alves — Full Stack Software Engineer",
    description: "Full Stack Software Engineer specializing in enterprise applications, REST APIs, and cloud-based solutions.",
  },
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
      </head>
      <body style={{ fontFamily: 'Inter, system-ui, sans-serif', background: '#0A0A0F', color: '#F0F0F5', margin: 0 }}>
        {children}
      </body>
    </html>
  );
}
