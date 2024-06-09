import React from 'react';

import { CircleDollarSign, Heart } from 'lucide-react';

const RecruitmentItem = (props) => {
  return (
    <div className="group w-full bg-white border border-[#f4f4f4] rounded-[5px] cursor-pointer flex gap-10 mb-4 p-3 duration-100 hover:bg-[#f6f6f6]">
      <div className="h-[120px] w-[120px] rounded-[8px] object-contain bg-white p-2 flex items-center border border-[#e9eaec]">
        <img
          src="https://cdn-new.topcv.vn/unsafe/150x/https://static.topcv.vn/company_logos/ngan-hang-tmcp-viet-nam-thinh-vuong-vpbank-63e1cb5539e62.jpg"
          alt=""
        />
      </div>
      <div className="w-[75%]">
        <div className="flex justify-between mb-[50px]">
          <div className="w-[75%]">
            <div className="group-hover:text-[#00b14f] line-clamp-2 text-lg font-semibold duration-100">
              Trưởng BP Thu Hồi Nợ Qua Điện Thoại - TA140
            </div>
            <div className="line-clamp-1 text-[#424e5c] font-normal">
              Ngân Hàng TMCP Việt Nam Thịnh Vượng (VPBank)
            </div>
          </div>
          <div className="text-[#00b14f] font-semibold flex items-center">
            <CircleDollarSign className="mr-3" />
            Thỏa thuận
          </div>
        </div>
        <div className="flex gap-x-6 items-center justify-between">
          <div className="flex items-center gap-2 flex-wrap w-[75%]">
            <label
              htmlFor=""
              className="bg-[#e9eaec] rounded-[4px] text-[#212f3f] py-1 px-2 text-sm"
            >
              Hà Nội
            </label>
            <label
              htmlFor=""
              className="bg-[#e9eaec] rounded-[4px] text-[#212f3f] py-1 px-2 text-sm"
            >
              Còn 73 ngày để ứng tuyển
            </label>

            <label
              htmlFor=""
              className="bg-[#e9eaec] rounded-[4px] text-[#212f3f] py-1 px-2 text-sm"
            >
              Cập nhật 1 tuần trước
            </label>
          </div>
          <div className="flex gap-2">
            <div className="py-1 px-2 text-white bg-[#00b14f] rounded-[4px] text-sm">
              Ứng tuyển
            </div>
            <div className="py-1 px-2 text-white bg-[#00b14f] rounded-[4px] text-sm flex items-center justify-center">
              <Heart style={{ width: '14px', height: '14px' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruitmentItem;
