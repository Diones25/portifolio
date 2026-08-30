export const SITE_URL = "https://www.diones.dev";

export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: "Diones Alves",
  url: SITE_URL,
  image: `${SITE_URL}/opengraph-image`,
  jobTitle: "Full Stack Software Engineer",
  worksFor: {
    "@type": "Organization",
    name: "GFT Technologies",
  },
  address: {
    "@type": "PostalAddress",
    addressCountry: "BR",
    addressLocality: "Tianguá",
    addressRegion: "CE",
  },
  knowsAbout: [
    "Java",
    "Spring Boot",
    "Node.js",
    "NestJS",
    "React",
    "Next.js",
    "TypeScript",
    "REST APIs",
    "Microservices",
    "PostgreSQL",
    "MongoDB",
    "AWS",
    "Azure",
    "Kafka",
    "Docker",
    "Kubernetes",
  ],
  sameAs: [
    "https://github.com/Diones25",
    "https://www.linkedin.com/in/diones-pereira-alves-31bb3969/",
  ],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "Diones Alves",
  inLanguage: ["en", "pt-BR"],
  publisher: {
    "@id": `${SITE_URL}/#person`,
  },
};

export const profilePageSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${SITE_URL}/#profilepage`,
  url: SITE_URL,
  mainEntity: {
    "@id": `${SITE_URL}/#person`,
  },
  isPartOf: {
    "@id": `${SITE_URL}/#website`,
  },
};

export const jsonLd = [personSchema, websiteSchema, profilePageSchema];
