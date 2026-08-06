import type { ReactNode } from "react";
import Section from "../Section";

interface ExampleProps {
  /** Defaults to "Try it"; pass e.g. "The state" for states with no free parameters. */
  title?: string;
  children: ReactNode;
}

/** The live-example section: controls (if any) and rendered output in a bordered card. */
function Example({ title = "Try it", children }: ExampleProps) {
  return (
    <Section title={title}>
      <div className="example">{children}</div>
    </Section>
  );
}

export default Example;
