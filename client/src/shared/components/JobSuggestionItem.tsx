import { Building2, MapPin, Trash, Heart } from 'lucide-react';

const JobSuggestionItem = () => {
  return (
    <>
      <div className="max-w-[560px] p-3 rounded-lg flex gap-5 relative border border-[#acf2cb] bg-[#f2fbf6] hover:border-[#00b14f]">
        <div className="p-[6px] h-[120px] w-[120px] bg-white border border-[#e9eaec] rounded-md">
          <img
            src="https://cdn-new.topcv.vn/unsafe/200x/https://static.topcv.vn/company_logos/cong-ty-tnhh-ky-thuat-cong-nghe-moi-truong-long-truong-vu-63ec481d1c752.jpg"
            alt=""
            className="w-full h-full object-contain"
          />
        </div>
        <div className="text-black w-[54%]">
          <div className="line-clamp-2 font-semibold text-[#212f3f] text-lg">
            Trưởng Phòng Hành Chính Nhân Sự - Tại Hồ Chí Minh - Thu Nhập Hấp Dẫn
          </div>
          <div className="mt-2 text-[#6f7882] text-md font-normal flex items-center gap-2">
            <Building2 />
            <span className="line-clamp-1">
              CÔNG TY TNHH KỸ THUẬT CÔNG NGHỆ MÔI TRƯỜNG LONG TRƯỜNG VŨ
            </span>
          </div>
          <div className="mt-2 text-[#6f7882] text-md font-normal flex items-center gap-2">
            <MapPin className="w-[14px] h-[14px]" />
            <span className="line-clamp-1">Hồ Chí Minh</span>
          </div>
        </div>
        <div className="text-black flex flex-col justify-between">
          <div className="font-semibold text-[#00b14f]">Thỏa Thuận</div>
          <div className="flex justify-end gap-2">
            <div className="cursor-pointer p-2 bg-[#fceaea] rounded">
              <Trash className="text-[#e35959] w-[14px] h-[14px]" />
            </div>
            <div className="cursor-pointer p-2 bg-[#e5f7ed] rounded">
              <Heart className="text-[#00b14f] w-[14px] h-[14px]" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobSuggestionItem;
