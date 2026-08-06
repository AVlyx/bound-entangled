import type { ReactNode } from "react";

export interface ParameterProps {
  paramName: string;
  children: ReactNode;
}

function Parameter({ paramName, children }: ParameterProps) {
  return (
    <>
      <dt>{paramName}</dt>
      <dd>{children}</dd>
    </>
  );
}

export default Parameter;
