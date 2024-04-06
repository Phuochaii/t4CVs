const RoundedButton = ({
  text,
  textColor = "white",
  backgroundColor = "#364C66",
  icon,
  iconSize = "12px",
  image,
  numberNoti,
  onClick = () => {},
}: {
  text?: string;
  textColor?: string;
  backgroundColor?: string;
  icon?: string;
  iconSize?: string;
  image?: string;
  numberNoti?: number;
  onClick?: () => void;
}) => {
  image;
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
        {icon && (
          <i
            className={icon}
            style={{
              fontSize: iconSize,
              marginRight: text ? "5px" : "0px",
            }}
          ></i>
        )}{" "}
        {text}
        {numberNoti && (
          <div className="bg-red-500 ml-3 px-2 rounded-full">{numberNoti}</div>
        )}
      </div>
    </button>
  );
};

export default RoundedButton;
