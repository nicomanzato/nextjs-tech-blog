import type { SVGProps } from "react";

function XIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 10 10" fill="none" aria-hidden="true" {...props}>
      <line x1="9.35355" y1="0.461097" x2="0.353553" y2="9.4611" stroke="currentColor" />
      <line x1="0.353553" y1="0.3536" x2="9.35355" y2="9.3536" stroke="currentColor" />
    </svg>
  );
}

export { XIcon };
