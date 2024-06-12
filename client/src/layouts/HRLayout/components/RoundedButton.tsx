import { LucideProps } from 'lucide-react';
import FillIcon from '../../../shared/components/fill-icon';
import RegularIcon from '../../../shared/components/regular-icon';

const RoundedButton = ({
  text,
  textColor = 'white',
  backgroundColor = '#364C66',
  icon,
  iconSize = 18,
  iconColor,
  iconStrokeWidth,
  image,
  numberNoti,
  backgroundImage,
  isFillIcon = true,
  border,
  onClick = () => {},
}: {
  text?: string;
  textColor?: string;
  backgroundColor?: string;
  icon?: React.FC<LucideProps>;
  iconSize?: number;
  iconColor?: string;
  iconStrokeWidth?: number;
  image?: string;
  numberNoti?: number;
  backgroundImage?: string;
  isFillIcon?: boolean;
  border?: string;
  onClick?: () => void;
}) => {
  return (
    <button
      className="hover:opacity-80 transition-all duration-200"
      style={{
        padding: image ? '3px 8px' : '5px 15px',
        margin: '0 7px',
        borderRadius: '20px',
        backgroundColor: backgroundColor,
        backgroundImage: backgroundImage,
        color: textColor,
        border: border || 'none',
        cursor: 'pointer',
        outline: 'none',
        fontWeight: '500',
      }}
      onClick={onClick}
    >
      <div className="flex items-center">
        {image && (
          <img
            src={image}
            className="rounded-full"
            style={{ width: '25px', height: '25px', marginRight: '10px' }}
            alt="Avatar"
          />
        )}{' '}
        {icon &&
          (isFillIcon ? (
            <FillIcon
              icon={icon}
              color={iconColor}
              size={iconSize}
              strokeWidth={iconStrokeWidth}
            />
          ) : (
            <RegularIcon
              icon={icon}
              color={iconColor}
              size={iconSize}
              strokeWidth={iconStrokeWidth}
            />
          ))}
        {text && <span className="ml-2">{text}</span>}
        {numberNoti && (
          <div className="bg-red-500 ml-3 px-2 rounded-full">{numberNoti}</div>
        )}
      </div>
    </button>
  );
};

export default RoundedButton;
