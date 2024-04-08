import { LucideProps } from "lucide-react";
import Icon from "../../../shared/components/fill-icon";

const RoundedButton = ({
  text,
  textColor = "white",
  backgroundColor = "#364C66",
  icon,
  iconSize = 18,
  image,
  numberNoti,
  onClick = () => {},
}: {
  text?: string;
  textColor?: string;
  backgroundColor?: string;
  icon?: React.FC<LucideProps>;
  iconSize?: number;
  image?: string;
  numberNoti?: number;
  onClick?: () => void;
}) => {
  return (
    <button
      style={{
        padding: image ? "3px 8px" : "5px 15px",
        margin: "0 7px",
        borderRadius: "20px",
        backgroundColor: backgroundColor,
        color: textColor,
        border: "none",
        cursor: "pointer",
        outline: "none",
        fontWeight: "500",
      }}
      onClick={onClick}
    >
      <div className="flex items-center">
        {image && (
          <img
            src={image}
            className="rounded-full"
            style={{ width: "25px", marginRight: "10px" }}
            alt="Avatar"
          />
        )}{" "}
        {icon && <Icon icon={icon} size={iconSize} />}
        {text && <span className="ml-2">{text}</span>}
        {numberNoti && (
          <div className="bg-red-500 ml-3 px-2 rounded-full">{numberNoti}</div>
        )}
      </div>
    </button>
  );
};

export default RoundedButton;
