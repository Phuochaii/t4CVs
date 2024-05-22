import React from "react";

const TopCompanyItem = ({ item }) => {
    return (
        <>
            <div className="cursor-pointer min-h-[208px] w-[270px] border border-[#dee0e2] rounded-xl p-4 duration-300 text-black hover:border-[#33c172]">
                <div className="py-1 px-[6px] font-medium rounded-md inline-block bg-orange-400 text-white">
                    {item.code}
                </div>
                <div className="w-full mt-1 flex items-center justify-center">
                    <img
                        className="w-[96px] h-[96px]  object-contain"
                        src={item.image}
                        alt="Logo"
                    />
                </div>
                <div className="mt-2 text-center line-clamp-2 color-[#212f3f] font-bold">
                    {item.name}
                </div>
            </div>
        </>
    );
};

export default TopCompanyItem;
