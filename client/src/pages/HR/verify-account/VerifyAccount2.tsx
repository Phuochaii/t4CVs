import { useState, useCallback, useRef } from "react";

function VerifyAccount2() {
    const [firstImage, setFirstImage] = useState(null);
    const [secondImage, setSecondImage] = useState(null);

    const firstImageUploadRef = useRef(null);
    const secondImageUploadRef = useRef(null);
    const handleFirstImageUpload = useCallback((e) => {
        firstImageUploadRef.current?.click(e);
    }, []);
    const firstImagePreview = useCallback((e) => {
        const selectedImage = e.target.files[0];
        if (selectedImage) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setFirstImage(event.target.result);
            };

            reader.readAsDataURL(selectedImage);
        }
    }, []);
    const handleSecondImageUpload = useCallback(() => {
        secondImageUploadRef?.current?.click();
    }, []);
    const secondImagePreview = (e) => {
        const selectedImage = e.target.files[0];

        if (selectedImage) {
            const reader = new FileReader();

            reader.onload = (event) => {
                setSecondImage(event.target.result);
            };

            reader.readAsDataURL(selectedImage);
        }
    };
    return (
        <div className="text-black mt-12 mx-[200px] mb-20 px-8 pt-8 pb-10 bg-white rounded">
            <div className="flex gap-6 pb-4 border-b border-[#e8edf2]">
                <img
                    src="https://tuyendung.topcv.vn/app/_nuxt/img/ekyc-icon.c1f60b4.png"
                    alt="verify-2"
                />
                <div>
                    <div className="text-lg font-semibold text-[#212F3F] mb-2">
                        Xác thực eKYC - xác minh thông tin nhà tuyển dụng
                    </div>
                    <div className="font-base">
                        Thực hiện xác minh thông tin để đảm bảo thông tin chính
                        chủ và tăng cường bảo mật
                    </div>
                </div>
            </div>
            <div className="mt-6 mb-10 flex justify-between text-xl font-semibold text-[#212f3f]">
                <span>Xác thực ảnh CMT/CCCD</span>
                <span>Bước: 1/2</span>
            </div>
            <div className="flex">
                <div className="item mr-8 w-[50%]">
                    <div className="relative w-full inner border border-dashed border-[#a8afb6] h-[206px] rounded-[8px] flex justify-center">
                        {firstImage && (
                            <img
                                src={firstImage}
                                alt=""
                                className="absolute top-0 left-0 h-full w-full object-cover"
                            />
                        )}
                        <input
                            type="file"
                            ref={firstImageUploadRef}
                            onChange={firstImagePreview}
                            style={{ display: "none" }}
                            accept="image/png, image/gif, image/jpeg"
                        />
                        <div
                            className={`absolute w-full bottom-0 py-2 flex justify-center items-center ${firstImage && "bg-white opacity-90"}`}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                                style={{
                                    width: "28px",
                                    height: "28px",
                                    marginRight: "12px",
                                    fill: "#00B14F",
                                }}
                            >
                                <path d="M149.1 64.8L138.7 96H64C28.7 96 0 124.7 0 160V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H373.3L362.9 64.8C356.4 45.2 338.1 32 317.4 32H194.6c-20.7 0-39 13.2-45.5 32.8zM256 192a96 96 0 1 1 0 192 96 96 0 1 1 0-192z" />
                            </svg>
                            <div>
                                <div>Kéo thả ảnh vào hoặc</div>
                                <a
                                    className="underline italic cursor-pointer text-[#00B14F]"
                                    onClick={handleFirstImageUpload}
                                >
                                    Chọn từ máy tính
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="w-full outer text-center my-[10px] text-xl font-light">
                        Mặt trước
                    </div>
                </div>
                <div className="item mr-8 w-[50%]">
                    <div className="relative w-full inner border border-dashed border-[#a8afb6] h-[206px] rounded-[8px] flex justify-center">
                        {secondImage && (
                            <img
                                src={secondImage}
                                alt=""
                                className="absolute top-0 left-0 h-full w-full object-cover"
                            />
                        )}
                        <input
                            type="file"
                            ref={secondImageUploadRef}
                            onChange={secondImagePreview}
                            style={{ display: "none" }}
                            accept="image/png, image/gif, image/jpeg"
                        />
                        <div
                            className={`absolute w-full bottom-0 py-2 flex justify-center items-center ${firstImage && "bg-white opacity-90"}`}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                                style={{
                                    width: "28px",
                                    height: "28px",
                                    marginRight: "12px",
                                    fill: "#00B14F",
                                }}
                            >
                                <path d="M149.1 64.8L138.7 96H64C28.7 96 0 124.7 0 160V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H373.3L362.9 64.8C356.4 45.2 338.1 32 317.4 32H194.6c-20.7 0-39 13.2-45.5 32.8zM256 192a96 96 0 1 1 0 192 96 96 0 1 1 0-192z" />
                            </svg>
                            <div>
                                <div>Kéo thả ảnh vào hoặc</div>
                                <a
                                    className="underline italic cursor-pointer text-[#00B14F]"
                                    onClick={handleSecondImageUpload}
                                >
                                    Chọn từ máy tính
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="w-full outer text-center my-[10px] text-xl font-light">
                        Mặt sau
                    </div>
                </div>
            </div>
            <div className="mt-12 flex justify-between items-center">
                <div className="flex items-center w-[65%]">
                    <img
                        src="data:image/png;base64,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"
                        alt="qr"
                        width={200}
                        height={200}
                    />
                    <span>
                        Quét mã QR để thực hiện xác minh thông tin trên điện
                        thoại
                    </span>
                </div>
                <button
                    className={`cursor-pointer text-white bg-[#00b14f] rounded-[5px] py-4 px-16 text-base ${firstImage && secondImage ? "opacity-100" : "opacity-65 cursor-default"}`}
                >
                    Tiếp tục
                </button>
            </div>
        </div>
    );
}

export default VerifyAccount2;
