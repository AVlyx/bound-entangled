import styles from "./CodeBlock.module.css";
import { Prism as SynthaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import CopyButton from "@/components/CopyButton";
import { writeToClipboard } from "@/utils/clipboard";

interface CodeBlockProps {
  children: string;
  lang?: string;
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
