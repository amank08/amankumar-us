import { LogoA, LogoB, LogoC, LogoD, LogoE, LogoF, LogoG, LogoH } from "@/components/ui/Logo";

/** Temporary page to compare logo options — delete after choosing. */
export default function LogoPreview() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="mb-8 text-2xl font-bold text-text-primary">
        Logo Options
      </h1>
      <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
        {[
          { name: "A — Flowing script", Component: LogoA },
          { name: "B — Bold monoline", Component: LogoB },
          { name: "C — Minimal lowercase", Component: LogoC },
          { name: "D — Calligraphic swash", Component: LogoD },
          { name: "E — Geometric sans", Component: LogoE },
          { name: "F — Stacked monogram", Component: LogoF },
          { name: "G — Rounded bubble", Component: LogoG },
          { name: "H — Ligature modern", Component: LogoH },
        ].map(({ name, Component }) => (
          <div key={name} className="flex flex-col items-center gap-3">
            <Component className="h-20 w-20" />
            <span className="text-center text-sm text-text-secondary">
              {name}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-8 text-sm text-text-muted">
        Visit /logo-preview to see this page. Delete app/logo-preview/ after
        choosing.
      </p>
    </div>
  );
}
