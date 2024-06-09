import React, { useState } from 'react';

const SearchCompany = ({ onSearch }) => {
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    onSearch(inputText);
  };

  return (
    <div className="min-h-[273px] pt-6 mb-0 w-full bg-gradient-to-r from-[#f8fffa] to-[#cbffe1]">
      <div className="flex w-full px-[90px]">
        <div className="text-black">
          <div className="pb-[33px] flex">
            <div className="mr-8">
              <a
                href="/companies"
                className="font-semibold py-3 border-b-2 border-[#333]"
              >
                Danh sách công ty
              </a>
            </div>
            <div className="mr-6">
              <a href="#!" className="py-3">
                Top công ty
              </a>
            </div>
          </div>
          <div className="text-[#00b14f] text-2xl pb-4 font-medium">
            Khám phá 100.000+ công ty nổi bật
          </div>
          <div className="text-lg mb-[37px]">
            Tra cứu thông tin công ty và tìm kiếm nơi làm việc tốt nhất dành cho
            bạn
          </div>
          <form
            onSubmit={handleSubmit}
            className="bg-white h-[50px] border-[1px] border-white overflow-hidden rounded-full flex items-center justify-between px-8 duration-300	 hover:border-[#00b14f]"
          >
            <div className="flex items-center w-[80%]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                style={{
                  width: '14px',
                  height: '14px',
                  marginRight: '20px',
                }}
              >
                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
              </svg>
              <input
                type="text"
                placeholder="Nhập tên công ty"
                className="bg-white focus:outline-none w-full"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="text-white bg-[#00b14f] rounded-full py-[6px] px-3 translate-x-1/4 text-lg cursor-pointer"
            >
              Tìm kiếm
            </button>
          </form>
        </div>
        <div className="ml-auto text-right">
          <img
            width={'272px'}
            src="https://static.topcv.vn/v4/image/brand-identity/company-billBoard.png?v=1.0.0"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default SearchCompany;
