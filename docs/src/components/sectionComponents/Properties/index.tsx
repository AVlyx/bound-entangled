import type { ReactNode } from "react";
import Section from "../Section";

interface PropertiesProps {
  children: ReactNode;
}

function Properties({ children }: PropertiesProps) {
  return <Section title="Properties">{children}</Section>;
}

export default Properties;
