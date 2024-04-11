function Footer() {
    return (
        <>
            <div className=" border-t bg-white py-10 text-black">
                {/* container */}
                <div className="px-48">
                    <div className="main flex justify-between">
                        <div className="info">
                            <div className="title text-3xl font-semibold mb-6">
                                Công ty cổ phần TopCV Việt Nam
                            </div>
                            <div className="flex items-center">
                                <div className="info-item flex items-center mr-8 mb-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 384 512"
                                        width={14}
                                        height={14}
                                        style={{ marginRight: "6px" }}
                                        fill="#00b14f"
                                    >
                                        <path d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H64zM96 64H288c17.7 0 32 14.3 32 32v32c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V96c0-17.7 14.3-32 32-32zm32 160a32 32 0 1 1 -64 0 32 32 0 1 1 64 0zM96 352a32 32 0 1 1 0-64 32 32 0 1 1 0 64zM64 416c0-17.7 14.3-32 32-32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H96c-17.7 0-32-14.3-32-32zM192 256a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm32 64a32 32 0 1 1 -64 0 32 32 0 1 1 64 0zm64-64a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm32 64a32 32 0 1 1 -64 0 32 32 0 1 1 64 0zM288 448a32 32 0 1 1 0-64 32 32 0 1 1 0 64z" />
                                    </svg>
                                    <span className="subject mr-2">
                                        Giấy phép đăng ký kinh doanh số:
                                    </span>
                                    <strong className="value">
                                        0107307178
                                    </strong>
                                </div>
                                <div className="info-item flex items-center mr-8 mb-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 384 512"
                                        width={14}
                                        height={14}
                                        style={{ marginRight: "6px" }}
                                        fill="#00b14f"
                                    >
                                        <path d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128z" />
                                    </svg>
                                    <span className="subject mr-2">
                                        Giấy phép hoạt động dịch vụ việc làm số:
                                    </span>
                                    <strong className="value">
                                        18/SLĐTBXH-GP
                                    </strong>
                                </div>
                            </div>
                            <div className="info-item flex items-center mr-8 mb-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 384 512"
                                    width={14}
                                    height={14}
                                    style={{ marginRight: "6px" }}
                                    fill="#00b14f"
                                >
                                    <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                                </svg>
                                <span className="subject mr-2">Trụ sở HN:</span>
                                <strong className="value">
                                    Tòa FS - GoldSeason số 47 Nguyễn Tuân,
                                    P.Thanh Xuân Trung, Q.Thanh Xuân, Hà Nội
                                </strong>
                            </div>
                            <div className="info-item flex items-center mr-8 mb-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 384 512"
                                    width={14}
                                    height={14}
                                    style={{ marginRight: "6px" }}
                                    fill="#00b14f"
                                >
                                    <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                                </svg>
                                <span className="subject mr-2">
                                    Chi nhánh HCM:
                                </span>
                                <strong className="value">
                                    Tòa nhà Dali, 24C Phan Đăng Lưu, P.6, Q.Bình
                                    Thạnh, TP HCM
                                </strong>
                            </div>
                        </div>
                        <div className="box-qr flex flex-col items-center">
                            <img
                                width={120}
                                height={120}
                                src="https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/v4/image/footer/qr_code.png"
                                alt=""
                            />
                            <div className="link text-[#00b14f] text-sm font-medium mt-3">
                                topcv.com.vn
                            </div>
                        </div>
                    </div>
                    <div className="list-ecosystem">
                        <div className="title text-[#212f3f] text-md font-semibold mb-5">
                            Hệ sinh thái HR Tech của TopCV
                        </div>
                        <div className="grid grid-cols-4 gap-6 justify-between">
                            <a
                                href="https://www.topcv.vn/"
                                className=" flex items-center no-underline items-center p-6 bg-gradient-to-r from-[#213142] to-[#0a9c4b] gap-3 min-h-['72px'] flex rounded-lg"
                            >
                                <img
                                    src="https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/v4/image/footer/topcv-logo.png"
                                    alt="logo"
                                    width={60}
                                    object-contain
                                />
                                <span className="text-white text-sm font-medium leading-tight	">
                                    Nền tảng công nghệ tuyển dụng thông minh
                                    TopCV.vn
                                </span>
                            </a>

                            <a
                                href="https://happytime.vn/"
                                className="flex items-center no-underline items-center p-6 bg-gradient-to-r from-[#fd7222] to-[#edab28] gap-3 min-h-['72px'] flex rounded-lg"
                            >
                                <img
                                    src="https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/v4/image/footer/happy_time.png"
                                    alt="logo"
                                    width={60}
                                    style={{ maxHeight: "40px" }}
                                />
                                <span className="text-white text-sm font-medium leading-tight	">
                                    Nền tảng quản lý & gia tăng trải nghiệm nhân
                                    viên HappyTime.vn
                                </span>
                            </a>

                            <a
                                href="https://www.testcenter.vn/"
                                className="flex items-center no-underline items-center p-6 bg-gradient-to-r from-[#2a3a4d] to-[#0e60d8] gap-3 min-h-['72px'] flex rounded-lg"
                            >
                                <img
                                    src="https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/v4/image/footer/testcenter.png"
                                    alt="logo"
                                    width={60}
                                    style={{ maxHeight: "40px" }}
                                />
                                <span className="text-white text-sm font-medium leading-tight	">
                                    Nền tảng thiết lập và đánh giá năng lực nhân
                                    viên TestCenter.vn
                                </span>
                            </a>

                            <a
                                href="https://www.shiring.ai/"
                                className="flex items-center no-underline items-center p-6 bg-gradient-to-r from-[#009941] to-[#0bca5d] gap-3 min-h-['72px'] flex rounded-lg"
                            >
                                <img
                                    src="https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/v4/image/footer/SHiring.png"
                                    alt="logo"
                                    width={60}
                                    style={{ maxHeight: "40px" }}
                                />
                                <span className="text-white text-sm font-medium leading-tight	">
                                    Giải pháp quản trị tuyển dụng hiệu suất cao
                                    SHiring.ai
                                </span>
                            </a>
                        </div>
                    </div>
                    <div className="copyright text-[#4d5965] text-md mt-7 text-center font-light	">
                        © 2014-2024 TopCV Vietnam JSC. All rights reserved.
                    </div>
                </div>
            </div>
        </>
    );
}

export default Footer;
