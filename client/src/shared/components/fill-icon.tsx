import { LucideProps } from "lucide-react";
function FillIcon({
  icon: Icon,
  size,
  color = "white",
}: {
  icon: React.FC<LucideProps>;
  size?: number;
  color?: string;
}) {
  return <Icon size={size} fill={color} strokeWidth={0} />;
}

export default FillIcon;
