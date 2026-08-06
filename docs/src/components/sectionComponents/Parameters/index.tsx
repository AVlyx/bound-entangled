import { Children, isValidElement, type ReactElement } from "react";
import Section from "../Section";
import type { ParameterProps } from "./Parameter";

interface ParametersProps {
  children: ReactElement<ParameterProps> | ReactElement<ParameterProps>[];
}

function Parameters({ children }: ParametersProps) {
  return (
    <Section title="Parameters">
      <dl className="doc-dl">
        {Children.map(children, (child) => (isValidElement<ParameterProps>(child) ? child : null))}
      </dl>
    </Section>
  );
}

export default Parameters;
