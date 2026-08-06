import { useEffect, useRef, useState } from "react";
import styles from "./CopyButton.module.css";
import CheckIcon from "../icons/CheckIcon";
import CopyIcon from "../icons/CopyIcon";
const COPIED_FEEDBACK_MS = 1600;

interface CopyButtonProps {
  handleCopy: () => Promise<boolean>;
}

function CopyButton({ handleCopy }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);
  clearTimeout(timer.current);
  timer.current = setTimeout(() => setCopied(false), COPIED_FEEDBACK_MS);

  const buttonHandleCopy = async () => {
    if (await handleCopy()) {
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), COPIED_FEEDBACK_MS);
    }
  };

  return (
    <button
      onClick={buttonHandleCopy}
      className={`${styles.copyButton} ${copied ? styles.copied : ""}`}
      aria-label={copied ? "Copied" : "Copy code"}
      title={copied ? "Copied" : "Copy code"}
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
    </button>
  );
}

export default CopyButton;
