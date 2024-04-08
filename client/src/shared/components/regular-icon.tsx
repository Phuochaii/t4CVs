import { LucideProps } from "lucide-react";
function RegularIcon({
  icon: Icon,
  size,
  color = "white",
}: {
  icon: React.FC<LucideProps>;
  size?: number;
  color?: string;
}) {
  return <Icon size={size} strokeWidth={1.75} color={color} />;
}

export default RegularIcon;
