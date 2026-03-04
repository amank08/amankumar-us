import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Aman Kumar";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Generates a 1200x630 PNG Open Graph image for social media link previews. */
export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#050508",
        }}
      >
        {/* Card */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: 1120,
            height: 550,
            borderRadius: 24,
            backgroundColor: "#0e0e14",
            border: "1px solid #1a1a24",
          }}
        >
          {/* Logo */}
          <svg
            width="120"
            height="120"
            viewBox="0 0 40 40"
            fill="none"
          >
            <rect width="40" height="40" rx="10" fill="#4f8fff" />
            <path
              d="M17 17C15.5 14.5 11 14 10 17C9 20 10.5 24 13 24C15.5 24 17 21 17 19V27"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <path
              d="M17 13V27"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M22 27V13M22 20.5L28 13M22 20.5L28.5 27"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>

          {/* Name */}
          <div
            style={{
              marginTop: 40,
              fontSize: 48,
              fontWeight: 700,
              color: "#f0f0f5",
            }}
          >
            Aman Kumar
          </div>

          {/* Subtitle */}
          <div
            style={{
              marginTop: 12,
              fontSize: 24,
              color: "#9898a8",
            }}
          >
            Software Engineer
          </div>

          {/* URL */}
          <div
            style={{
              marginTop: 48,
              fontSize: 18,
              color: "#5e5e70",
            }}
          >
            amankumar.us
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
