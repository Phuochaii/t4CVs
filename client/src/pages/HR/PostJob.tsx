// Thịnh

import { useState } from "react";
import "./PostJob.css";
import filled from "@material-tailwind/react/theme/components/timeline/timelineIconColors/filled";

const plans = [
    {
        image: "https://tuyendung.topcv.vn/app/_nuxt/img/campaign_post_job.afe6934.png",
        title: "Đăng tin tuyển dụng tại TopCV",
        description:
            "Đăng tin tuyển dụng tiếp cận 7 triệu + ứng viên tiềm năng & nhận về CV ứng tuyển",
        button: "Đăng tin tuyển dụng",
    },
    {
        image: "https://tuyendung.topcv.vn/app/_nuxt/img/campaign_search_cv.82a7863.png",
        title: "Tìm CV ứng viên",
        description:
            "Chủ động tìm CV và liên hệ phỏng vấn với những ứng viên phù hợp",
        button: "Tìm CV",
    },
];

function PostJob() {
    const [modal, setModal] = useState(false);
    const [chosenPlan, setChosenPlan] = useState(plans[1]);
    const toggleModal = () => {
        setModal((prev) => !prev);
    };
    return (
        <>
            <div className="background">
                <div className="post">
                    <div className="post_banner">
                        <div className="banner_img">
                            <img
                                src="https://tuyendung.topcv.vn/app/_nuxt/img/banner-campaign.6a2c052.png"
                                alt="campaign"
                            />
                        </div>
                        <div className="banner_info">
                            Hoạt động tuyển dụng của doanh nghiệp được tiến hành
                            theo từng giai đoạn
                            <br /> với các mục tiêu tuyển dụng khác nhau. Chiến
                            .topcv.v dịch tuyển dụng là nơi tổng hợp các
                            <br /> hoạt động khác nhau của một đợt tuyển dụng
                            được thực hiện trên nền tảng TopCV
                        </div>
                        <div className="banner_button">
                            <button className="button">Tìm hiểu thêm</button>
                        </div>
                    </div>
                    <div className="post_info">
                        <div className="logo p-3 border-[1px] inline-block rounded-lg">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512"
                                width={14}
                                height={14}
                                style={{ fill: "#28a745" }}
                            >
                                <path d="M64 32C64 14.3 49.7 0 32 0S0 14.3 0 32V64 368 480c0 17.7 14.3 32 32 32s32-14.3 32-32V352l64.3-16.1c41.1-10.3 84.6-5.5 122.5 13.4c44.2 22.1 95.5 24.8 141.7 7.4l34.7-13c12.5-4.7 20.8-16.6 20.8-30V66.1c0-23-24.2-38-44.8-27.7l-9.6 4.8c-46.3 23.2-100.8 23.2-147.1 0c-35.1-17.6-75.4-22-113.5-12.5L64 48V32z" />
                            </svg>
                        </div>
                        <div className="info_main">
                            Tạo chiến dịch tuyển dụng của bạn
                        </div>
                        <div className="info_form">
                            <div className="form_item">
                                <div className="item_label">
                                    Tên chiến dịch tuyển dụng *
                                </div>
                                <div className="item_input">
                                    <input
                                        autoFocus
                                        type="text"
                                        placeholder="VD: Tuyển dụng nhân viên Marketing tháng 10..."
                                    />
                                </div>
                                <div className="item_error mt-2 font-medium">
                                    Tên chiến dịch tuyển dụng không được để
                                    trống
                                </div>
                            </div>
                            <div
                                onClick={toggleModal}
                                className="form_button mt-2"
                            >
                                Tiếp theo
                            </div>
                        </div>
                        <div className="info_ref">
                            <div className="ref_head">Tài liệu bạn nên xem</div>
                            <div className="ref_description">
                                Hiểu về cách chiến dịch tuyển dụng hoạt động sẽ
                                giúp bạn tối ưu tốt hơn hoạt động tuyển dụng của
                                doanh nghiệp trên TopCV. Hãy chắc chắn bạn đã
                                tìm hiểu thông tin về chiến dịch tuyển dụng.
                            </div>
                            <div className="ref_links">
                                <div className="link_item">
                                    Smart Recruitment Platform Principle
                                </div>
                                <div className="link_item">
                                    Khái niệm Chiến dịch tuyển dụng
                                </div>
                                <div className="link_item">
                                    Khởi tạo Chiến dịch tuyển dụng đúng cách
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {modal && (
                <div className="modal">
                    <div className="overlay" onClick={toggleModal}></div>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2 className="modal-title">
                                Khởi động chiến dịch:{" "}
                                <span style={{ color: "#00b14f" }}>
                                    Tuyển IT
                                </span>
                            </h2>
                            <div className="close-btn" onClick={toggleModal}>
                                <svg
                                    fill="#000000"
                                    height="20px"
                                    width="20px"
                                    version="1.1"
                                    id="Capa_1"
                                    viewBox="0 0 460.775 460.775"
                                >
                                    <g
                                        id="SVGRepo_bgCarrier"
                                        stroke-width="0"
                                    ></g>
                                    <g
                                        id="SVGRepo_tracerCarrier"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    ></g>
                                    <g id="SVGRepo_iconCarrier">
                                        {" "}
                                        <path d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55 c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55 c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505 c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55 l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719 c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z"></path>{" "}
                                    </g>
                                </svg>
                            </div>
                        </div>
                        <hr />
                        <div className="p-6 flex justify-center flex-col ">
                            <div className="text-2xl text-black font-semibold text-center">
                                Chọn hoạt động tuyển dụng
                            </div>
                            <div className="text-base  text-neutral-700 text-center">
                                Chúng tôi gợi ý những hoạt động bên dưới. Hãy
                                lựa chọn hoạt động phù hợp.
                            </div>
                        </div>
                        <div className="modal-context">
                            <div className="col-md-5 w-[40%] px-4 ">
                                <div
                                    onClick={() => setChosenPlan(plans[0])}
                                    className="cursor-pointer post-job-container py-6 px-5 rounded-lg bg-white active text-center flex flex-col items-center"
                                    style={
                                        chosenPlan === plans[0]
                                            ? {
                                                  background: "#e3faed",
                                                  outline: "1px solid #00b14f",
                                              }
                                            : {}
                                    }
                                >
                                    <div
                                        className="icon w-9 h-9 background-red text-center flex items-center justify-center bg-zinc-100 rounded-full"
                                        style={
                                            chosenPlan === plans[0]
                                                ? {
                                                      background: "#FFF",
                                                  }
                                                : {}
                                        }
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 512 512"
                                            width={14}
                                            height={14}
                                            style={{ fill: "#28a745" }}
                                        >
                                            <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                                        </svg>
                                    </div>
                                    <div
                                        className="mt-4 text-black left-container-title font-semibold"
                                        style={
                                            chosenPlan === plans[0]
                                                ? {
                                                      color: "#00b14f",
                                                  }
                                                : {}
                                        }
                                    >
                                        Đăng tin tuyển dụng
                                    </div>
                                    <div className="text-sm text-neutral-700 mt-1">
                                        Đăng tin tuyển dụng tại TopCV
                                    </div>
                                </div>
                                <div
                                    onClick={() => setChosenPlan(plans[1])}
                                    className="cursor-pointer post-job-container mt-3 py-6 px-5 rounded-lg bg-white active text-center flex flex-col items-center "
                                    style={
                                        chosenPlan === plans[1]
                                            ? {
                                                  background: "#e3faed",
                                                  outline: "1px solid #00b14f",
                                              }
                                            : {}
                                    }
                                >
                                    <div
                                        className="icon w-9 h-9 background-red text-center flex items-center justify-center bg-zinc-100 rounded-full"
                                        style={
                                            chosenPlan === plans[1]
                                                ? {
                                                      background: "#FFF",
                                                  }
                                                : {}
                                        }
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 512 512"
                                            width={14}
                                            height={14}
                                            style={{ fill: "#28a745" }}
                                        >
                                            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                                        </svg>
                                    </div>
                                    <div
                                        className="mt-4 text-black left-container-title font-semibold"
                                        style={
                                            chosenPlan === plans[1]
                                                ? {
                                                      color: "#00b14f",
                                                  }
                                                : {}
                                        }
                                    >
                                        Chủ động tìm kiếm ứng viên
                                    </div>
                                    <div className="text-sm text-neutral-700 mt-1">
                                        Lọc CV ứng viên từ TopCV
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-7 w-[60%] bg-white rounded-lg py-4 max-h-[335px]">
                                <div className="bg-white mt-6 mb-28 flex flex-col  justify-center align-middle items-center text-center ">
                                    <img
                                        width={128}
                                        height={128}
                                        src={chosenPlan.image}
                                        alt="find job"
                                    />
                                    <div className="font-semibold text-black mt-2">
                                        {chosenPlan.title}
                                    </div>
                                    <div className="mx-6 max-w-[350px] text-sm text-neutral-700 mt-1">
                                        {chosenPlan.description}
                                    </div>
                                    <div className="absolute cursor-pointer font-medium text-white bottom-28 py-2 px-4 rounded-md bg-[#00b14f] ">
                                        {chosenPlan.button} -&gt;
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default PostJob;
