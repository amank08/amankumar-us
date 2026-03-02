export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-surface/30">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <p className="text-center text-sm text-text-muted">
          &copy; {new Date().getFullYear()} Aman Kumar. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
