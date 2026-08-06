import Section from "../Section";
import CodeBlock from "../CodeBlock";

interface UsageProps {
  children: string;
  lang?: string;
}

/** The "Usage" section: a titled block holding a single copyable code sample. */
function Usage({ children, lang }: UsageProps) {
  return (
    <Section title="Usage">
      <CodeBlock lang={lang}>{children}</CodeBlock>
    </Section>
  );
}

export default Usage;
