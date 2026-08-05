import { useRef, useState } from "react";

interface CodeBlockProps {
  /** The snippet, already formatted. Rendered verbatim. */
  code: string;
  /** Language tag shown in the corner. Defaults to Python, the reference implementation. */
  lang?: string;
}

/** Copies through the async clipboard API, falling back to a hidden textarea. */
async function writeToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

type Status = "idle" | "copied" | "failed";

const LABEL: Record<Status, string> = {
  idle: "Copy",
  copied: "Copied",
  failed: "Copy failed",
};

/** A code sample with a copy button in the corner. */
function CodeBlock({ code, lang = "python" }: CodeBlockProps) {
  const [status, setStatus] = useState<Status>("idle");
  const reset = useRef<number | undefined>(undefined);

  const copy = async () => {
    // A denied clipboard says so on the button rather than failing silently.
    setStatus((await writeToClipboard(code)) ? "copied" : "failed");
    window.clearTimeout(reset.current);
    reset.current = window.setTimeout(() => setStatus("idle"), 1500);
  };

  return (
    <div className="code-wrap">
      <pre className="code-block" data-lang={lang}>
        <code>{code}</code>
      </pre>
      <button
        type="button"
        className="code-copy"
        data-status={status}
        onClick={copy}
        aria-label={status === "idle" ? "Copy code" : LABEL[status]}
      >
        {LABEL[status]}
      </button>
    </div>
  );
}

export default CodeBlock;
