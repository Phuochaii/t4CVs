import { LucideProps } from 'lucide-react';
function FillIcon({
  icon: Icon,
  size,
  color = 'white',
  strokeWidth = 0,
}: {
  icon: React.FC<LucideProps>;
  size?: number;
  color?: string;
  strokeWidth?: number;
}) {
  return <Icon size={size} fill={color} strokeWidth={strokeWidth} />;
}

export default FillIcon;
