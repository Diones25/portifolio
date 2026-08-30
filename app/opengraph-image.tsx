import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export const alt = "Diones Alves — Full Stack Software Engineer";

export default function og() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "#0A0A0F",
          padding: "80px",
          fontFamily: "JetBrains Mono, monospace",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 36,
            color: "#3B82F6",
            letterSpacing: "0.1em",
            marginBottom: 32,
          }}
        >
          ~/diones.dev
        </div>
        <div
          style={{
            fontSize: 88,
            fontWeight: 800,
            color: "#F0F0F5",
            letterSpacing: "-0.03em",
            display: "flex",
          }}
        >
          Diones Alves
        </div>
        <div
          style={{
            fontSize: 44,
            color: "#A5B4FC",
            marginTop: 20,
            display: "flex",
          }}
        >
          Full Stack Software Engineer
        </div>
        <div
          style={{
            fontSize: 30,
            color: "#6B7280",
            marginTop: 48,
            display: "flex",
          }}
        >
          Java · Spring Boot · Node.js · NestJS · React · Next.js · TypeScript
        </div>
        <div
          style={{
            width: 120,
            height: 6,
            backgroundColor: "#3B82F6",
            marginTop: 56,
            display: "flex",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
