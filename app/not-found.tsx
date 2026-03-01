import Link from "next/link";

/** Global 404 not-found page shown when no route matches. */
export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col items-center justify-center px-6 py-32 text-center">
      <p className="text-6xl font-bold text-accent">404</p>
      <h1 className="mt-4 text-2xl font-semibold tracking-tight text-text-primary sm:text-3xl">
        Page not found
      </h1>
      <p className="mt-3 text-text-secondary">
        Sorry, the page you&apos;re looking for doesn&apos;t exist or has been
        moved.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
      >
        Go back home
      </Link>
    </div>
  );
}
