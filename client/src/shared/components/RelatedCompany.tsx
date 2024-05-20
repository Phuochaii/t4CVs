import React from "react";

const RelatedCompany = ({ company }) => {
    return (
        <div className=" cursor-pointer rounded-lg mb-5 bg-white border-[1px] border-[transparent] hover:border-[#00b14f] flex items-center justify-between py-6 pl-5 pr-7 text-black">
            <div className="flex items-center ">
                <div className="mr-4 w-[84px] h-[84px] flex items-center">
                    <img src={company.avatar} alt="" className="object-cover" />
                </div>
                <div>
                    <div className="text-md font-bold mb-2">{company.name}</div>
                    <div className="inline-block py-1 px-3 bg-[#f4f5f5] rounded text-sm font-medium">
                        {company.num} việc làm
                    </div>
                </div>
            </div>
            <div className="py-2 px-6  rounded-[6px] border-[1px] border-[#00b14f] text-[#00b14f] hover:bg-[#e5f7ed]">
                + Theo dõi
            </div>
        </div>
    );
};

export default RelatedCompany;
