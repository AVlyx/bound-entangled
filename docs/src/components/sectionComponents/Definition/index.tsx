import type { ReactNode } from "react";
import Section from "../Section";

interface DefinitionProps {
  children: ReactNode;
}

function Definition({ children }: DefinitionProps) {
  return <Section title="Definition">{children}</Section>;
}

export default Definition;
