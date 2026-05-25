type ToothIconProps = {
  size?: number;
  className?: string;
};

export function ToothIcon({ size = 18, className }: ToothIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M8.2 3.5C5.8 3.5 4 5.4 4 8.2c0 2.4 1 4.5 1.8 6.4.7 1.7 1.1 3.2 1.4 4.6.2 1.1.8 1.8 1.6 1.8.9 0 1.3-.8 1.7-2.2l.7-2.6c.2-.8.5-1.2.8-1.2s.6.4.8 1.2l.7 2.6c.4 1.4.8 2.2 1.7 2.2.8 0 1.4-.7 1.6-1.8.3-1.4.7-2.9 1.4-4.6.8-1.9 1.8-4 1.8-6.4 0-2.8-1.8-4.7-4.2-4.7-1.3 0-2.4.5-3.1.9-.8.5-1.4.5-2.2 0-.7-.4-1.8-.9-3.1-.9Z" />
    </svg>
  );
}