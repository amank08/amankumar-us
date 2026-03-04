import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <svg
        width="180"
        height="180"
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
    ),
    { ...size }
  );
}
