import { useEffect, useRef, useState } from "react";
import styles from "./CodeBlock.module.css";
import { Prism as SynthaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import CheckIcon from "../icons/CheckIcon";
import CopyIcon from "../icons/CopyIcon";

interface CodeBlockProps {
  children: string;
  lang?: string;
}

/** How long the button stays in its "copied" state, in milliseconds. */
const COPIED_FEEDBACK_MS = 1600;

async function writeToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

/** A code sample with a copy button in the corner. */
function CodeBlock({ children, lang = "python" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // The timeout outlives a quick unmount, so clear it on the way out.
  useEffect(() => () => clearTimeout(timer.current), []);

  const handleCopy = async () => {
    if (!(await writeToClipboard(children))) return;

    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), COPIED_FEEDBACK_MS);
  };

  return (
    <div className={styles.codeContainer}>
      <button
        onClick={handleCopy}
        className={`${styles.copyButton} ${copied ? styles.copied : ""}`}
        aria-label={copied ? "Copied" : "Copy code"}
        title={copied ? "Copied" : "Copy code"}
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
      </button>

      <SynthaxHighlighter language={lang} style={oneDark} wrapLongLines={true} wrapLines={true}>
        {children}
      </SynthaxHighlighter>
    </div>
  );
}

export default CodeBlock;
