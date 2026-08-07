import { useEffect, useRef, useState } from "react";
import { MATRIX_LANGUAGES, matToLanguageString, type MatrixLanguage } from "@/utils/matToString";
import { writeToClipboard } from "@/utils/clipboard";
import CheckIcon from "../icons/CheckIcon";
import CopyIcon from "../icons/CopyIcon";
import styles from "./CopyButtonToLang.module.css";

const COPIED_FEEDBACK_MS = 1600;

interface CopyButtonToLangProps {
  /** The matrix to copy, at full precision — not the rounded values on screen. */
  value: Cell[][] | MatrixLikeObject;
}

/**
 * Copy button for a rendered matrix, offering one entry per language in
 * `MATRIX_LANGUAGES`. The menu opens on hover, which is enough for a pointer;
 * it also opens on click and on keyboard focus, since hover alone would leave
 * the languages unreachable on touch screens and from the keyboard.
 */
function CopyButtonToLang({ value }: CopyButtonToLangProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState<MatrixLanguage | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copyAs = async (language: MatrixLanguage) => {
    if (!(await writeToClipboard(matToLanguageString(value, language)))) return;
    setCopied(language);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setCopied(null);
      setOpen(false);
    }, COPIED_FEEDBACK_MS);
  };

  return (
    <div
      className={styles.wrapper}
      onPointerEnter={() => setOpen(true)}
      onPointerLeave={() => setOpen(false)}
      // Closes once focus leaves the button and the menu entirely, but not while
      // it merely moves between them (`relatedTarget` is the element gaining focus).
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") setOpen(false);
      }}
    >
      <button
        type="button"
        className={`${styles.trigger} ${copied ? styles.copied : ""}`}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={copied ? "Copied" : "Copy matrix as…"}
        title={copied ? "Copied" : "Copy matrix as…"}
        onClick={() => setOpen((wasOpen) => !wasOpen)}
        onFocus={() => setOpen(true)}
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
      </button>

      {/* Kept mounted while closed so the button and the menu stay one focus
          scope — unmounting it would drop focus mid-Tab and close the menu. */}
      <div className={`${styles.menu} ${open ? styles.menuOpen : ""}`} role="menu">
        {MATRIX_LANGUAGES.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            role="menuitem"
            tabIndex={open ? 0 : -1}
            className={styles.item}
            onClick={() => void copyAs(id)}
          >
            <span>{label}</span>
            {copied === id && <CheckIcon />}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CopyButtonToLang;
