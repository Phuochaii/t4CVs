import * as React from 'react';
import RoundedButton from './RoundedButton';
import {
  Bookmark,
  Pencil,
  MessageCircle,
  Bell,
  ShoppingCart,
  ChevronDown,
  Menu,
  LineChart,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import * as HRModule from '../../../modules/hr-module';
import { useAuth0 } from '@auth0/auth0-react';
import { useProfileContext } from '../../../shared/services/authen/domain/context';

const list_btn1 = [
  {
    name: 'HR Insider',
    link: '',
    icon: Bookmark,
  },
  {
    name: 'Đăng tin',
    link: '/hr/post-compaign',
    icon: Pencil,
  },
  {
    name: 'Tìm CV',
    link: '',
    icon: Pencil,
  },
  {
    name: 'Connect',
    link: '',
    icon: MessageCircle,
  },
];

const list_btn2 = [
  {
    name: 'Giỏ hàng',
    link: '',
    icon: ShoppingCart,
    iconSize: 20,
    // numberNoti: 1,
  },
];
const notifyButton = {
  name: '',
  link: '',
  icon: Bell,
  iconSize: 20,
};
const accountButton = {
  name: '',
  link: '',
  icon: ChevronDown,
  iconSize: 20,
  image:
    'https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1114445501.jpg',
};

function Header({ collapedSidebar }: { collapedSidebar: () => void }) {
  const navigation = useNavigate();
  const { logout } = useAuth0();
  const { profile, token} = useProfileContext();
  const [displayNoti, setDisplayNoti] = React.useState(false);
  const [displayAccountTab, setDisplayAccountTab] = React.useState(false);
  const [notifications, setNotifications] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const fetchNotification = ({ limit = 3 }: { limit?: number }) => {
    HRModule.getNotification({ token: token!, limit: limit }).then((res) => {
      console.log(res);
      setNotifications(res.data);
      setTotal(res.pagination.total);
    });
  };
  React.useEffect(() => {
    fetchNotification({});
  },[])
  const notiLength = notifications.filter(
    (item: any) => item.status === 0,
  ).length;
  return (
    <div
      className="text-white "
      id="hr-header"
      style={{ padding: '16px 20px', backgroundColor: '#212F3F' }}
    >
      <div className="flex items-center">
        <div className="flex items-center flex-grow">
          <Menu
            size={18}
            className="ml-1"
            strokeWidth={1.65}
            onClick={collapedSidebar}
          />

          <div
            style={{
              marginLeft: '23px',
              marginRight: '20px',
              marginTop: '4px',
            }}
            onClick={() => navigation('/hr/news')}
          >
            <img
              src="https://tuyendung.topcv.vn/app/_nuxt/img/logo_topcv_dark.ee0b56e.png"
              style={{ width: '56px' }}
              alt="logo"
            />
          </div>
        </div>
        <div className="flex items-center">
          <RoundedButton
            icon={LineChart}
            isFillIcon={false}
            iconColor="#00B14F"
            iconSize={20}
            iconStrokeWidth={2.2}
            border="2px solid green"
            text="Tải báo cáo thị trường 2023-2024"
            backgroundImage="linear-gradient(90deg, #213142 .62%, #0a9c4b 99.38%)"
          />
          {list_btn1.map((btn, index) => (
            <RoundedButton
              key={index}
              text={btn.name}
              icon={btn.icon}
              onClick={() => {
                navigation(btn.link);
              }}
            />
          ))}
          <li className="relative list-none">
            <a
              className="text-center inline-flex items-center bg-transparent"
              onClick={() => setDisplayNoti(!displayNoti)}
            >
              <RoundedButton
                text={notifyButton.name}
                icon={notifyButton.icon}
                numberNoti={notiLength > 0 ? notiLength : undefined}
                onClick={() => {
                  navigation(notifyButton.link);
                }}
              />
            </a>
            {/* <!-- Dropdown menu --> */}
            {displayNoti ? (
              <div className="pt-3 absolute top-8 right-0 z-50">
                <ul
                  className="max-h-[320px] overflow-y-scroll dropdown  w-96 z-50font-semibold text-base bg-white border border-slate-100 rounded-lg py-3 flex flex-col gap-3 shadow-lg"
                  aria-labelledby="dropdownDividerButton"
                >
                  <div className="py-2 border-b-2 border-l-stone-900">
                    <span className="block px-4 text-lg text-gray-700 font-bold">
                      Thông báo
                    </span>
                  </div>
                  {notifications && notifications.length == 0 ? (
                    <p>Không có thông báo</p>
                  ) : (
                    <>
                      {notifications.map((item: any, index: number) => (
                        <li
                          onClick={(e) => {
                            e.preventDefault();
                            HRModule.updateStatusNotification({
                              token:token!,
                              notificationId: item.id,
                            });
                            fetchNotification({});
                            // window.open(item.link, "_blank", "noopener");
                          }}
                          key={index}
                          className={`px-4 py-2 m-0 border-b-gray-200 border ${!item.status ? 'text-black font-medium' : "text-gray-500"} hover:text-green-500`}
                        >
                          <span className="cursor-pointer  hover:text-green-500">
                            {item.content}
                          </span>
                          <p className="text-sm text-slate-500 text-right">
                            {item.createdAt.split('T')[0]}
                          </p>
                        </li>
                      ))}
                    </>
                  )}
                  {total > notifications.length ? (
                    <button
                      className="text-green-500 hover:underline font-semibold w-full mt-2"
                      onClick={() => {
                        fetchNotification({ limit: total });
                      }}
                    >
                      Xem tất cả thông báo
                    </button>
                  ) : notifications.length > 3 ? (
                    <button
                      className="text-green-500 hover:underline font-semibold w-full mt-2"
                      onClick={() => fetchNotification({})}
                    >
                      Ẩn bớt
                    </button>
                  ) : (
                    <></>
                  )}
                </ul>
              </div>
            ) : (
              <></>
            )}
          </li>
          {list_btn2.map((btn, index) => (
            <RoundedButton
              key={index}
              text={btn.name}
              icon={btn.icon}
              iconSize={btn.iconSize}
              numberNoti={btn.numberNoti}
              onClick={() => {
                navigation(btn.link);
              }}
            />
          ))}
          <li className="relative list-none">
            <a
              className="text-center inline-flex items-center bg-transparent"
              onClick={() => setDisplayAccountTab(!displayAccountTab)}
            >
              <RoundedButton
                text={accountButton.name}
                icon={accountButton.icon}
                image={profile?.picture || accountButton.image}
                iconSize={accountButton.iconSize}
                onClick={() => {
                  navigation(accountButton.link);
                }}
              />
            </a>
            {/* <!-- Dropdown menu --> */}
            {displayAccountTab ? (
              <div className="pt-3 absolute top-8 right-0 z-50">
                <ul
                  className="max-h-[320px] overflow-y-scroll dropdown  hover:text-green-500 w-56 z-50font-semibold text-base bg-white border border-slate-100 rounded-lg py-2 flex flex-col gap-3 shadow-lg"
                  aria-labelledby="dropdownDividerButton"
                >
                  <li
                    className={'px-4 py-2 m-0 border-b-gray-200 border'}
                    onClick={() => {
                      // logout({
                      //   clientId: AUTH0_CLIENT_ID,
                      //   logoutParams: { returnTo: `${window.location.origin}${Roles.HR.loginUrl}` },
                      // })
                      logout({
                        openUrl: false,
                      });
                      navigation('/hr');
                    }}
                  >
                    <span className="cursor-pointer text-black hover:text-green-500">
                      Đăng xuất
                    </span>
                  </li>
                </ul>
              </div>
            ) : (
              <></>
            )}
          </li>
        </div>
      </div>
    </div>
  );
}

export default Header;
