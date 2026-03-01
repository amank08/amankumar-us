/** SVG logo mark — cursive "ak" initials in an accent-coloured badge. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block ${className}`}
      aria-hidden="true"
    >
      {/* Rounded square background */}
      <rect width="40" height="40" rx="10" className="fill-accent" />

      {/* Cursive "ak" as a single flowing path, centered */}
      <path
        d="M10.5 27C10.5 27 12 24.5 14.5 21C15.8 19.2 17 17.5 17 16
           C17 14.8 16.2 14 15 14C13.5 14 12 15.5 12 17.5
           C12 19 13 20 14.5 20C16 20 17.5 18.5 18.5 16.5
           L20 13L17 27
           M19 21C19 21 21 17 22.5 14.5
           C22.5 14.5 20.5 20 20 22C19.5 24 20.5 27 22 27
           C24 27 26.5 22 27 20C27.5 18 27.5 16.5 28.5 14
           C28.5 14 25.5 21 25 23C24.5 25 25 27 26.5 27
           C28.5 27 30 24 30.5 22"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
