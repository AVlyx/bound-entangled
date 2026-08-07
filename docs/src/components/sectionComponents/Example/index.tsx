import type { ReactNode } from "react";
import CopyButtonToLang from "@/components/CopyButtonToLang";
import Section from "../Section";

interface ExampleProps {
  /** Defaults to "Try it"; pass e.g. "The state" for states with no free parameters. */
  title?: string;
  /**
   * The state the example renders, offered for copying in the card's top-right corner.
   * Left out when the current parameters put the state outside its valid domain and
   * there is nothing to copy.
   */
  copyValue?: Cell[][] | MatrixLikeObject;
  children: ReactNode;
}

/** The live-example section: controls (if any) and rendered output in a bordered card. */
function Example({ title = "Try it", copyValue, children }: ExampleProps) {
  return (
    <Section title={title}>
      <div className="example">
        {copyValue !== undefined && (
          <div className="example-toolbar">
            <CopyButtonToLang value={copyValue} />
          </div>
        )}
        {children}
      </div>
    </Section>
  );
}

export default Example;
