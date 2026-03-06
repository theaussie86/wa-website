import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Weissteiner Automation - Prozessautomatisierung & KI";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#FAF9F7",
          position: "relative",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Compact Logo */}
        <img
          src="https://weissteiner-automation.com/logo-compact.svg"
          width={500}
          height={174}
          style={{
            marginBottom: 40,
          }}
        />

        {/* Tagline */}
        <p
          style={{
            fontSize: 36,
            color: "#003970",
            margin: 0,
            fontWeight: 500,
            letterSpacing: "0.02em",
          }}
        >
          Prozessautomatisierung & KI
        </p>

        {/* Bottom accent line */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 8,
            background: "linear-gradient(90deg, #D86B00 0%, #F5A14D 50%, #D86B00 100%)",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
