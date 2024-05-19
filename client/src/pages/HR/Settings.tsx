import React, { useState } from "react";
import Icon from "../../shared/components/regular-icon";
import {
  LucideProps,
  LayoutGrid,
  Gem,
  Gift,
  Bot,
} from "lucide-react";
import Profile from "../../shared/components/profile";
import Certificate from "../../shared/components/certificate";
import CompanyInfo from "../../shared/components/company-info";
const Item = ({
  icon,
  iconSize = 16,
  title,
  isChosen = false,
  onClick = () => {},
}: {
  icon?: React.FC<LucideProps>;
  iconSize?: number;
  title: string;
  isChosen?: boolean;
  onClick?: () => void;
}) => {
  return (
    <li
      onClick={onClick}
      className={`flex items-center space-x-2 cursor-pointer hover:text-green-500 active:text-green-500 ${
        isChosen ? "bg-white text-green-500" : ""
      }`}
      style={{
        padding: "12px 14px",
        margin: 0,
      }}
    >
      {icon && (
        <div
          style={{
            textAlign: "center",
            marginRight: "10px",
            marginLeft: "10px",
          }}
        >
          <Icon icon={icon} size={iconSize} />
        </div>
      )}

      <span>{title}</span>
    </li>
  );
};

const Settings = () => {
  const sidebarItems = [
    { icon: LayoutGrid, title: "Đổi mật khẩu", key: "ChangePassword", component: <div>Change Password</div> },
    { icon: Gem, title: "Thông tin cá nhân", key: "Profile", component: <Profile /> },
    { icon: Gift, title: "Giấy phép kinh doanh", key: "Certificate", component: <Certificate/> },
    { icon: Bot, title: "Thông tin công ty", key: "CompanyInfo", component: <CompanyInfo/> },
    { icon: Bot, title: "Kết nối API", key: "APIConnection", component: <div>API Connection</div> },
  ];
  const [selectedKey, setSelectedKey] = useState('ChangePassword');
  const selectedComponent = sidebarItems.find(item => item.key === selectedKey)?.component;
  return (
    <div className="w-[105%] flex flex-row h-fit m-5">
      <div className="w-1/5 bg-gray-100">
       
          <ul className="space-y-2">
          {sidebarItems.map((item) => (
            <Item
              key={item.key}
              icon={item.icon}
              title={item.title}
              isChosen={selectedKey === item.key}
              onClick={() => setSelectedKey(item.key)}
            />
          ))}
        </ul>
   
      </div>
      <div className="w-4/5 bg-white">
         {selectedComponent}
      </div>
    </div>
  );
};

export default Settings;
