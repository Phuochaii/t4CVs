// khoa
import { useState, useEffect } from "react";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import JobService from "../../modules/job-module";

import SearchBoxComponent from "../../layouts/UserLayout/components/SearchBoxComponent";
import TopCompanies from "../../shared/components/TopCompanies";
import { salary_range } from "../../shared/utils/constant";

const slides = [
    "../../../images/slide_1.png",
    "../../../images/slide_2.png",
    "../../../images/slide_3.png",
    "../../../images/slide_4.png",
    "../../../images/slide_5.png",
];

interface filterSearch {
    titleRecruitment: string;
    salaryMin: number;
    salaryMax: number;
    locationId: number;
    expId: number;
}

function Home() {
    const autoSlideInterval = 5000;
    const [currentSlide, setCurrentSlide] = useState(0);

    const [cities, setCities] = useState<any[]>([]);
    const [exp_year, setExpYear] = useState<any[]>([]);

    const [filter, setFilter] = useState<filterSearch>({
        titleRecruitment: "",
        salaryMin: 0,
        salaryMax: 0,
        locationId: 0,
        expId: 0,
    });

    const previous = () => {
        setCurrentSlide((current) =>
            current == 0 ? slides.length - 1 : current - 1
        );
    };

    const next = () => {
        setCurrentSlide((current) =>
            current == slides.length - 1 ? 0 : current + 1
        );
    };

    const navigation = useNavigate();

    const SelectLocation = (value: number) => {
        setFilter((prevState) => ({ ...prevState, locationId: value }));
    };

    const SelectExp = (value: number) => {
        setFilter((prevState) => ({ ...prevState, expId: value }));
    };

    const setTitleRecruitment = (value: string) => {
        setFilter((prevState) => ({ ...prevState, titleRecruitment: value }));
    };

    const SelectSalary = (value: number) => {
        if (value !== 0) {
            const foundRange = salary_range.find(
                (range) => Number(range.value) === value
            );
            if (foundRange) {
                setFilter((prevFilter) => ({
                    ...prevFilter,
                    salaryMin: foundRange.minSalary,
                    salaryMax: foundRange.maxSalary,
                }));
            }
        } else {
            setFilter((prevFilter) => ({
                ...prevFilter,
                salaryMin: 0,
                salaryMax: 0,
            }));
        }
    };

    useEffect(() => {
        setInterval(next, autoSlideInterval);
        const fetchData = async () => {
            try {
                const locationResponse = await JobService.getAllLocation();
                setCities(locationResponse);

                const expResponse = await JobService.getAllExp();
                setExpYear(expResponse);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const handleSearch = () => {
        const queryParams = {
            titleRecruitment:
                filter.titleRecruitment !== ""
                    ? `titleRecruitment=${filter.titleRecruitment}`
                    : "",
            salaryMin:
                filter.salaryMin !== 0 ? `salaryMin=${filter.salaryMin}` : "",
            salaryMax:
                filter.salaryMax !== 0 ? `salaryMax=${filter.salaryMax}` : "",
            locationId:
                filter.locationId !== 0
                    ? `locationId=${filter.locationId}`
                    : "",
            expId: filter.expId !== 0 ? `expId=${filter.expId}` : "",
        };

        const queryString = Object.values(queryParams)
            .filter((param) => param !== "")
            .join("&");

        navigation(`/results?${queryString}`);
    };

    return (
        <>
            <div className="section-header">
                <div className="container flex flex-col gap-4">
                    <div className="hearder-box text-center">
                        <h1 className="title">
                            Tìm việc làm nhanh 24h, việc làm mới nhất trên toàn
                            quốc.
                        </h1>
                        <p className="description">
                            Tiếp cận{" "}
                            <span className="font-medium">40,000+</span> tin
                            tuyển dụng việc làm mỗi ngày từ hàng nghìn doanh
                            nghiệp uy tín tại Việt Nam
                        </p>
                    </div>

                    <div className="max-w-screen-lg mx-auto">
                        <SearchBoxComponent
                            cities={cities}
                            setCities={setCities}
                            exp_year={exp_year}
                            setExpYear={setExpYear}
                            locationId={filter.locationId}
                            setLocationId={SelectLocation}
                            expId={filter.expId}
                            setExpId={SelectExp}
                            titleRecruitment={filter.titleRecruitment}
                            setTitleRecruitment={setTitleRecruitment}
                            handleSearch={handleSearch}
                        />
                    </div>
                </div>

                <div className="box-work-market flex flex-row justify-center gap-4 text-black my-8">
                    <div className="box-work-market__item flex flex-row gap-2 items-center">
                        <span className="lable-item text-sm">
                            Vị trí chờ bạn khám phá
                        </span>
                        <span className="quantity item-number number-job-new-today">
                            46.052
                        </span>
                    </div>
                    <div className="box-work-market__item flex flex-row gap-2 items-center">
                        <span className="mr-2">•</span>
                        <span className="lable-item text-sm">
                            Việc làm mới nhất
                        </span>
                        <span className="quantity item-number number-job-new-today">
                            2.396
                        </span>
                    </div>
                    <div className="box-work-market__item flex flex-row gap-2 items-center">
                        <span className="mr-2">•</span>
                        <span className="lable-item text-sm">
                            Cập nhật lúc:{" "}
                        </span>
                        <span className="time-scan item-number number-job-new-today">
                            00:33 06/04/2024
                        </span>
                    </div>
                </div>

                <div className="section-banner-vip-company flex justify-center">
                    <div className="max-w-screen-lg relative">
                        <div className="overflow-hidden rounded-lg">
                            <div
                                className="flex transition-transform duration-500 ease-out w-full"
                                style={{
                                    transform: `translateX(-${currentSlide * 100}%)`,
                                }}
                            >
                                {slides.map((slide) => (
                                    <img src={slide} />
                                ))}
                            </div>
                        </div>
                        <button
                            onClick={previous}
                            className="absolute w-10 h-10 top-1/2 -left-5 bg-white text-green-500 rounded-full transform -translate-y-1/2 shadow-lg shadow-grey-500/40 hover:bg-green-500 hover:text-white ease-out duration-300"
                        >
                            <ChevronLeftIcon className="mx-2 w-5 h-5" />
                        </button>
                        <button
                            onClick={next}
                            className="absolute w-10 h-10 top-1/2 -right-5 bg-white text-green-500 rounded-full transform -translate-y-1/2 shadow-lg shadow-grey-500 hover:bg-green-500 hover:text-white ease-out duration-300"
                        >
                            <ChevronRightIcon className="mx-3 w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
            <TopCompanies />
        </>
    );
}

export default Home;
