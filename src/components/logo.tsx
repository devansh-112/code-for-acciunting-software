import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 50"
      width="120"
      height="30"
      {...props}
    >
      <g>
        <rect width="200" height="50" fill="transparent" />
        <path
          d="M25,15 L25,35 M15,25 L35,25"
          stroke="hsl(var(--primary))"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <text
          x="45"
          y="32"
          fontFamily="var(--font-headline), sans-serif"
          fontSize="24"
          fontWeight="bold"
          fill="hsl(var(--sidebar-foreground))"
          className="font-headline"
        >
          LedgerLine
        </text>
      </g>
    </svg>
  );
}
