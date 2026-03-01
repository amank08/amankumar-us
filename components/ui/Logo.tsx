/** SVG logo wrapper props */
type LogoProps = { className?: string };

/** Site logo — modern typographic "ak" ligature with shared vertical stroke */
export function Logo({ className = "" }: LogoProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={`inline-block ${className}`} aria-hidden="true">
      <rect width="40" height="40" rx="10" className="fill-accent" />
      <path
        d="M17 17C15.5 14.5 11 14 10 17C9 20 10.5 24 13 24C15.5 24 17 21 17 19V27"
        stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"
      />
      <path
        d="M17 13V27"
        stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"
      />
      <path
        d="M22 27V13M22 20.5L28 13M22 20.5L28.5 27"
        stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"
      />
    </svg>
  );
}
