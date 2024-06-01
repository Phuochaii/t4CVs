import { useEffect, useState } from 'react';
import '../../../App.css';
import React from 'react';
import * as UserModule from '../../../modules/user-module';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { withRoleCheck } from '../../../shared/services/authen/domain/withRoleCheck';
import { Roles, useProfileContext } from '../../../shared/services/authen/domain/context';

function Header() {
  const navigation = useNavigate();
  const {isAuthenticated, user, logout, isLoading} = useAuth0();
  const [displayNoti, setDisplayNoti] = React.useState(false);
  const [notifications, setNotifications] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const userId = user?.sub || "";
  const fetchNotification = ({
    id,
    limit = 3,
  }: {
    id: string;
    limit?: number;
  }) => {
    UserModule.getNotification({ userId: id, limit: limit }).then(
      (res) => {
        console.log(res);

        setNotifications(res.data);
        setTotal(res.pagination.total);
      }
    );
  };
  React.useEffect(() => {
    if (userId != "") fetchNotification({ id: userId });
  }, []);


  const [isJobsHovered, setIsJobsHovered] = useState(false);
  const [isCVsHovered, setIsCVsHovered] = useState(false);
  const [isCompaniesHovered, setIsCompaniesHovered] = useState(false);
  const [isToolsHovered, setIsToolsHovered] = useState(false);
  const [isSupportsHovered, setIsSupportsHovered] = useState(false);
  const [isAccountHovered, setIsAccountHovered] = useState(false);

  const HeaderProfileSection = withRoleCheck(Roles.USER, () => {
  const {profile} = useProfileContext();
    
    return (
    <>
      <li
        className="relative flex flex-col justify-center list-none"
        onMouseEnter={() => setDisplayNoti(true)}
        onMouseLeave={() => setDisplayNoti(false)}
      >
        <a className="inline-flex items-center text-center bg-transparent">
          <span className="p-3 bg-green-100 rounded-full btn-notice">
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
        </a>
        {/* <!-- Dropdown menu --> */}
        {displayNoti ? (
          <ul
            className="max-h-[320px] overflow-y-scroll dropdown absolute w-96 z-50 top-full right-0 font-semibold text-base bg-white border border-slate-100 rounded-lg py-3 flex flex-col gap-3 shadow-lg"
            aria-labelledby="dropdownDividerButton"
          >
            <div
              className="py-2 border-b-2 border-l-stone-900"
              onClick={() => setDisplayNoti(true)}
            >
              <span className="block px-4 text-lg font-bold text-gray-700">
                Thông báo
              </span>
            </div>
            {notifications && notifications.length == 0 ? (
              <p className="px-3">Không có thông báo</p>
            ) : (
              <>
                {notifications.map((item: any, index: number) => (
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      UserModule.updateStatusNotification({
                        userId: userId,
                        notificationId: item.id,
                      });
                      fetchNotification({ id: userId });
                      window.open(item.link, "_blank", "noopener");
                    }}
                    key={index}
                    className="px-4 py-2 border border-b-gray-200 hover:text-green-500"
                  >
                    <span className="font-semibold cursor-pointer hover:text-green-500">
                      {item.content}
                    </span>
                    <p className="mt-2 text-sm text-right text-slate-500">
                      {item.createdAt.split("T")[0] + "  "}
                      {item.status && (
                        <span className="text-green-500">✓</span>
                      )}
                    </p>
                  </a>
                ))}
              </>
            )}
            {total > notifications.length ? (
              <button
                className="w-full mt-2 font-semibold text-green-500 hover:underline"
                onClick={() =>
                  fetchNotification({
                    id: userId,
                    limit: total,
                  })
                }
              >
                Xem tất cả thông báo
              </button>
            ) : notifications.length > 3 ? (
              <button
                className="w-full mt-2 font-semibold text-green-500 hover:underline"
                onClick={() => fetchNotification({ id: userId })}
              >
                Ẩn bớt
              </button>
            ) : (
              <></>
            )}
          </ul>
        ) : (
          <></>
        )}
      </li>

      <span className="p-2 my-6 bg-green-100 rounded-full btn-message">
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

      <li
        className="relative list-none"
        onMouseEnter={() => setIsAccountHovered(true)}
        onMouseLeave={() => setIsAccountHovered(false)}
      >
        <a
          href="#"
          className="px-6 py-8 text-base font-semibold hover:text-green-500"
        >
          <span className="flex flex-row items-center gap-2 p-2 rounded-full cursor-pointer btn-user-info bg-slate-100 group/user">
          <img 
            className="w-8 h-8 rounded-full" 
            src={profile?.picture || '../../../images/user-logo.png'}
            alt="avatar" 
          />
            <span className="font-bold user-name">
              {profile?.name}
            </span>
            <span className="transition ease-in-out user-action group-hover/user:rotate-180">
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
        </a>
        {isAccountHovered ? (
          <ul className="absolute right-0 z-50 flex flex-col gap-3 p-3 overflow-y-scroll text-base font-semibold bg-white border rounded-lg shadow-lg sub-menu h-80 top-full border-slate-100">
            <li>
              <hr />
            </li>
            <li
              onClick={() => {
                navigation("/user-information");
              }}
              className="flex flex-row gap-3 p-4 rounded cursor-pointer text-slate-800 bg-slate-100 w-96 hover:text-green-600 hover:bg-slate-200"
            >
              <svg
                className="w-6 h-6"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.5 14.5L10.5 10.5M6.5 12.5C3.18629 12.5 0.5 9.81371 0.5 6.5C0.5 3.18629 3.18629 0.5 6.5 0.5C9.81371 0.5 12.5 3.18629 12.5 6.5C12.5 9.81371 9.81371 12.5 6.5 12.5Z"
                  stroke="rgb(34 197 94)"
                />
              </svg>
              Cài đặt thông tin cá nhân
            </li>

            <li className="flex flex-row gap-3 p-4 rounded cursor-pointer text-slate-800 bg-slate-100 w-96 hover:text-green-600 hover:bg-slate-200">
              <svg
                className="w-6 h-6"
                fill="rgb(34 197 94)"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8,8 L4,8 L4,13 L11,13 L13,13 L20,13 L20,8 L16,8 L8,8 Z M8,6 L8,5 C8,3.8954305 8.8954305,3 10,3 L14,3 C15.1045695,3 16,3.8954305 16,5 L16,6 L20,6 C21.1045695,6 22,6.8954305 22,8 L22,19 C22,20.1045695 21.1045695,21 20,21 L4,21 C2.8954305,21 2,20.1045695 2,19 L2,8 C2,6.8954305 2.8954305,6 4,6 L8,6 Z M11,15 L4,15 L4,19 L20,19 L20,15 L13,15 L13,16 L11,16 L11,15 Z M14,6 L14,5 L10,5 L10,6 L14,6 Z"
                />
              </svg>
              Nâng cấp tài khoản VIP
            </li>
            <li className="flex flex-row gap-3 p-4 rounded cursor-pointer text-slate-800 bg-slate-100 w-96 hover:text-green-600 hover:bg-slate-200">
              <svg
                className="w-7 h-7"
                fill="rgb(34 197 94)"
                viewBox="-2 -4 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M3.636 7.208L10 13.572l6.364-6.364a3 3 0 1 0-4.243-4.243L10 5.086l-2.121-2.12a3 3 0 0 0-4.243 4.242zM9.293 1.55l.707.707.707-.707a5 5 0 1 1 7.071 7.071l-7.07 7.071a1 1 0 0 1-1.415 0l-7.071-7.07a5 5 0 1 1 7.07-7.071z" />
              </svg>
              Kích hoạt quà tặng
            </li>

            <li className="flex flex-row gap-3 p-4 rounded cursor-pointer text-slate-800 bg-slate-100 w-96 hover:text-green-600 hover:bg-slate-200">
              <svg
                className="w-5 h-5"
                fill="rgb(34 197 94)"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1200 1200"
              >
                <path
                  id="path3015"
                  inkscape:connector-curvature="0"
                  d="M0,0v775.711V1200h424.289
                H1200V752.556V424.289l-196.875,196.875v381.961H621.164H196.875V578.836V196.875h381.961L775.711,0H0z M1030.008,15.161
                l-434.18,434.25L440.7,294.283L281.618,453.438L595.821,767.57l159.082-159.082l434.18-434.25L1030.001,15.157L1030.008,15.161z"
                />
              </svg>
              Nhà tuyển dụng xem hồ sơ
            </li>
            <li className="flex flex-row gap-3 p-4 rounded cursor-pointer text-slate-800 bg-slate-100 w-96 hover:text-green-600 hover:bg-slate-200">
              <svg
                className="w-6 h-6"
                fill="rgb(34 197 94)"
                viewBox="0 -64 640 640"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M255.03 261.65c6.25 6.25 16.38 6.25 22.63 0l11.31-11.31c6.25-6.25 6.25-16.38 0-22.63L253.25 192l35.71-35.72c6.25-6.25 6.25-16.38 0-22.63l-11.31-11.31c-6.25-6.25-16.38-6.25-22.63 0l-58.34 58.34c-6.25 6.25-6.25 16.38 0 22.63l58.35 58.34zm96.01-11.3l11.31 11.31c6.25 6.25 16.38 6.25 22.63 0l58.34-58.34c6.25-6.25 6.25-16.38 0-22.63l-58.34-58.34c-6.25-6.25-16.38-6.25-22.63 0l-11.31 11.31c-6.25 6.25-6.25 16.38 0 22.63L386.75 192l-35.71 35.72c-6.25 6.25-6.25 16.38 0 22.63zM624 416H381.54c-.74 19.81-14.71 32-32.74 32H288c-18.69 0-33.02-17.47-32.77-32H16c-8.8 0-16 7.2-16 16v16c0 35.2 28.8 64 64 64h512c35.2 0 64-28.8 64-64v-16c0-8.8-7.2-16-16-16zM576 48c0-26.4-21.6-48-48-48H112C85.6 0 64 21.6 64 48v336h512V48zm-64 272H128V64h384v256z" />
              </svg>
              Cài đặt gợi ý việc làm
            </li>
            <li className="flex flex-row gap-3 p-4 rounded cursor-pointer text-slate-800 bg-slate-100 w-96 hover:text-green-600 hover:bg-slate-200">
              <svg
                className="w-6 h-6"
                fill="rgb(34 197 94)"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 280.003 280.003"
              >
                <path
                  color-rendering="auto"
                  image-rendering="auto"
                  shape-rendering="auto"
                  color-interpolation="sRGB"
                  d="M49.997,0.001
                  c-2.761-0.035-5.029,2.175-5.064,4.936c-0.013,0.992,0.27,1.965,0.812,2.796l43.953,96.701
                  c-26.83,16.803-44.701,46.624-44.701,80.568c0,52.408,42.592,95,95,95c52.408,0,95-42.592,95-95
                  c0-33.945-17.871-63.765-44.701-80.568l43.938-96.666c1.529-2.3,0.903-5.404-1.397-6.932c-0.84-0.558-1.83-0.85-2.839-0.835h-60
                  c-2.271-0.03-4.277,1.474-4.885,3.662l-25.115,55.254L114.878,3.655c-0.61-2.184-2.614-3.684-4.881-3.654H49.997z M57.763,10.001
                  h9.016l39.24,86.283c-2.571,0.987-5.091,2.08-7.549,3.279L57.763,10.001z M77.763,10.001h29.014l36.391,80.06
                  c-1.053-0.035-2.109-0.059-3.17-0.059c-8.435,0-16.613,1.11-24.402,3.18L77.763,10.001L77.763,10.001z M173.218,10.001h29.014
                  l-37.811,83.188c-3.199-0.851-6.462-1.543-9.783-2.059l-9.148-20.127L173.218,10.001z M213.218,10.001h9.014l-40.707,89.562
                  c-2.452-1.196-4.965-2.286-7.529-3.271L213.218,10.001z M139.997,100.002c47.003,0,85,37.997,85,85c0,47.003-37.997,85-85,85
                  c-47.003,0-85-37.997-85-85C54.997,137.999,92.994,100.002,139.997,100.002z M139.997,113.87c-39.226,0-71.133,31.907-71.133,71.133
                  c0,39.226,31.907,71.131,71.133,71.131c39.226,0,71.133-31.905,71.133-71.131C211.13,145.776,179.224,113.87,139.997,113.87z
                  M139.997,123.87c33.822,0,61.133,27.311,61.133,61.133c0,33.822-27.311,61.131-61.133,61.131
                  c-33.822,0-61.133-27.309-61.133-61.131C78.864,151.181,106.175,123.87,139.997,123.87z M140.173,150.262
                  c-1.881-0.065-3.638,0.931-4.549,2.578l-8.973,16.242l-19.07,4.08c-2.7,0.578-4.421,3.236-3.842,5.937
                  c0.19,0.887,0.618,1.705,1.237,2.368l12.674,13.553l-2.012,19.396c-0.284,2.747,1.712,5.205,4.459,5.489
                  c0.902,0.093,1.812-0.06,2.633-0.444l16.807-7.865l17.826,7.906c0.629,0.279,1.31,0.426,1.998,0.43
                  c2.762,0.015,5.013-2.211,5.028-4.973c0.001-0.215-0.011-0.429-0.038-0.642l-2.287-18.414l13.029-14.51
                  c1.845-2.055,1.674-5.217-0.381-7.062c-0.675-0.606-1.502-1.017-2.392-1.188l-18.219-3.516l-9.773-16.875
                  C143.464,151.262,141.894,150.321,140.173,150.262L140.173,150.262z M140.103,165.413l6.486,11.199
                  c0.726,1.253,1.959,2.13,3.381,2.404l11.777,2.271l-8.646,9.629c-0.967,1.077-1.42,2.52-1.242,3.957l1.48,11.904l-11.832-5.248
                  c-1.323-0.586-2.836-0.571-4.146,0.043l-10.863,5.086l1.334-12.875c0.149-1.439-0.332-2.872-1.32-3.93l-8.193-8.762l12.654-2.709
                  c1.415-0.303,2.63-1.204,3.33-2.471L140.103,165.413z"
                />
              </svg>
              Cài đặt nhận email
            </li>
            <li className="flex flex-row gap-3 p-4 rounded cursor-pointer text-slate-800 bg-slate-100 w-96 hover:text-green-600 hover:bg-slate-200">
              <svg
                className="w-6 h-6"
                fill="rgb(34 197 94)"
                viewBox="0 -64 640 640"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M255.03 261.65c6.25 6.25 16.38 6.25 22.63 0l11.31-11.31c6.25-6.25 6.25-16.38 0-22.63L253.25 192l35.71-35.72c6.25-6.25 6.25-16.38 0-22.63l-11.31-11.31c-6.25-6.25-16.38-6.25-22.63 0l-58.34 58.34c-6.25 6.25-6.25 16.38 0 22.63l58.35 58.34zm96.01-11.3l11.31 11.31c6.25 6.25 16.38 6.25 22.63 0l58.34-58.34c6.25-6.25 6.25-16.38 0-22.63l-58.34-58.34c-6.25-6.25-16.38-6.25-22.63 0l-11.31 11.31c-6.25 6.25-6.25 16.38 0 22.63L386.75 192l-35.71 35.72c-6.25 6.25-6.25 16.38 0 22.63zM624 416H381.54c-.74 19.81-14.71 32-32.74 32H288c-18.69 0-33.02-17.47-32.77-32H16c-8.8 0-16 7.2-16 16v16c0 35.2 28.8 64 64 64h512c35.2 0 64-28.8 64-64v-16c0-8.8-7.2-16-16-16zM576 48c0-26.4-21.6-48-48-48H112C85.6 0 64 21.6 64 48v336h512V48zm-64 272H128V64h384v256z" />
              </svg>
              Cài đặt bảo mật
            </li>
            <li className="flex flex-row gap-3 p-4 rounded cursor-pointer text-slate-800 bg-slate-100 w-96 hover:text-green-600 hover:bg-slate-200">
              <svg
                className="w-6 h-6"
                fill="rgb(34 197 94)"
                viewBox="0 -64 640 640"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M255.03 261.65c6.25 6.25 16.38 6.25 22.63 0l11.31-11.31c6.25-6.25 6.25-16.38 0-22.63L253.25 192l35.71-35.72c6.25-6.25 6.25-16.38 0-22.63l-11.31-11.31c-6.25-6.25-16.38-6.25-22.63 0l-58.34 58.34c-6.25 6.25-6.25 16.38 0 22.63l58.35 58.34zm96.01-11.3l11.31 11.31c6.25 6.25 16.38 6.25 22.63 0l58.34-58.34c6.25-6.25 6.25-16.38 0-22.63l-58.34-58.34c-6.25-6.25-16.38-6.25-22.63 0l-11.31 11.31c-6.25 6.25-6.25 16.38 0 22.63L386.75 192l-35.71 35.72c-6.25 6.25-6.25 16.38 0 22.63zM624 416H381.54c-.74 19.81-14.71 32-32.74 32H288c-18.69 0-33.02-17.47-32.77-32H16c-8.8 0-16 7.2-16 16v16c0 35.2 28.8 64 64 64h512c35.2 0 64-28.8 64-64v-16c0-8.8-7.2-16-16-16zM576 48c0-26.4-21.6-48-48-48H112C85.6 0 64 21.6 64 48v336h512V48zm-64 272H128V64h384v256z" />
              </svg>
              Đổi mật khẩu
            </li>
            <li
              onClick={() => {
                logout();
              }}
              className="flex flex-row gap-3 p-4 rounded cursor-pointer text-slate-800 bg-slate-100 w-96 hover:text-green-600 hover:bg-slate-200"
            >
              <svg
                className="w-6 h-6"
                fill="rgb(34 197 94)"
                viewBox="0 -64 640 640"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M255.03 261.65c6.25 6.25 16.38 6.25 22.63 0l11.31-11.31c6.25-6.25 6.25-16.38 0-22.63L253.25 192l35.71-35.72c6.25-6.25 6.25-16.38 0-22.63l-11.31-11.31c-6.25-6.25-16.38-6.25-22.63 0l-58.34 58.34c-6.25 6.25-6.25 16.38 0 22.63l58.35 58.34zm96.01-11.3l11.31 11.31c6.25 6.25 16.38 6.25 22.63 0l58.34-58.34c6.25-6.25 6.25-16.38 0-22.63l-58.34-58.34c-6.25-6.25-16.38-6.25-22.63 0l-11.31 11.31c-6.25 6.25-6.25 16.38 0 22.63L386.75 192l-35.71 35.72c-6.25 6.25-6.25 16.38 0 22.63zM624 416H381.54c-.74 19.81-14.71 32-32.74 32H288c-18.69 0-33.02-17.47-32.77-32H16c-8.8 0-16 7.2-16 16v16c0 35.2 28.8 64 64 64h512c35.2 0 64-28.8 64-64v-16c0-8.8-7.2-16-16-16zM576 48c0-26.4-21.6-48-48-48H112C85.6 0 64 21.6 64 48v336h512V48zm-64 272H128V64h384v256z" />
              </svg>
              <span className="text-red-600">Đăng xuất</span>
            </li>
          </ul>
        ) : (
          <></>
        )}
      </li>
    </>
  )});
  return (
    <header className="fixed top-0 left-0 right-0 z-50 text-black bg-white border menu-top border-1 border-slate-300">
      <div className="flex flex-row items-center justify-between px-8 ">
        <div className="flex flex-row items-center gap-5 main">
          <div className="logo w-52" onClick={() => navigation("/")}>
            <img src="../../../images/topcv-logo.png" alt="" />
          </div>
          <nav className="nav-menu">
            <ul className="flex flex-row items-center">
              <li
                className="relative py-6 "
                onMouseEnter={() => setIsJobsHovered(true)}
                onMouseLeave={() => setIsJobsHovered(false)}
              >
                <a
                  href="#"
                  className="px-6 py-8 text-base font-semibold hover:text-green-500"
                >
                  Việc làm
                </a>
                {isJobsHovered ? (
                  <ul className="absolute left-0 z-50 flex flex-col gap-3 p-3 text-base font-semibold bg-white border rounded-lg shadow-lg sub-menu top-full border-slate-100">
                    <li className="flex flex-row gap-3 p-4 rounded cursor-pointer text-slate-800 bg-slate-100 w-96 hover:text-green-600 hover:bg-slate-200">
                      <svg
                        className="w-6 h-6"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.5 14.5L10.5 10.5M6.5 12.5C3.18629 12.5 0.5 9.81371 0.5 6.5C0.5 3.18629 3.18629 0.5 6.5 0.5C9.81371 0.5 12.5 3.18629 12.5 6.5C12.5 9.81371 9.81371 12.5 6.5 12.5Z"
                          stroke="rgb(34 197 94)"
                        />
                      </svg>
                      Tìm việc làm
                    </li>
                    <li>
                      <hr />
                    </li>
                    <li
                      onClick={() => {
                        navigation("/your-application");
                      }}
                      className="flex flex-row gap-3 p-4 rounded cursor-pointer text-slate-800 bg-slate-100 w-96 hover:text-green-600 hover:bg-slate-200"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="rgb(34 197 94)"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M8,8 L4,8 L4,13 L11,13 L13,13 L20,13 L20,8 L16,8 L8,8 Z M8,6 L8,5 C8,3.8954305 8.8954305,3 10,3 L14,3 C15.1045695,3 16,3.8954305 16,5 L16,6 L20,6 C21.1045695,6 22,6.8954305 22,8 L22,19 C22,20.1045695 21.1045695,21 20,21 L4,21 C2.8954305,21 2,20.1045695 2,19 L2,8 C2,6.8954305 2.8954305,6 4,6 L8,6 Z M11,15 L4,15 L4,19 L20,19 L20,15 L13,15 L13,16 L11,16 L11,15 Z M14,6 L14,5 L10,5 L10,6 L14,6 Z"
                        />
                      </svg>
                      Việc làm đang ứng tuyển
                    </li>
                    <li
                      onClick={() => {
                        navigation("/saved-jobs");
                      }}
                      className="flex flex-row gap-3 p-4 rounded cursor-pointer text-slate-800 bg-slate-100 w-96 hover:text-green-600 hover:bg-slate-200"
                    >
                      <svg
                        className="w-7 h-7"
                        fill="rgb(34 197 94)"
                        viewBox="-2 -4 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M3.636 7.208L10 13.572l6.364-6.364a3 3 0 1 0-4.243-4.243L10 5.086l-2.121-2.12a3 3 0 0 0-4.243 4.242zM9.293 1.55l.707.707.707-.707a5 5 0 1 1 7.071 7.071l-7.07 7.071a1 1 0 0 1-1.415 0l-7.071-7.07a5 5 0 1 1 7.07-7.071z" />
                      </svg>
                      Việc làm đã lưu
                    </li>
                    <li>
                      <hr />
                    </li>
                    <li className="flex flex-row gap-3 p-4 rounded cursor-pointer text-slate-800 bg-slate-100 w-96 hover:text-green-600 hover:bg-slate-200">
                      <svg
                        className="w-5 h-5"
                        fill="rgb(34 197 94)"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1200 1200"
                      >
                        <path
                          id="path3015"
                          inkscape:connector-curvature="0"
                          d="M0,0v775.711V1200h424.289
                      H1200V752.556V424.289l-196.875,196.875v381.961H621.164H196.875V578.836V196.875h381.961L775.711,0H0z M1030.008,15.161
                      l-434.18,434.25L440.7,294.283L281.618,453.438L595.821,767.57l159.082-159.082l434.18-434.25L1030.001,15.157L1030.008,15.161z"
                        />
                      </svg>
                      Việc làm phù hợp
                    </li>
                    <li className="flex flex-row gap-3 p-4 rounded cursor-pointer text-slate-800 bg-slate-100 w-96 hover:text-green-600 hover:bg-slate-200">
                      <svg
                        className="w-6 h-6"
                        fill="rgb(34 197 94)"
                        viewBox="0 -64 640 640"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M255.03 261.65c6.25 6.25 16.38 6.25 22.63 0l11.31-11.31c6.25-6.25 6.25-16.38 0-22.63L253.25 192l35.71-35.72c6.25-6.25 6.25-16.38 0-22.63l-11.31-11.31c-6.25-6.25-16.38-6.25-22.63 0l-58.34 58.34c-6.25 6.25-6.25 16.38 0 22.63l58.35 58.34zm96.01-11.3l11.31 11.31c6.25 6.25 16.38 6.25 22.63 0l58.34-58.34c6.25-6.25 6.25-16.38 0-22.63l-58.34-58.34c-6.25-6.25-16.38-6.25-22.63 0l-11.31 11.31c-6.25 6.25-6.25 16.38 0 22.63L386.75 192l-35.71 35.72c-6.25 6.25-6.25 16.38 0 22.63zM624 416H381.54c-.74 19.81-14.71 32-32.74 32H288c-18.69 0-33.02-17.47-32.77-32H16c-8.8 0-16 7.2-16 16v16c0 35.2 28.8 64 64 64h512c35.2 0 64-28.8 64-64v-16c0-8.8-7.2-16-16-16zM576 48c0-26.4-21.6-48-48-48H112C85.6 0 64 21.6 64 48v336h512V48zm-64 272H128V64h384v256z" />
                      </svg>
                      Việc làm IT
                    </li>
                    <li className="flex flex-row gap-3 p-4 rounded cursor-pointer text-slate-800 bg-slate-100 w-96 hover:text-green-600 hover:bg-slate-200">
                      <svg
                        className="w-6 h-6"
                        fill="rgb(34 197 94)"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 280.003 280.003"
                      >
                        <path
                          color-rendering="auto"
                          image-rendering="auto"
                          shape-rendering="auto"
                          color-interpolation="sRGB"
                          d="M49.997,0.001
                        c-2.761-0.035-5.029,2.175-5.064,4.936c-0.013,0.992,0.27,1.965,0.812,2.796l43.953,96.701
                        c-26.83,16.803-44.701,46.624-44.701,80.568c0,52.408,42.592,95,95,95c52.408,0,95-42.592,95-95
                        c0-33.945-17.871-63.765-44.701-80.568l43.938-96.666c1.529-2.3,0.903-5.404-1.397-6.932c-0.84-0.558-1.83-0.85-2.839-0.835h-60
                        c-2.271-0.03-4.277,1.474-4.885,3.662l-25.115,55.254L114.878,3.655c-0.61-2.184-2.614-3.684-4.881-3.654H49.997z M57.763,10.001
                        h9.016l39.24,86.283c-2.571,0.987-5.091,2.08-7.549,3.279L57.763,10.001z M77.763,10.001h29.014l36.391,80.06
                        c-1.053-0.035-2.109-0.059-3.17-0.059c-8.435,0-16.613,1.11-24.402,3.18L77.763,10.001L77.763,10.001z M173.218,10.001h29.014
                        l-37.811,83.188c-3.199-0.851-6.462-1.543-9.783-2.059l-9.148-20.127L173.218,10.001z M213.218,10.001h9.014l-40.707,89.562
                        c-2.452-1.196-4.965-2.286-7.529-3.271L213.218,10.001z M139.997,100.002c47.003,0,85,37.997,85,85c0,47.003-37.997,85-85,85
                        c-47.003,0-85-37.997-85-85C54.997,137.999,92.994,100.002,139.997,100.002z M139.997,113.87c-39.226,0-71.133,31.907-71.133,71.133
                        c0,39.226,31.907,71.131,71.133,71.131c39.226,0,71.133-31.905,71.133-71.131C211.13,145.776,179.224,113.87,139.997,113.87z
                        M139.997,123.87c33.822,0,61.133,27.311,61.133,61.133c0,33.822-27.311,61.131-61.133,61.131
                        c-33.822,0-61.133-27.309-61.133-61.131C78.864,151.181,106.175,123.87,139.997,123.87z M140.173,150.262
                        c-1.881-0.065-3.638,0.931-4.549,2.578l-8.973,16.242l-19.07,4.08c-2.7,0.578-4.421,3.236-3.842,5.937
                        c0.19,0.887,0.618,1.705,1.237,2.368l12.674,13.553l-2.012,19.396c-0.284,2.747,1.712,5.205,4.459,5.489
                        c0.902,0.093,1.812-0.06,2.633-0.444l16.807-7.865l17.826,7.906c0.629,0.279,1.31,0.426,1.998,0.43
                        c2.762,0.015,5.013-2.211,5.028-4.973c0.001-0.215-0.011-0.429-0.038-0.642l-2.287-18.414l13.029-14.51
                        c1.845-2.055,1.674-5.217-0.381-7.062c-0.675-0.606-1.502-1.017-2.392-1.188l-18.219-3.516l-9.773-16.875
                        C143.464,151.262,141.894,150.321,140.173,150.262L140.173,150.262z M140.103,165.413l6.486,11.199
                        c0.726,1.253,1.959,2.13,3.381,2.404l11.777,2.271l-8.646,9.629c-0.967,1.077-1.42,2.52-1.242,3.957l1.48,11.904l-11.832-5.248
                        c-1.323-0.586-2.836-0.571-4.146,0.043l-10.863,5.086l1.334-12.875c0.149-1.439-0.332-2.872-1.32-3.93l-8.193-8.762l12.654-2.709
                        c1.415-0.303,2.63-1.204,3.33-2.471L140.103,165.413z"
                        />
                      </svg>
                      Việc làm Senior
                    </li>
                  </ul>
                ) : (
                  <></>
                )}
              </li>
              <li
                className="relative py-6 "
                onMouseEnter={() => setIsCVsHovered(true)}
                onMouseLeave={() => setIsCVsHovered(false)}
              >
                <a
                  href="#"
                  className="px-6 py-8 text-base font-semibold hover:text-green-500"
                >
                  Hồ sơ & CV
                </a>
                {isCVsHovered ? (
                  <ul className="absolute left-0 z-50 flex flex-col gap-3 p-3 text-base font-semibold bg-white border rounded-lg shadow-lg sub-menu top-full border-slate-100">
                    {/* <li><hr /></li> */}
                    <li className="flex flex-row gap-3 p-4 rounded cursor-pointer text-slate-800 bg-slate-100 w-96 hover:text-green-600 hover:bg-slate-200">
                      <svg
                        className="w-7 h-7"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9Z"
                          fill="rgb(34 197 94)"
                        />
                        <path
                          d="M8 17.5C8 15.8431 9.34315 14.5 11 14.5H13C14.6569 14.5 16 15.8431 16 17.5C16 18.0523 15.5523 18.5 15 18.5H9C8.44772 18.5 8 18.0523 8 17.5Z"
                          fill="rgb(34 197 94)"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M7 2.25C5.48122 2.25 4.25 3.48122 4.25 5V19C4.25 20.5188 5.48122 21.75 7 21.75H17C18.5188 21.75 19.75 20.5188 19.75 19V8.1979C19.75 7.83178 19.6352 7.47488 19.4217 7.17745L16.4085 2.97955C16.0798 2.52157 15.5506 2.25 14.9868 2.25H7ZM5.75 5C5.75 4.30964 6.30964 3.75 7 3.75H14.25V8.14705C14.25 8.56126 14.5858 8.89705 15 8.89705H18.25V19C18.25 19.6904 17.6904 20.25 17 20.25H7C6.30964 20.25 5.75 19.6904 5.75 19V5Z"
                          fill="rgb(34 197 94)"
                        />
                      </svg>
                      Quản lý CV
                    </li>
                    <li className="flex flex-row gap-3 p-4 rounded cursor-pointer text-slate-800 bg-slate-100 w-96 hover:text-green-600 hover:bg-slate-200">
                      <svg
                        className="w-6 h-6"
                        fill="rgb(34 197 94)"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M8.71,7.71,11,5.41V15a1,1,0,0,0,2,0V5.41l2.29,2.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42l-4-4a1,1,0,0,0-.33-.21,1,1,0,0,0-.76,0,1,1,0,0,0-.33.21l-4,4A1,1,0,1,0,8.71,7.71ZM21,12a1,1,0,0,0-1,1v6a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V13a1,1,0,0,0-2,0v6a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V13A1,1,0,0,0,21,12Z" />
                      </svg>
                      Tải CV lên
                    </li>
                    <li className="flex flex-row gap-3 p-4 rounded cursor-pointer text-slate-800 bg-slate-100 w-96 hover:text-green-600 hover:bg-slate-200">
                      <svg
                        className="w-6 h-6"
                        fill="rgb(34 197 94)"
                        viewBox="0 0 600 600"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M 110 0 C 87.909591 0.0022087178 70.002209 17.909591 70 40 L 70 560 C 70.0022 582.09042 87.909591 599.99779 110 600 L 490 600 C 512.09042 599.998 529.99779 582.09042 530 560 L 530 280 L 530 200 C 530.00003 189.39126 525.78612 179.21691 518.28516 171.71484 L 358.28516 11.714844 C 350.78309 4.2138753 340.60874 -3.0974471e-05 330 0 L 240 0 L 110 0 z M 150 80 L 240 80 L 290 80 L 290 200 C 290.002 222.09043 307.90957 239.99782 330 240 L 450 240 L 450 280 L 450 520 L 150 520 L 150 80 z M 220 300 A 40 40 0 0 0 180 340 A 40 40 0 0 0 220 380 L 380 380 A 40 40 0 0 0 420 340 A 40 40 0 0 0 380 300 L 220 300 z M 220 410 A 40 40 0 0 0 180 450 A 40 40 0 0 0 220 490 L 380 490 A 40 40 0 0 0 420 450 A 40 40 0 0 0 380 410 L 220 410 z " />
                      </svg>
                      Quản lý Cover Letter
                    </li>
                    <li>
                      <hr />
                    </li>
                    <li className="flex flex-row gap-3 p-4 rounded cursor-pointer text-slate-800 bg-slate-100 w-96 hover:text-green-600 hover:bg-slate-200">
                      <svg
                        className="w-7 h-7"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9Z"
                          fill="rgb(34 197 94)"
                        />
                        <path
                          d="M8 17.5C8 15.8431 9.34315 14.5 11 14.5H13C14.6569 14.5 16 15.8431 16 17.5C16 18.0523 15.5523 18.5 15 18.5H9C8.44772 18.5 8 18.0523 8 17.5Z"
                          fill="rgb(34 197 94)"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M7 2.25C5.48122 2.25 4.25 3.48122 4.25 5V19C4.25 20.5188 5.48122 21.75 7 21.75H17C18.5188 21.75 19.75 20.5188 19.75 19V8.1979C19.75 7.83178 19.6352 7.47488 19.4217 7.17745L16.4085 2.97955C16.0798 2.52157 15.5506 2.25 14.9868 2.25H7ZM5.75 5C5.75 4.30964 6.30964 3.75 7 3.75H14.25V8.14705C14.25 8.56126 14.5858 8.89705 15 8.89705H18.25V19C18.25 19.6904 17.6904 20.25 17 20.25H7C6.30964 20.25 5.75 19.6904 5.75 19V5Z"
                          fill="rgb(34 197 94)"
                        />
                      </svg>
                      Mẫu CV
                    </li>
                    <li className="flex flex-row gap-3 p-4 rounded cursor-pointer text-slate-800 bg-slate-100 w-96 hover:text-green-600 hover:bg-slate-200">
                      <svg
                        className="w-6 h-6"
                        fill="rgb(34 197 94)"
                        viewBox="0 0 600 600"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M 110 0 C 87.909591 0.0022087178 70.002209 17.909591 70 40 L 70 560 C 70.0022 582.09042 87.909591 599.99779 110 600 L 490 600 C 512.09042 599.998 529.99779 582.09042 530 560 L 530 280 L 530 200 C 530.00003 189.39126 525.78612 179.21691 518.28516 171.71484 L 358.28516 11.714844 C 350.78309 4.2138753 340.60874 -3.0974471e-05 330 0 L 240 0 L 110 0 z M 150 80 L 240 80 L 290 80 L 290 200 C 290.002 222.09043 307.90957 239.99782 330 240 L 450 240 L 450 280 L 450 520 L 150 520 L 150 80 z M 220 300 A 40 40 0 0 0 180 340 A 40 40 0 0 0 220 380 L 380 380 A 40 40 0 0 0 420 340 A 40 40 0 0 0 380 300 L 220 300 z M 220 410 A 40 40 0 0 0 180 450 A 40 40 0 0 0 220 490 L 380 490 A 40 40 0 0 0 420 450 A 40 40 0 0 0 380 410 L 220 410 z " />
                      </svg>
                      Mẫu Cover Letter
                    </li>
                    <li>
                      <hr />
                    </li>
                    <li className="flex flex-row gap-3 p-4 rounded cursor-pointer text-slate-800 bg-slate-100 w-96 hover:text-green-600 hover:bg-slate-200">
                      <svg
                        className="w-7 h-7"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9Z"
                          fill="rgb(34 197 94)"
                        />
                        <path
                          d="M8 17.5C8 15.8431 9.34315 14.5 11 14.5H13C14.6569 14.5 16 15.8431 16 17.5C16 18.0523 15.5523 18.5 15 18.5H9C8.44772 18.5 8 18.0523 8 17.5Z"
                          fill="rgb(34 197 94)"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M7 2.25C5.48122 2.25 4.25 3.48122 4.25 5V19C4.25 20.5188 5.48122 21.75 7 21.75H17C18.5188 21.75 19.75 20.5188 19.75 19V8.1979C19.75 7.83178 19.6352 7.47488 19.4217 7.17745L16.4085 2.97955C16.0798 2.52157 15.5506 2.25 14.9868 2.25H7ZM5.75 5C5.75 4.30964 6.30964 3.75 7 3.75H14.25V8.14705C14.25 8.56126 14.5858 8.89705 15 8.89705H18.25V19C18.25 19.6904 17.6904 20.25 17 20.25H7C6.30964 20.25 5.75 19.6904 5.75 19V5Z"
                          fill="rgb(34 197 94)"
                        />
                      </svg>
                      Dịch vụ tư vấn CV
                    </li>
                    <li className="flex flex-row gap-3 p-4 rounded cursor-pointer text-slate-800 bg-slate-100 w-96 hover:text-green-600 hover:bg-slate-200">
                      <svg
                        className="w-6 h-6 pl-1"
                        fill="rgb(34 197 94)"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <rect
                          width="109.2"
                          x="82.3"
                          y="96.9"
                          height="20.8"
                        />
                        <rect
                          width="109.2"
                          x="82.3"
                          y="158.2"
                          height="20.8"
                        />
                        <rect
                          width="256.9"
                          x="82.3"
                          y="218.6"
                          height="20.8"
                        />
                        <rect
                          width="256.9"
                          x="82.3"
                          y="278.9"
                          height="20.8"
                        />
                        <path d="m487.9,249.7c-16.3-16.3-42.7-16.3-59,0l-22.1,22.1v-112.5c0-3.1-1-5.2-3.1-7.3l-137.3-137.3c-2.1-2.1-4.2-3.1-7.3-3.1h-237.2c-6.2,0-10.4,4.2-10.4,10.4v468.1c0,6.2 4.2,10.4 10.4,10.4h374.5c6.2,0 10.4-4.2 10.4-11.4v-99.3l81.1-81.1c16.3-16.3 16.3-42.7 0-59zm-218.4-202.8l101.9,101.9h-101.9v-101.9zm116.5,432.8h-353.7v-447.3h216.4v126.9c0,6.2 4.2,10.4 10.4,10.4h126.9v122.9l-99.2,99.2-8.8,67.8 67.8-8.8 40.3-40.3v69.2zm87.2-186.1l-136.8,136.8-35,5.7 5.7-35 136.8-136.8c8.1-8.1 21.2-8.1 29.3,0 8.1,8.1 8.1,21.2 0,29.3z" />
                      </svg>
                      Hướng dẫn viết CV theo ngành nghề
                    </li>
                    <li className="flex flex-row gap-3 p-4 rounded cursor-pointer text-slate-800 bg-slate-100 w-96 hover:text-green-600 hover:bg-slate-200">
                      <svg
                        className="w-6 h-6"
                        fill="rgb(34 197 94)"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M15,3.41421356 L15,7 L18.5857864,7 L15,3.41421356 Z M19,9 L15,9 C13.8954305,9 13,8.1045695 13,7 L13,3 L5,3 L5,21 L19,21 L19,9 Z M5,1 L15.4142136,1 L21,6.58578644 L21,21 C21,22.1045695 20.1045695,23 19,23 L5,23 C3.8954305,23 3,22.1045695 3,21 L3,3 C3,1.8954305 3.8954305,1 5,1 Z M11,15.5857864 L15.2928932,11.2928932 L16.7071068,12.7071068 L11,18.4142136 L7.29289322,14.7071068 L8.70710678,13.2928932 L11,15.5857864 Z"
                        />
                      </svg>
                      Thư viện CV theo ngành nghề
                    </li>
                    <li>
                      <hr />
                    </li>
                    <li className="flex flex-row gap-3 p-4 rounded cursor-pointer text-slate-800 bg-slate-100 w-96 hover:text-green-600 hover:bg-slate-200">
                      <svg
                        className="w-6 h-6"
                        fill="rgb(34 197 94)"
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect height="1" width="12" x="10" y="29" />
                        <rect height="1" width="12" x="10" y="2" />
                        <rect height="1" width="9" x="13" y="20" />
                        <rect height="1" width="2" x="10" y="20" />
                        <rect height="1" width="9" x="13" y="23" />
                        <rect height="1" width="2" x="10" y="23" />
                        <rect
                          height="1"
                          transform="translate(9.5 41.5) rotate(-90)"
                          width="20"
                          x="15.5"
                          y="15.5"
                        />
                        <path d="M22,2V3h2a1,1,0,0,1,1,1V6h1V4a2,2,0,0,0-2-2Z" />
                        <rect
                          height="1"
                          transform="translate(-9.5 22.5) rotate(-90)"
                          width="20"
                          x="-3.5"
                          y="15.5"
                        />
                        <path d="M10,2V3H8A1,1,0,0,0,7,4V6H6V4A2,2,0,0,1,8,2Z" />
                        <path d="M22,30V29h2a1,1,0,0,0,1-1V26h1v2a2,2,0,0,1-2,2Z" />
                        <path d="M10,30V29H8a1,1,0,0,1-1-1V26H6v2a2,2,0,0,0,2,2Z" />
                        <path d="M20.67,15.2a5,5,0,0,0-9.34,0,4.46,4.46,0,0,0-.27,1.09,7.42,7.42,0,0,0,.94.64,3.8,3.8,0,0,1,.17-1.07,4,4,0,0,1,7.66,0A3.8,3.8,0,0,1,20,16.93a7.42,7.42,0,0,0,.94-.64A4.46,4.46,0,0,0,20.67,15.2Z" />
                        <path d="M16,8a2,2,0,1,0,2,2A2,2,0,0,0,16,8Zm0,3a1,1,0,1,1,1-1A1,1,0,0,1,16,11Z" />
                        <path d="M20.67,15.2a5,5,0,0,0-9.34,0,4.46,4.46,0,0,0-.27,1.09,7.42,7.42,0,0,0,.94.64,8,8,0,0,0,8,0,7.42,7.42,0,0,0,.94-.64A4.46,4.46,0,0,0,20.67,15.2ZM16,17a7,7,0,0,1-3.83-1.14,4,4,0,0,1,7.66,0A7,7,0,0,1,16,17Z" />
                        <path d="M20.67,15.2a6,6,0,0,1-.84.66,4,4,0,0,0-7.66,0,6,6,0,0,1-.84-.66,5,5,0,0,1,9.34,0Z" />
                      </svg>
                      TopCV Profile
                    </li>
                  </ul>
                ) : (
                  <></>
                )}
              </li>
              <li
                className="relative py-6 "
                onMouseEnter={() => setIsCompaniesHovered(true)}
                onMouseLeave={() => setIsCompaniesHovered(false)}
              >
                <a
                  href="#"
                  className="px-6 py-8 text-base font-semibold hover:text-green-500"
                >
                  Công ty
                </a>
                {isCompaniesHovered ? (
                  <ul className="absolute left-0 z-50 flex flex-col gap-3 p-3 text-base font-semibold bg-white border rounded-lg shadow-lg sub-menu top-full border-slate-100">
                    <li
                      onClick={() => navigation("/companies")}
                      className="flex flex-row gap-3 p-4 rounded cursor-pointer text-slate-800 bg-slate-100 w-96 hover:text-green-600 hover:bg-slate-200"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="rgb(34 197 94)"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M21 19h2v2H1v-2h2V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v15h4v-8h-2V9h3a1 1 0 0 1 1 1v9zM5 5v14h8V5H5zm2 6h4v2H7v-2zm0-4h4v2H7V7z" />
                      </svg>
                      Danh sách công ty
                    </li>
                    <li className="flex flex-row gap-3 p-4 rounded cursor-pointer text-slate-800 bg-slate-100 w-96 hover:text-green-600 hover:bg-slate-200">
                      <svg
                        className="w-6 h-6"
                        viewBox="0 0 512 512"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill="rgb(34 197 94)"
                          d="M252.5 381l-128 49c-5.9 2.2-12.1-2.3-11.8-8.6l7-136.9c.1-2.1-.6-4.2-1.9-5.9L31.6 172c-4-4.9-1.6-12.2 4.5-13.9l132.4-35.6c2.1-.6 3.9-1.9 5-3.7L248.3 4c3.4-5.3 11.2-5.3 14.6 0l74.8 114.9c1.2 1.8 3 3.1 5 3.7l132.4 35.6c6.1 1.6 8.5 9 4.5 13.9l-86.1 106.6c-1.3 1.7-2 3.8-1.9 5.9l7 136.9c.3 6.3-5.9 10.8-11.8 8.6l-128-49c-2.1-.8-4.3-.8-6.3-.1z"
                        ></path>
                        <path
                          fill="rgb(74 222 128)"
                          d="M456.1 51.7l-41-41c-1.2-1.2-2.8-1.7-4.4-1.5c-1.6.2-3.1 1.2-3.9 2.6l-42.3 83.3c-1.2 2.1-.8 4.6.9 6.3c1 1 2.4 1.5 3.7 1.5c.9 0 1.8-.2 2.6-.7L454.9 60c1.4-.8 2.4-2.2 2.6-3.9c.3-1.6-.3-3.2-1.4-4.4z"
                        ></path>
                        <path
                          fill="rgb(74 222 128)"
                          d="M149.1 95.2l-42.3-83.3c-.8-1.4-2.2-2.4-3.9-2.6c-1.6-.2-3.3.3-4.4 1.5l-41 41c-1.2 1.2-1.7 2.8-1.5 4.4c.2 1.6 1.2 3.1 2.6 3.9l83.3 42.3c.8.5 1.7.7 2.6.7c1.4 0 2.7-.5 3.7-1.5c1.7-1.8 2-4.4.9-6.4z"
                        ></path>
                        <path
                          fill="rgb(74 222 128)"
                          d="M289.8 505.2l-29-88.8c-.2-.9-.7-1.7-1.3-2.3c-1-1-2.3-1.5-3.7-1.5c-2.4 0-4.4 1.6-5.1 3.9l-29 88.8c-.4 1.6-.1 3.3.9 4.6c1 1.3 2.5 2.1 4.2 2.1h57.9c1.6 0 3.2-.8 4.2-2.1c1.1-1.4 1.4-3.1.9-4.7z"
                        ></path>
                      </svg>
                      Top công ty
                    </li>
                  </ul>
                ) : (
                  <></>
                )}
              </li>
              <li
                className="relative py-6 "
                onMouseEnter={() => setIsToolsHovered(true)}
                onMouseLeave={() => setIsToolsHovered(false)}
              >
                <a
                  href="#"
                  className="px-6 py-8 text-base font-semibold hover:text-green-500"
                >
                  Công cụ
                </a>
                {isToolsHovered ? (
                  <div className="grid grid-cols-2 absolute z-50 top-full left-0 w-[720px] font-semibold text-base bg-white border border-slate-100 rounded-lg shadow-lg">
                    <ul className="flex flex-col gap-3 p-3 sub-menu">
                      <li className="flex flex-row gap-3 p-4 rounded cursor-pointer text-slate-800 bg-slate-100 w-96 hover:text-green-600 hover:bg-slate-200">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4,4 C4.51283143,4 4.93550653,4.38604429 4.9932722,4.88337975 L5,5 L5,18 L20,18 C20.5523,18 21,18.4477 21,19 C21,19.51285 20.613973,19.9355092 20.1166239,19.9932725 L20,20 L4,20 C3.48716857,20 3.06449347,19.613973 3.0067278,19.1166239 L3,19 L3,5 C3,4.44772 3.44772,4 4,4 Z M20.1935,6.81813 C21.0933,6.81813 21.5439,7.90606 20.9076,8.54231 L15.3386,14.1114 C14.909,14.541 14.2125,14.541 13.7829,14.1114 L11.0252,11.3537 L7.48969,14.8892 C7.09916,15.2797 6.466,15.2797 6.07547,14.8892 C5.68495,14.4987 5.68495,13.8655 6.07547,13.475 L10.2474,9.30305 C10.677,8.87347 11.3735,8.87348 11.803,9.30305 L14.5608,12.0608 L17.8034,8.81813 L17.3892,8.81813 C16.8369,8.81813 16.3892,8.37041 16.3892,7.81813 C16.3892,7.26584 16.8369,6.81813 17.3892,6.81813 L20.1935,6.81813 Z"
                            id="形状"
                            fill="rgb(34 197 94)"
                          ></path>
                        </svg>
                        Trắc nghiệm tính cách MBTI
                      </li>
                      <li className="flex flex-row gap-3 p-4 rounded cursor-pointer text-slate-800 bg-slate-100 w-96 hover:text-green-600 hover:bg-slate-200">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4,4 C4.51283143,4 4.93550653,4.38604429 4.9932722,4.88337975 L5,5 L5,18 L20,18 C20.5523,18 21,18.4477 21,19 C21,19.51285 20.613973,19.9355092 20.1166239,19.9932725 L20,20 L4,20 C3.48716857,20 3.06449347,19.613973 3.0067278,19.1166239 L3,19 L3,5 C3,4.44772 3.44772,4 4,4 Z M20.1935,6.81813 C21.0933,6.81813 21.5439,7.90606 20.9076,8.54231 L15.3386,14.1114 C14.909,14.541 14.2125,14.541 13.7829,14.1114 L11.0252,11.3537 L7.48969,14.8892 C7.09916,15.2797 6.466,15.2797 6.07547,14.8892 C5.68495,14.4987 5.68495,13.8655 6.07547,13.475 L10.2474,9.30305 C10.677,8.87347 11.3735,8.87348 11.803,9.30305 L14.5608,12.0608 L17.8034,8.81813 L17.3892,8.81813 C16.8369,8.81813 16.3892,8.37041 16.3892,7.81813 C16.3892,7.26584 16.8369,6.81813 17.3892,6.81813 L20.1935,6.81813 Z"
                            id="形状"
                            fill="rgb(34 197 94)"
                          ></path>
                        </svg>
                        Trắc nghiệm MI
                      </li>
                      <li>
                        <hr />
                      </li>
                      <li className="flex flex-row gap-3 p-4 rounded cursor-pointer text-slate-800 bg-slate-100 w-96 hover:text-green-600 hover:bg-slate-200">
                        <svg
                          className="w-6 h-6"
                          fill="rgb(34 197 94)"
                          viewBox="-2.5 -2.5 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M12.238 5.472L3.2 14.51l-.591 2.016 1.975-.571 9.068-9.068-1.414-1.415zM13.78 3.93l1.414 1.414 1.318-1.318a.5.5 0 0 0 0-.707l-.708-.707a.5.5 0 0 0-.707 0L13.781 3.93zm3.439-2.732l.707.707a2.5 2.5 0 0 1 0 3.535L5.634 17.733l-4.22 1.22a1 1 0 0 1-1.237-1.241l1.248-4.255 12.26-12.26a2.5 2.5 0 0 1 3.535 0z" />
                        </svg>
                        TopCV Skills
                      </li>
                      <li>
                        <hr />
                      </li>
                      <li className="flex flex-row gap-3 p-4 rounded cursor-pointer text-slate-800 bg-slate-100 w-96 hover:text-green-600 hover:bg-slate-200">
                        <svg
                          className="w-6 h-6"
                          viewBox="0 0 48 48"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4 13L24 8L44 13L24 18L4 13Z"
                            stroke="rgb(34 197 94)"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M13 16V25.9706C13 25.9706 18 29 24 29C30 29 35 25.9706 35 25.9706V16"
                            stroke="rgb(34 197 94)"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M7 14V36"
                            stroke="rgb(34 197 94)"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <rect
                            x="4"
                            y="34"
                            width="6"
                            height="6"
                            fill="none"
                            stroke="rgb(34 197 94)"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Khóa học
                      </li>
                      <li>
                        <hr />
                      </li>
                      <li className="flex flex-row gap-3 p-4 rounded cursor-pointer text-slate-800 bg-slate-100 w-96 hover:text-green-600 hover:bg-slate-200">
                        <svg
                          className="w-6 h-6"
                          fill="rgb(34 197 94)"
                          viewBox="0 0 32 32"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M22 1.25h-12c-1.518 0.002-2.748 1.232-2.75 2.75v24c0.002 1.518 1.232 2.748 2.75 2.75h12c1.518-0.002 2.748-1.232 2.75-2.75v-24c-0.002-1.518-1.232-2.748-2.75-2.75h-0zM23.25 28c-0.001 0.69-0.56 1.249-1.25 1.25h-12c-0.69-0.001-1.249-0.56-1.25-1.25v-24c0.001-0.69 0.56-1.249 1.25-1.25h12c0.69 0.001 1.249 0.56 1.25 1.25v0zM18 25.75h-4c-0.414 0-0.75 0.336-0.75 0.75s0.336 0.75 0.75 0.75v0h4c0.414 0 0.75-0.336 0.75-0.75s-0.336-0.75-0.75-0.75v0z"></path>
                        </svg>
                        Mobile App TopCV
                      </li>
                    </ul>

                    <ul className="flex flex-col gap-3 p-3 sub-menu">
                      <li className="flex flex-row gap-3 p-4 rounded cursor-pointer text-slate-800 bg-slate-100 w-96 hover:text-green-600 hover:bg-slate-200">
                        <svg
                          className="w-6 h-6"
                          fill="rgb(34 197 94)"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 32 32"
                        >
                          <path
                            d="M32,17.1C32,17.1,32,17,32,17.1c0-0.1,0-0.1,0-0.1c0-0.1,0-0.2,0-0.3l-4-12c0,0,0,0,0,0c0,0,0-0.1-0.1-0.1
                          c0-0.1-0.1-0.1-0.1-0.2c0,0-0.1-0.1-0.1-0.1c-0.1-0.1-0.1-0.1-0.2-0.1c0,0-0.1,0-0.1-0.1C27.2,4,27.1,4,27,4h-8.2
                          c-0.3-0.8-1-1.5-1.8-1.8V1c0-0.6-0.4-1-1-1s-1,0.4-1,1v1.2c-0.8,0.3-1.5,1-1.8,1.8H5C4.9,4,4.8,4,4.6,4.1c0,0-0.1,0-0.1,0.1
                          c-0.1,0-0.1,0.1-0.2,0.1c0,0-0.1,0.1-0.1,0.1C4.2,4.4,4.2,4.5,4.1,4.5c0,0,0,0.1-0.1,0.1c0,0,0,0,0,0l-4,12c0,0.1,0,0.2,0,0.3
                          c0,0,0,0,0,0c0,0,0,0.1,0,0.1c0,0,0,0.1,0,0.1C0.1,19.8,2.3,22,5,22s4.9-2.2,5-4.8c0,0,0-0.1,0-0.1c0,0,0-0.1,0-0.1c0,0,0,0,0,0
                          c0-0.1,0-0.2,0-0.3L6.4,6h6.8c0.3,0.8,1,1.5,1.8,1.8V20c-1.1,0-2,0.9-2,2v4h-2.6c-1.3,0-2.4,0.8-2.8,2.1l-0.5,1.6
                          C6.9,30,7,30.3,7.2,30.6C7.4,30.8,7.7,31,8,31h16c0.3,0,0.6-0.2,0.8-0.4c0.2-0.3,0.2-0.6,0.1-0.9l-0.5-1.6C24,26.8,22.9,26,21.6,26
                          H19v-4c0-1.1-0.9-2-2-2V7.8c0.8-0.3,1.5-1,1.8-1.8h6.8l-3.6,10.7c0,0.1,0,0.2,0,0.3c0,0,0,0,0,0c0,0,0,0.1,0,0.1c0,0,0,0.1,0,0.1
                          c0.1,2.7,2.3,4.8,5,4.8S31.9,19.8,32,17.1C32,17.1,32,17.1,32,17.1z M2.4,16L5,8.2L7.6,16H2.4z M16,6c-0.6,0-1-0.4-1-1s0.4-1,1-1
                          s1,0.4,1,1S16.6,6,16,6z M27,8.2l2.6,7.8h-5.2L27,8.2z"
                          />
                        </svg>
                        Tính lương GROSS - NET
                      </li>
                      <li className="flex flex-row gap-3 p-4 rounded cursor-pointer text-slate-800 bg-slate-100 w-96 hover:text-green-600 hover:bg-slate-200">
                        <svg
                          className="w-6 h-6"
                          viewBox="0 0 16 16"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill="rgb(34 197 94)"
                            d="M5 11h3v5h-3v-5z"
                          ></path>
                          <path
                            fill="rgb(34 197 94)"
                            d="M1 14h3v2h-3v-2z"
                          ></path>
                          <path
                            fill="rgb(34 197 94)"
                            d="M13 12h3v4h-3v-4z"
                          ></path>
                          <path
                            fill="rgb(34 197 94)"
                            d="M9 9h3v7h-3v-7z"
                          ></path>
                          <path
                            fill="rgb(34 197 94)"
                            d="M16 0.070l-5.68 4.97-5.47-1.7-4.85 3.76v1.9l5.15-4 5.53 1.72 5.32-4.66v-1.99z"
                          ></path>
                        </svg>
                        Tính thuế thu nhập cá nhân
                      </li>
                      <li>
                        <hr />
                      </li>
                      <li className="flex flex-row gap-3 p-4 rounded cursor-pointer text-slate-800 bg-slate-100 w-96 hover:text-green-600 hover:bg-slate-200">
                        <svg
                          className="w-6 h-6"
                          fill="rgb(34 197 94)"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 317.855 317.855"
                        >
                          <path
                            d="M158.929,317.855c-1.029,0-2.059-0.159-3.051-0.477c-33.344-10.681-61.732-31.168-84.377-60.891
                            c-17.828-23.401-32.103-52.526-42.426-86.566C11.661,112.506,11.461,61.358,11.461,59.209c0-5.15,3.912-9.459,9.039-9.954
                            c0.772-0.075,78.438-8.048,132.553-47.347c3.504-2.546,8.249-2.543,11.753,0.001C218.906,41.207,296.582,49.18,297.36,49.256
                            c5.123,0.5,9.034,4.807,9.034,9.953c0,2.149-0.2,53.297-17.613,110.713c-10.324,34.04-24.598,63.165-42.426,86.566
                            c-22.644,29.723-51.032,50.21-84.376,60.891C160.987,317.696,159.958,317.855,158.929,317.855z M31.748,67.982
                        c0.831,16.784,4.062,55.438,16.604,96.591c21.405,70.227,58.601,114.87,110.576,132.746
                            c52.096-17.916,89.335-62.711,110.713-133.202c12.457-41.074,15.653-79.434,16.472-96.134
                            c-22.404-3.269-80.438-14.332-127.186-45.785C112.175,53.648,54.153,64.713,31.748,67.982z"
                          />
                          <path
                            d="M192.732,202.035c-2.56,0-5.118-0.977-7.071-2.929l-67.607-67.609c-3.905-3.905-3.905-10.237,0-14.143
                              c3.907-3.904,10.237-3.903,14.143,0l67.607,67.609c3.905,3.905,3.905,10.237,0,14.143
                        C197.851,201.059,195.291,202.035,192.732,202.035z"
                          />
                          <path
                            d="M125.123,202.035c-2.56,0-5.118-0.977-7.071-2.929c-3.905-3.905-3.905-10.237,0-14.143l67.607-67.609
                              c3.906-3.904,10.236-3.904,14.143,0c3.905,3.905,3.905,10.237,0,14.143l-67.607,67.609 C130.241,201.059,127.683,202.035,125.123,202.035z"
                          />
                        </svg>
                        Tính Bảo hiểm thất nghiệp
                      </li>
                      <li className="flex flex-row gap-3 p-4 rounded cursor-pointer text-slate-800 bg-slate-100 w-96 hover:text-green-600 hover:bg-slate-200">
                        <svg
                          className="w-6 h-6"
                          fill="rgb(34 197 94)"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 317.855 317.855"
                        >
                          <path
                            d="M158.929,317.855c-1.029,0-2.059-0.159-3.051-0.477c-33.344-10.681-61.732-31.168-84.377-60.891
                            c-17.828-23.401-32.103-52.526-42.426-86.566C11.661,112.506,11.461,61.358,11.461,59.209c0-5.15,3.912-9.459,9.039-9.954
                            c0.772-0.075,78.438-8.048,132.553-47.347c3.504-2.546,8.249-2.543,11.753,0.001C218.906,41.207,296.582,49.18,297.36,49.256
                            c5.123,0.5,9.034,4.807,9.034,9.953c0,2.149-0.2,53.297-17.613,110.713c-10.324,34.04-24.598,63.165-42.426,86.566
                            c-22.644,29.723-51.032,50.21-84.376,60.891C160.987,317.696,159.958,317.855,158.929,317.855z M31.748,67.982
                            c0.831,16.784,4.062,55.438,16.604,96.591c21.405,70.227,58.601,114.87,110.576,132.746
                            c52.096-17.916,89.335-62.711,110.713-133.202c12.457-41.074,15.653-79.434,16.472-96.134
                            c-22.404-3.269-80.438-14.332-127.186-45.785C112.175,53.648,54.153,64.713,31.748,67.982z"
                          />
                          <path
                            d="M153.582,207.625c-2.372,0-4.68-0.844-6.499-2.4l-36.163-30.926c-4.197-3.589-4.69-9.901-1.101-14.099
                            c3.588-4.198,9.901-4.692,14.099-1.101l28.124,24.051l55.743-73.118c3.348-4.392,9.622-5.24,14.015-1.89
                            c4.393,3.348,5.238,9.623,1.89,14.015l-62.155,81.53c-1.667,2.187-4.16,3.591-6.895,3.882
                            C154.287,207.606,153.934,207.625,153.582,207.625z"
                          />
                        </svg>
                        Tính Bảo hiểm xã hội một lần
                      </li>
                      <li>
                        <hr />
                      </li>
                      <li className="flex flex-row gap-3 p-4 rounded cursor-pointer text-slate-800 bg-slate-100 w-96 hover:text-green-600 hover:bg-slate-200">
                        <svg
                          className="w-6 h-6"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13 5C13 6.10457 10.5376 7 7.5 7C4.46243 7 2 6.10457 2 5M13 5C13 3.89543 10.5376 3 7.5 3C4.46243 3 2 3.89543 2 5M13 5V6.5M2 5V17C2 18.1046 4.46243 19 7.5 19M7.5 11C7.33145 11 7.16468 10.9972 7 10.9918C4.19675 10.9 2 10.0433 2 9M7.5 15C4.46243 15 2 14.1046 2 13M22 11.5C22 12.6046 19.5376 13.5 16.5 13.5C13.4624 13.5 11 12.6046 11 11.5M22 11.5C22 10.3954 19.5376 9.5 16.5 9.5C13.4624 9.5 11 10.3954 11 11.5M22 11.5V19C22 20.1046 19.5376 21 16.5 21C13.4624 21 11 20.1046 11 19V11.5M22 15.25C22 16.3546 19.5376 17.25 16.5 17.25C13.4624 17.25 11 16.3546 11 15.25"
                            stroke="rgb(34 197 94)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Tính lãi xuất kép
                      </li>
                      <li className="flex flex-row gap-3 p-4 rounded cursor-pointer text-slate-800 bg-slate-100 w-96 hover:text-green-600 hover:bg-slate-200">
                        <svg
                          className="w-6 h-6"
                          fill="rgb(34 197 94)"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 481 481"
                        >
                          <path
                            d="M256.7,301.9h-27.5c-10,0-18.1-8.1-18.1-18.1s8.1-18.1,18.1-18.1h48.4c6.6,0,12-5.4,12-12c0-6.6-5.4-12-12-12h-22.7V225
                            c0-6.6-5.4-12-12-12s-12,5.4-12,12v16.7h-1.7c-23.2,0-42.1,18.9-42.1,42.1s18.9,42.1,42.1,42.1h27.5c10,0,18.1,8.1,18.1,18.1
                            s-8.1,18.1-18.1,18.1h-49.3c-6.6,0-12,5.4-12,12c0,6.6,5.4,12,12,12H231v17.1c0,6.6,5.4,12,12,12c6.6,0,12-5.4,12-12v-17.1h2
                            c0.1,0,0.2,0,0.3,0c23-0.3,41.5-19.1,41.5-42.1C298.8,320.8,279.9,301.9,256.7,301.9z"
                          />
                          <path
                            d="M423.3,274.7c-12.6-29-30-57.1-52-83.4c-26.6-32-53.1-53.4-66.6-63.3l51-94.6c2.5-4.7,1.7-10.5-2.2-14.2
                            C340.3,6.3,326.3,0,310.7,0c-14.3,0-27.4,5.4-38.8,10.2c-9,3.7-17.5,7.3-24.4,7.3c-2.1,0-3.9-0.3-5.7-1C218,7.8,199.7,2.4,182,2.4
                            c-22.4,0-41.5,9-60.2,28.2c-3.9,4-4.5,10.3-1.4,15l55,83.1c-13.6,10.1-39.6,31.3-65.7,62.6c-21.9,26.3-39.4,54.4-52,83.4
                            c-15.8,36.5-23.8,74.6-23.8,113.2c0,51.3,41.8,93.1,93.1,93.1h227c51.3,0,93.1-41.8,93.1-93.1
                            C447.1,349.3,439.1,311.2,423.3,274.7z M146,40.6c11.6-10,22.7-14.4,36-14.4c14.2,0,30.2,4.8,51.5,12.7c4.4,1.6,9.1,2.4,13.9,2.4
                            c11.7,0,22.9-4.6,33.6-9.1c10.3-4.3,20.1-8.4,29.6-8.4c4.6,0,11.1,0.8,19.3,6.6l-48,89.2h-83.6L146,40.6z M354,457H127
                            c-38.1,0-69.1-31-69.1-69.1c0-64.1,23.5-124.9,69.7-180.7c29.2-35.3,58.9-57.2,67.9-63.6h89.8c9.1,6.3,38.7,28.3,67.9,63.6
                            c46.3,55.8,69.7,116.5,69.7,180.7C423.1,426,392.1,457,354,457z"
                          />
                        </svg>
                        Lập kế hoạch tiết kiệm
                      </li>
                    </ul>
                  </div>
                ) : (
                  <></>
                )}
              </li>
              <li
                className="relative py-6 "
                onMouseEnter={() => setIsSupportsHovered(true)}
                onMouseLeave={() => setIsSupportsHovered(false)}
              >
                <a
                  href="#"
                  className="px-6 py-8 text-base font-semibold hover:text-green-500"
                >
                  Cẩm nang nghề nghiệp
                </a>
                {isSupportsHovered ? (
                  <ul className="absolute left-0 z-50 flex flex-col gap-3 p-3 text-base font-semibold bg-white border rounded-lg shadow-lg sub-menu top-full border-slate-100">
                    <li className="flex flex-row gap-3 p-4 rounded cursor-pointer text-slate-800 bg-slate-100 w-96 hover:text-green-600 hover:bg-slate-200">
                      <svg
                        className="w-6 h-6"
                        fill="rgb(34 197 94)"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path
                          d="M256,0C114.6,0,0,114.6,0,256s114.6,256,256,256s256-114.6,256-256S397.4,0,256,0z M256,472.6
                          c-119.6,0-216.6-97-216.6-216.6S136.4,39.4,256,39.4s216.6,97,216.6,216.6S375.6,472.6,256,472.6z M118.2,393.8l187.1-88.6
                          l88.6-187.1l-187.1,88.6L118.2,393.8z M285.5,285.5l-118.2,59.1l59.1-118.2L285.5,285.5z"
                        />
                      </svg>
                      Định hướng nghề nghiệp
                    </li>
                    <li className="flex flex-row gap-3 p-4 rounded cursor-pointer text-slate-800 bg-slate-100 w-96 hover:text-green-600 hover:bg-slate-200">
                      <svg
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13 7L11.8845 4.76892C11.5634 4.1268 11.4029 3.80573 11.1634 3.57116C10.9516 3.36373 10.6963 3.20597 10.4161 3.10931C10.0992 3 9.74021 3 9.02229 3H5.2C4.0799 3 3.51984 3 3.09202 3.21799C2.71569 3.40973 2.40973 3.71569 2.21799 4.09202C2 4.51984 2 5.0799 2 6.2V7M2 7H17.2C18.8802 7 19.7202 7 20.362 7.32698C20.9265 7.6146 21.3854 8.07354 21.673 8.63803C22 9.27976 22 10.1198 22 11.8V16.2C22 17.8802 22 18.7202 21.673 19.362C21.3854 19.9265 20.9265 20.3854 20.362 20.673C19.7202 21 18.8802 21 17.2 21H6.8C5.11984 21 4.27976 21 3.63803 20.673C3.07354 20.3854 2.6146 19.9265 2.32698 19.362C2 18.7202 2 17.8802 2 16.2V7ZM15.5 17.5L14 16M15 13.5C15 15.433 13.433 17 11.5 17C9.567 17 8 15.433 8 13.5C8 11.567 9.567 10 11.5 10C13.433 10 15 11.567 15 13.5Z"
                          stroke="rgb(34 197 94)"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Bí kíp tìm việc
                    </li>
                    <li className="flex flex-row gap-3 p-4 rounded cursor-pointer text-slate-800 bg-slate-100 w-96 hover:text-green-600 hover:bg-slate-200">
                      <svg
                        className="w-6 h-6"
                        fill="rgb(34 197 94)"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 485 485"
                      >
                        <path
                          d="M156.106,173.803h30c0-26.824-18.291-49.448-43.053-56.078v-12.579h-30v12.579C88.292,124.356,70,146.979,70,173.803
                          c0,27.442,14.401,47.104,40.553,55.365l2.501,0.79v57.858c-7.838-4.98-13.054-13.734-13.054-23.688H70
                          c0,26.824,18.292,49.448,43.054,56.078v12.579h30v-12.579c24.762-6.63,43.053-29.253,43.053-56.078
                          c0-27.442-14.401-47.104-40.553-55.365l-2.5-0.79v-57.858C150.891,155.096,156.106,163.849,156.106,173.803z M100,173.803
                          c0-9.954,5.216-18.708,13.054-23.688v47.784C103.985,193.191,100,185.676,100,173.803z M156.106,264.128
                          c0,9.954-5.215,18.708-13.053,23.688v-47.784C152.122,244.741,156.106,252.256,156.106,264.128z"
                        />
                        <path
                          d="M485,51.466H0v335h173.526l-13.74,47.068l114.843-33.525l13.543-13.543H485V51.466z M30,356.466v-275h425v65.744
                          l-45.104-45.104L193.311,318.692l-11.027,37.774H30z M420.732,211.479l-38.891-38.891l28.055-28.055l38.891,38.891L420.732,211.479
                          z M258.847,373.364l-54.925,16.034l16.033-54.924l140.673-140.672l38.891,38.891L258.847,373.364z M318.171,356.466L455,219.637
                          v136.829H318.171z"
                        />
                      </svg>
                      Chế độ lương thưởng
                    </li>
                    <li className="flex flex-row gap-3 p-4 rounded cursor-pointer text-slate-800 bg-slate-100 w-96 hover:text-green-600 hover:bg-slate-200">
                      <svg
                        className="w-6 h-6"
                        fill="rgb(34 197 94)"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 54 54"
                      >
                        <path
                          d="M53,10.5H23.535l-3.703-5.555C19.646,4.667,19.334,4.5,19,4.5H1c-0.553,0-1,0.447-1,1v6v4v29.003
                          C0,47.259,2.24,49.5,4.994,49.5h44.012C51.76,49.5,54,47.259,54,44.503V15.5v-4C54,10.947,53.553,10.5,53,10.5z M52,14.5h-6H31H2
                          v-2h21h29V14.5z M32,16.5h13v22l-5.7-7.6c-0.188-0.252-0.485-0.4-0.8-0.4s-0.611,0.148-0.8,0.4L32,38.5V16.5z M2,6.5h16.465
                          l2.667,4H2V6.5z M52,44.503c0,1.652-1.343,2.997-2.994,2.997H4.994C3.343,47.5,2,46.155,2,44.503V16.5h28v25
                          c0,0.431,0.275,0.813,0.684,0.948c0.411,0.14,0.859-0.004,1.116-0.349l6.7-8.933l6.7,8.933c0.192,0.257,0.491,0.4,0.8,0.4
                          c0.105,0,0.212-0.017,0.316-0.052C46.725,42.313,47,41.931,47,41.5v-25h5V44.503z"
                        />
                      </svg>
                      Kiến thức chuyên ngành
                    </li>
                    <li className="flex flex-row gap-3 p-4 rounded cursor-pointer text-slate-800 bg-slate-100 w-96 hover:text-green-600 hover:bg-slate-200">
                      <svg
                        className="w-6 h-6"
                        fill="rgb(34 197 94)"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M8,8 L4,8 L4,13 L11,13 L13,13 L20,13 L20,8 L16,8 L8,8 Z M8,6 L8,5 C8,3.8954305 8.8954305,3 10,3 L14,3 C15.1045695,3 16,3.8954305 16,5 L16,6 L20,6 C21.1045695,6 22,6.8954305 22,8 L22,19 C22,20.1045695 21.1045695,21 20,21 L4,21 C2.8954305,21 2,20.1045695 2,19 L2,8 C2,6.8954305 2.8954305,6 4,6 L8,6 Z M11,15 L4,15 L4,19 L20,19 L20,15 L13,15 L13,16 L11,16 L11,15 Z M14,6 L14,5 L10,5 L10,6 L14,6 Z"
                        />
                      </svg>
                      Hành trang nghề nghiệp
                    </li>
                    <li className="flex flex-row gap-3 p-4 rounded cursor-pointer text-slate-800 bg-slate-100 w-96 hover:text-green-600 hover:bg-slate-200">
                      <svg
                        className="w-6 h-6"
                        fill="rgb(34 197 94)"
                        viewBox="0 0 256 256"
                      >
                        <path d="M228,200h-8V40a8.00008,8.00008,0,0,0-8-8H156a8.00008,8.00008,0,0,0-8,8V80H100a8.00008,8.00008,0,0,0-8,8v40H44a8.00008,8.00008,0,0,0-8,8v64H28a8,8,0,0,0,0,16H228a8,8,0,0,0,0-16ZM108,96h40V200H108ZM52,144H92v56H52Z" />
                      </svg>
                      Thị trường và xu hướng tuyển dụng
                    </li>
                  </ul>
                ) : (
                  <></>
                )}
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex flex-row justify-end gap-3 user-actions">
          {/* NOTIFY BUTTON */}

          {
          isAuthenticated 
          ? <HeaderProfileSection/>
          : (
            <div className="flex items-center list-none">
              <li>
                <button
                  onClick={() => {
                    // loginWithRedirect();
                    navigation("/user-login");
                  }}
                  className="py-2 px-4 rounded-md mx-2 border border-[#00A74B] hover:border-green-800 bg-white"
                >
                  Đăng nhập
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigation("/user-signup");
                  }}
                  className="py-2 px-4 rounded-md mx-2 bg-[#00A74B] hover:bg-green-800 text-white"
                >
                  Đăng kí
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigation("/hr-login");
                  }}
                  className="px-4 py-2 mx-2 text-white bg-black rounded-md hover:bg-gray-800"
                >
                  Đăng tuyển & tìm hồ sơ
                </button>
              </li>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
