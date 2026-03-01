/** SVG logo wrapper props */
type LogoProps = { className?: string };

/** Option A — Flowing script "ak" with connected letters, thin elegant stroke */
export function LogoA({ className = "" }: LogoProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={`inline-block ${className}`} aria-hidden="true">
      <rect width="40" height="40" rx="10" className="fill-accent" />
      <path
        d="M11 28Q13 22 15 18Q16 16 16.5 15.5Q17 15 16.5 14.5Q16 14 15 14.5Q13.5 15 12.5 17Q11.5 19 12.5 20Q13.5 21 15.5 19.5Q17 18 18.5 15L16.5 28M18.5 15Q17 22 18 25Q19 28 21 26Q23 24 24.5 20L22 28Q24 24 26 20Q28 16 29 14"
        stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none"
      />
    </svg>
  );
}

/** Option B — Bold monoline "AK" with a slight italic slant, modern feel */
export function LogoB({ className = "" }: LogoProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={`inline-block ${className}`} aria-hidden="true">
      <rect width="40" height="40" rx="10" className="fill-accent" />
      <path
        d="M10 28L16 11L22 28M12.5 22H19.5"
        stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none"
      />
      <path
        d="M24 28V11M24 19.5L31 11M26 21L31 28"
        stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none"
      />
    </svg>
  );
}

/** Option C — Minimal lowercase "ak" with a single continuous stroke */
export function LogoC({ className = "" }: LogoProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={`inline-block ${className}`} aria-hidden="true">
      <rect width="40" height="40" rx="10" className="fill-accent" />
      <path
        d="M18 17C17 15 14 14 12.5 16C11 18 11.5 22 13.5 23C15.5 24 17.5 22 18 20L18 27M18 14V27M23 27V14M23 21L28 14M23 21L29 28"
        stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"
      />
    </svg>
  );
}

/** Option D — Calligraphic swash "A" with decorative k, thick-thin contrast */
export function LogoD({ className = "" }: LogoProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={`inline-block ${className}`} aria-hidden="true">
      <rect width="40" height="40" rx="10" className="fill-accent" />
      <path
        d="M9 28C9 28 13 12 15.5 10Q18 8 17 12L14 24Q15 20 17 17Q19 14 20 16Q18 20 17 24Q18 22 19.5 19Q21 16 22 14L20 28"
        stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"
      />
      <path
        d="M24 28V12M24 20L29 13M25.5 22L30 28"
        stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"
      />
    </svg>
  );
}

/** Default export — currently uses Option A. Change this after picking a favorite. */
export function Logo({ className = "" }: LogoProps) {
  return <LogoA className={className} />;
}
