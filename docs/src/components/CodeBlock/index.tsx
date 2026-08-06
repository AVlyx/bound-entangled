import { useRef, useState } from "react";
import styles from "./CodeBlock.module.css";
import { Prism as SynthaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import CopyButton from "../CopyButton";

interface CodeBlockProps {
  children: string;
  lang?: string;
}

async function writeToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

function CodeBlock({ children, lang = "python" }: CodeBlockProps) {
  return (
    <div className={styles.codeContainer}>
      <CopyButton handleCopy={() => writeToClipboard(children)} />
      <SynthaxHighlighter language={lang} style={oneDark} wrapLongLines={true} wrapLines={true}>
        {children}
      </SynthaxHighlighter>
    </div>
  );
}

export default CodeBlock;
