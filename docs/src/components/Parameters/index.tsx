import { Children, isValidElement, type ReactElement } from "react";
import type { ParameterProps } from "./Parameter";

interface ParametersProps {
  children: ReactElement<ParameterProps> | ReactElement<ParameterProps>[];
}

function Parameters({ children }: ParametersProps) {
  return (
    <div className="doc-section">
      <h2>Parameters</h2>
      <dl className="doc-dl">
        {Children.map(children, (child) => (isValidElement<ParameterProps>(child) ? child : null))}
      </dl>
    </div>
  );
}

export default Parameters;
