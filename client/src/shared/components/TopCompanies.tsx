import TopCompanyItem from "./TopCompanyItem";

const topCompanies = [
    {
        id: 1,
        code: "VNR500",
        image: "https://static.topcv.vn/company_logos/cong-ty-co-phan-cong-nghe-sao-bac-dau-57ff85a838be7_rs.jpg",
        name: "CÔNG TY CỔ PHẦN CÔNG NGHỆ SAO BẮC ĐẨU",
    },
    {
        id: 2,
        code: "V1000",
        image: "https://static.topcv.vn/company_logos/cong-ty-co-phan-hanacans-d3dda8c3e777f28b43aa2904cc9101e5-65096c5909b2b.jpg",
        name: "CÔNG TY CỔ PHẦN HANACANS ",
    },
    {
        id: 3,
        code: "VNR500",
        image: "https://static.topcv.vn/company_logos/cong-ty-co-phan-cong-nghe-sao-bac-dau-57ff85a838be7_rs.jpg",
        name: "CÔNG TY CỔ PHẦN CÔNG NGHỆ SAO BẮC ĐẨU",
    },
    {
        id: 4,
        code: "V1000",
        image: "https://static.topcv.vn/company_logos/cong-ty-co-phan-hanacans-d3dda8c3e777f28b43aa2904cc9101e5-65096c5909b2b.jpg",
        name: "CÔNG TY CỔ PHẦN HANACANS ",
    },
];

const TopCompanies = () => {
    return (
        <>
            <div className="w-full px-[170px] bg-white">
                <div className="pt-6 text-3xl font-bold text-[#00b14f]">
                    Top công ty hàng đầu
                </div>
                <div className="mt-5 flex gap-5 items-center justify-between">
                    {topCompanies.map((item) => (
                        <TopCompanyItem key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default TopCompanies;
