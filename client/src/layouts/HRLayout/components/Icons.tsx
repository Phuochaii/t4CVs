interface IconProps {
  fill?: string;
  stroke?: string;
  size?: string;
}

export const QuestionMarkIcon = ({ fill, stroke, size }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || '16'}
      height={size || '16'}
      viewBox="0 0 24 24"
      fill={fill || 'transparent'}
      stroke={stroke || 'black'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* <circle cx="12" cy="12" r="10" /> */}
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <path d="M12 17h.01" />
    </svg>
  );
};

export const Briefcase = ({ fill, stroke, size }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || '16'}
      height={size || '16'}
      viewBox="0 0 24 24"
      fill={fill || 'transparent'}
      stroke={stroke || 'black'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-briefcase-business"
    >
      <rect width="20" height="14" x="2" y="6" rx="2" />
      <path d="M12 12h.01" />
      <path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      <path d="M22 13a18.15 18.15 0 0 1-20 0" />
    </svg>
  );
};
