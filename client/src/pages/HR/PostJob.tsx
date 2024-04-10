// Thịnh

import { useState } from "react";
import "./PostJob.css";

function PostJob() {
    const [modal, setModal] = useState(false);
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
                            dịch tuyển dụng là nơi tổng hợp các
                            <br /> hoạt động khác nhau của một đợt tuyển dụng
                            được thực hiện trên nền tảng TopCV
                        </div>
                        <div className="banner_button">
                            <button className="button">Tìm hiểu thêm</button>
                        </div>
                    </div>
                    <div className="post_info">
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
                                <div className="item_error">
                                    Tên chiến dịch tuyển dụng không được để
                                    trống
                                </div>
                            </div>
                            <div onClick={toggleModal} className="form_button">
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
                                Khởi động chiến dịch
                            </h2>
                            <div className="close-btn" onClick={toggleModal}>
                                X
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
                                <div className="cursor-pointer post-job-container py-6 px-5 rounded-lg bg-white active text-center">
                                    <div className="icon"></div>
                                    <div className="text-black left-container-title font-semibold">
                                        Đăng tin tuyển dụng
                                    </div>
                                    <div className="text-sm text-neutral-700 mt-1">
                                        Đăng tin tuyển dụng tại TopCV
                                    </div>
                                </div>
                                <div className="cursor-pointer post-job-container mt-3 py-6 px-5 rounded-lg bg-white active text-center">
                                    <div className="icon"></div>
                                    <div className="text-black left-container-title font-semibold">
                                        Đăng tin tuyển dụng
                                    </div>
                                    <div className="text-sm text-neutral-700 mt-1">
                                        Đăng tin tuyển dụng tại TopCV
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-7 w-[60%] bg-white rounded-lg py-4 ">
                                <div className="bg-white my-12 flex flex-col  justify-center align-middle items-center text-center ">
                                    <img
                                        width={128}
                                        height={128}
                                        src="https://tuyendung.topcv.vn/app/_nuxt/img/campaign_search_cv.82a7863.png"
                                        alt="find job"
                                    />
                                    <div className="font-semibold text-black mt-2">
                                        Tìm CV ứng viên
                                    </div>
                                    <div className="text-sm text-neutral-700 mt-1">
                                        Chủ động tìm CV và liên hệ phỏng vấn với
                                        <br />
                                        những ứng viên phù hợp
                                    </div>
                                    <div className="cursor-pointer font-medium text-white mt-3 py-2 px-4 rounded-md bg-[#00b14f] ">
                                        Tìm CV -&gt;
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
