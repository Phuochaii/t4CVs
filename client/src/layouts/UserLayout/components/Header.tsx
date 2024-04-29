import "../../../App.css";
import React from "react";
import * as UserModule from "../../../modules/user-module";
function Header() {
  const [displayNoti, setDisplayNoti] = React.useState(false);
  const [notifications, setNotifications] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const userId = "1";
  const fetchNotification = ({
    id,
    limit = 3,
  }: {
    id: string;
    limit?: number;
  }) => {
    UserModule.getNotification({ userId: id, limit: limit }).then((res) => {
      console.log(res);

      setNotifications(res.data);
      setTotal(res.pagination.total);
    });
  };
  React.useEffect(() => {
    fetchNotification({ id: userId });
  }, []);

  return (
    <header className="menu-top bg-white text-black">
      <div className="container px-8 flex flex-row justify-between items-center">
        <div className="main flex flex-row items-center gap-5">
          <div className="logo w-52">
            <img src="../../../images/topcv-logo.png" alt="" />
          </div>
          <nav className="nav-menu">
            <ul className="flex flex-row">
              <li>
                <a
                  href="#"
                  className="font-semibold text-base px-6 py-8 py-auto cursor-pointer hover:text-green-500"
                >
                  Hồ sơ & CV
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="font-semibold text-base px-6 py-8 py-auto cursor-pointer hover:text-green-500"
                >
                  Công ty
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="font-semibold text-base px-6 py-8 py-auto cursor-pointer hover:text-green-500"
                >
                  Phát triển sự nghiệp & Công cụ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="font-semibold text-base px-6 py-8 py-auto cursor-pointer hover:text-green-500"
                >
                  Blog
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="user-actions justify-end flex flex-row gap-3">
          {/* NOTIFY BUTTON */}
          <div className="relative">
            <button
              id="dropdownDividerButton"
              data-dropdown-toggle="dropdownDivider"
              className="  text-center inline-flex items-center bg-transparent"
              type="button"
              onClick={() => setDisplayNoti(!displayNoti)}
              // onBlur={() => setDisplayNoti(!displayNoti)}
            >
              <span className="btn-notice bg-green-100 p-3 rounded-full">
                <svg
                  fill="rgb(22 163 74)"
                  className="w-6 h-6"
                  viewBox="0 0 36 36"
                  version="1.1"
                  preserveAspectRatio="xMidYMid meet"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className="clr-i-solid clr-i-solid-path-1"
                    d="M32.85,28.13l-.34-.3A14.37,14.37,0,0,1,30,24.9a12.63,12.63,0,0,1-1.35-4.81V15.15A10.81,10.81,0,0,0,19.21,4.4V3.11a1.33,1.33,0,1,0-2.67,0V4.42A10.81,10.81,0,0,0,7.21,15.15v4.94A12.63,12.63,0,0,1,5.86,24.9a14.4,14.4,0,0,1-2.47,2.93l-.34.3v2.82H32.85Z"
                  ></path>
                  <path
                    className="clr-i-solid clr-i-solid-path-2"
                    d="M15.32,32a2.65,2.65,0,0,0,5.25,0Z"
                  ></path>
                </svg>
              </span>
            </button>

            {/* <!-- Dropdown menu --> */}
            <div
              id="dropdownDivider"
              className={`max-h-[320px] overflow-y-scroll dropdown ${displayNoti ? "hidden" : ""}  z-10 text-base  absolute right-0 top-full bg-white divide-y divide-gray-100 rounded-lg shadow w-80 dark:bg-gray-700 dark:divide-gray-600`}
            >
              <div
                className="py-2 border-b-2 border-l-stone-900"
                onClick={() => setDisplayNoti(true)}
              >
                <span className="block px-4 text-lg text-gray-700 font-bold">
                  Thông báo
                </span>
              </div>
              <ul
                className="pb-2  text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDividerButton"
              >
                {notifications && notifications.length == 0 ? (
                  <p>Không có thông báo</p>
                ) : (
                  <>
                    {notifications.map((item: any, index: number) => (
                      <li
                        key={index}
                        className="px-4 py-2 border-y-gray-200 border"
                      >
                        <a
                          href={item.link}
                          className="font-semibold cursor-pointer hover:text-green-500"
                        >
                          {item.content}
                        </a>
                        <p className="text-sm text-slate-500 text-right">
                          {item.createdAt.split("T")[0]}
                        </p>
                      </li>
                    ))}
                  </>
                )}
                {total > notifications.length ? (
                  <button
                    className="text-green-500 hover:underline font-semibold w-full mt-2"
                    onClick={() =>
                      fetchNotification({ id: userId, limit: total })
                    }
                  >
                    Xem tất cả thông báo
                  </button>
                ) : (
                  <button
                    className="text-green-500 hover:underline font-semibold w-full mt-2"
                    onClick={() => fetchNotification({ id: userId })}
                  >
                    Ẩn bớt
                  </button>
                )}
              </ul>
            </div>
          </div>

          <span className="btn-message bg-green-100 p-2 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="rgb(22 163 74)"
              className="w-8 h-8"
            >
              <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 0 0-1.032-.211 50.89 50.89 0 0 0-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 0 0 2.433 3.984L7.28 21.53A.75.75 0 0 1 6 21v-4.03a48.527 48.527 0 0 1-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979Z" />
              <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 0 0 1.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0 0 15.75 7.5Z" />
            </svg>
          </span>
          <span className="btn-user-info p-2 bg-slate-100 rounded-full items-center flex flex-row gap-2 group/user">
            <img
              src="../../../images/user-logo.png"
              className="w-8 h-8"
              alt=""
            />
            <span className="user-name font-bold">Phạm Trường Khoa</span>
            <span className="user-action transition ease-in-out group-hover/user:rotate-180">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="rgb(22 163 74)"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </span>
        </div>
      </div>
    </header>
  );
}

export default Header;
