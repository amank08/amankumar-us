"use client";

import { useCallback, useRef, useState } from "react";

/** Code block with copy button and line numbers for syntax-highlighted code. */
export function CodeBlock({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLElement>(null);

  const handleCopy = useCallback(() => {
    const text = codeRef.current?.textContent ?? "";
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, []);

  // Extract language from className (e.g. "hljs language-typescript" -> "typescript")
  const language = className
    ?.split(" ")
    .find((c) => c.startsWith("language-"))
    ?.replace("language-", "");

  const lineCount = getLineCount(children);

  return (
    <div className="code-block-wrapper group relative">
      {/* Header bar with language label and copy button */}
      <div className="flex items-center justify-between rounded-t-lg border border-b-0 border-[var(--border)] bg-[var(--surface-hover)] px-4 py-2">
        <span className="text-xs font-medium text-[var(--text-muted)]">
          {language || "code"}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <CheckIcon />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <CopyIcon />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code area with line numbers */}
      <div className="overflow-x-auto rounded-b-lg border border-[var(--border)] bg-[var(--surface)]">
        <table className="w-full border-collapse">
          <tbody>
            {Array.from({ length: lineCount }, (_, i) => (
              <tr key={i} className="leading-relaxed">
                <td className="select-none border-r border-[var(--border)] px-3 text-right align-top text-xs leading-relaxed text-[var(--text-muted)]/40">
                  {i + 1}
                </td>
                {i === 0 && (
                  <td rowSpan={lineCount} className="px-4 py-0">
                    <code ref={codeRef} className={className}>
                      {children}
                    </code>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/** Counts the number of lines in React children text content. */
function getLineCount(children: React.ReactNode): number {
  const text = extractText(children);
  if (!text) return 1;
  // Count newlines; the text typically ends with a trailing newline
  const lines = text.split("\n");
  // Remove trailing empty line from trailing newline
  if (lines[lines.length - 1] === "") lines.pop();
  return Math.max(lines.length, 1);
}

/** Recursively extracts text from React children. */
function extractText(node: React.ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (!node) return "";
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (typeof node === "object" && "props" in node) {
    return extractText(
      (node as { props: { children?: React.ReactNode } }).props.children
    );
  }
  return "";
}

/** Copy icon (clipboard). */
function CopyIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

/** Check icon for copied feedback. */
function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
