import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Dot } from 'lucide-react';
import { getDate, getTime } from '../../utils/getTime';

import Icon from '../../shared/components/regular-icon';
import {
  LucideProps,
  History,
  Pen,
  CreditCard,
  Settings,
  MessageCircle,
} from 'lucide-react';
const activities = [
  {
    _icon: History,
    title: 'Tất cả lịch sử',
    to: '/hr/account/activities',
    available: true,
  },
  {
    _icon: Pen,
    title: 'Lịch sử kích hoạt dịch vụ',
    to: '',
    available: false,
  },
  {
    _icon: CreditCard,
    title: 'Lịch sử TP',
    to: '',
    available: false,
  },
  {
    _icon: CreditCard,
    title: 'Lịch sử CP',
    to: '',
    available: false,
  },
  {
    _icon: CreditCard,
    title: 'Lịch sử OP',
    to: '',
    available: false,
  },
  {
    _icon: CreditCard,
    title: 'Lịch sử cập nhật SP',
    to: '',
    available: false,
  },
  {
    _icon: Settings,
    title: 'Lịch sử cập nhật tài khoản',
    to: '',
    available: false,
  },
  {
    _icon: MessageCircle,
    title: 'Bảo cáo CV tìm kiếm',
    to: '',
    available: false,
  },
  {
    _icon: MessageCircle,
    title: 'Báo cáo Scout AI',
    to: '',
    available: false,
  },
];

const Item = ({
  _icon,
  iconSize = 16,
  title,
  onClick = () => {},
  available = false,
  isChosen = false,
}: {
  _icon?: React.FC<LucideProps>;
  iconSize?: number;
  title: string;
  isChosen?: boolean;
  available?: boolean;
  onClick?: () => void;

  // subItems?: { icon?: string; title: string }[];
}) => {
  return (
    <li
      onClick={onClick}
      className={`${isChosen ? 'text-green-500 font-bold' : ''} ${!available ? 'text-slate-400' : ''}  flex items-center space-x-2 cursor-pointer `}
      style={{
        padding: ' 12px 8px',
        margin: 0,
      }}
    >
      {_icon && (
        <div
          style={{
            // width: "32px",
            textAlign: 'center',
            marginRight: '10px',
            marginLeft: '10px',
          }}
        >
          <Icon icon={_icon} size={iconSize} />
        </div>
      )}

      <span>{title}</span>
    </li>
  );
};

function Activities() {
  const [campaigns, setCampaigns] = useState();
  const location = useLocation();
  const pathname = location.pathname;
  const navigation = useNavigate();
  useEffect(() => {
    fetchCampaigns();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCampaigns = async () => {
    try {
      const response = await axios.get(
        'http://34.28.130.105/company/campaign/employer/1',
      );
      setCampaigns(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  return (
    <div className="bg-[#e8edf2]">
      <div className="p-6 text-lg font-medium text-black bg-white">
        Lịch sử hoạt động
      </div>
      <div className="main-content w-full px-5 pt-5 pb-20">
        <div className="flex bg-white">
          <div className="h-full bg-[#f5f8fa] w-[300px] text-black flex flex-col">
            {activities.map((item, index_1) => {
              return (
                <Item
                  _icon={item._icon}
                  title={item.title}
                  key={index_1}
                  isChosen={pathname === item.to}
                  onClick={() => {
                    navigation(item.to);
                  }}
                  available={item.available}

                  // subItems={item.sub_items}
                />
              );
            })}
          </div>
          <div className="p-[1.25rem]">
            <div className="text-black font-medium mb-6">Tất cả lịch sử</div>
            <div className="text-black">
              {campaigns?.map((campaign, index) => (
                <div key={index} className="flex mb-5 items-center">
                  <span className="font-bold">
                    {getDate(campaign.createdAt)}
                  </span>
                  <span>
                    <Dot />
                  </span>
                  <span className="font-bold mr-5 text-sky-400 bg-[#b4e6fb] p-1 rounded-md">
                    {getTime(campaign.createdAt)}
                  </span>
                  <span>{campaign.name}</span>
                </div>
              ))}
              {!campaigns && 'Không có lịch sử hoạt động'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Activities;
