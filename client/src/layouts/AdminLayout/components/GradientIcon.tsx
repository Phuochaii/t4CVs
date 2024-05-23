import { LucideProps } from "lucide-react";
import { ElementType } from "react";

interface Props extends LucideProps {
  icon: ElementType;
}

function GradientIcon({ icon: Icon, ...rest }: Props) {
  return <Icon style={{ stroke: "url(#gradient)" }} {...rest} />;
}

export default GradientIcon;
