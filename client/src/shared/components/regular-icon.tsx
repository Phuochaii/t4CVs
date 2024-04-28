import { LucideProps } from "lucide-react";
function RegularIcon({
  icon: Icon,
  size,
  color,
  strokeWidth = 1.75,
}: {
  icon: React.FC<LucideProps>;
  size?: number;
  color?: string;
  strokeWidth?: number;
}) {
  return <Icon size={size} strokeWidth={strokeWidth} color={color} />;
}

export default RegularIcon;

