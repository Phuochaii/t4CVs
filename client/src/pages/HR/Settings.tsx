import React, { useEffect, useState } from 'react';
import Icon from '../../shared/components/regular-icon';
import {
  LucideProps,
  Lock,
  UserRound,
  File,
  Building,
  Share2,
} from 'lucide-react';
import Profile from '../../shared/components/profile';
import Certificate from '../../shared/components/certificate';
import CompanyInfo from '../../shared/components/company-info';
import { useLocation, useParams } from 'react-router-dom';
const Item = ({
  icon,
  iconSize = 16,
  title,
  isChosen = false,
  available = false,
  onClick = () => {},
}: {
  icon?: React.FC<LucideProps>;
  iconSize?: number;
  title: string;
  isChosen?: boolean;
  available?: boolean;
  onClick?: () => void;
}) => {
  return (
    <li
      onClick={onClick}
      className={`flex items-center space-x-2 cursor-pointer text-sm font-semibold hover:text-green-500 active:text-green-500 ${
        isChosen ? 'bg-white text-green-500' : ''
      } ${!available ? 'text-gray-400' : ''}`}
      style={{
        padding: '12px 14px',
        margin: 0,
      }}
    >
      {icon && (
        <div
          style={{
            textAlign: 'center',
            marginRight: '10px',
            marginLeft: '10px',
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
    {
      icon: UserRound,
      title: 'Thông tin cá nhân',
      key: 'Profile',
      component: <Profile />,
      available: true,
    },
    {
      icon: File,
      title: 'Giấy phép kinh doanh',
      key: 'Certificate',
      component: <Certificate />,
      available: true,
    },
    {
      icon: Building,
      title: 'Thông tin công ty',
      key: 'CompanyInfo',
      component: <CompanyInfo />,
      available: true,
    },
    {
      icon: Share2,
      title: 'Kết nối API',
      key: 'APIConnection',
      available: false,
      component: <div>API Connection</div>,
    },
    {
      icon: Lock,
      title: 'Đổi mật khẩu',
      key: 'ChangePassword',
      available: false,
      component: <div>Change Password</div>,
    },
  ];

  const location = useLocation();
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.size !== 0) {
      const activeParam = searchParams.get('active');
      setSelectedKey(activeParam);
    } else {
      setSelectedKey('Profile');
    }
  }, [location.search]);
  const [selectedKey, setSelectedKey] = useState('');
  const selectedComponent = sidebarItems.find(
    (item) => item.key === selectedKey,
  )?.component;

  return (
    <div className="flex flex-row h-fit m-5">
      <div className="w-[22%] bg-gray-100">
        <ul className="space-y-2">
          {sidebarItems.map((item) => (
            <Item
              key={item.key}
              icon={item.icon}
              title={item.title}
              isChosen={selectedKey === item.key}
              available={item.available}
              onClick={() => {
                if (item.available) {
                  setSelectedKey(item.key);
                }
              }}
            />
          ))}
        </ul>
      </div>
      <div className="w-[78%] flex-grow bg-white">{selectedComponent}</div>
    </div>
  );
};

export default Settings;
