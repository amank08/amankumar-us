/** SVG logo mark — stylised "AK" initials in an accent-coloured badge. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block ${className}`}
      aria-hidden="true"
    >
      {/* Rounded square background */}
      <rect width="36" height="36" rx="8" className="fill-accent" />

      {/* Letter A */}
      <path
        d="M8.5 26L13.5 10H16.5L21.5 26H18.8L17.7 22.5H12.3L11.2 26H8.5ZM13 20H17L15 13.2L13 20Z"
        fill="white"
      />

      {/* Letter K */}
      <path
        d="M22 26V10H24.5V17.2L29 10H31.8L27.2 17.5L32 26H29L25.5 19L24.5 20.3V26H22Z"
        fill="white"
      />
    </svg>
  );
}
