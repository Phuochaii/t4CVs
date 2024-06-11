function Footer() {
  return (
    <>
      <div className="py-10 text-black bg-white border-t ">
        {/* container */}
        <div className="px-48">
          <div className="flex justify-between main">
            <div className="info">
              <div className="mb-6 text-3xl font-semibold title">
                Công ty cổ phần t4CVs Việt Nam
              </div>
              <div className="flex items-center">
                <div className="flex items-center mb-2 mr-8 info-item">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                    width={14}
                    height={14}
                    style={{ marginRight: '6px' }}
                    fill="#00b14f"
                  >
                    <path d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H64zM96 64H288c17.7 0 32 14.3 32 32v32c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V96c0-17.7 14.3-32 32-32zm32 160a32 32 0 1 1 -64 0 32 32 0 1 1 64 0zM96 352a32 32 0 1 1 0-64 32 32 0 1 1 0 64zM64 416c0-17.7 14.3-32 32-32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H96c-17.7 0-32-14.3-32-32zM192 256a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm32 64a32 32 0 1 1 -64 0 32 32 0 1 1 64 0zm64-64a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm32 64a32 32 0 1 1 -64 0 32 32 0 1 1 64 0zM288 448a32 32 0 1 1 0-64 32 32 0 1 1 0 64z" />
                  </svg>
                  <span className="mr-2 subject">
                    Giấy phép đăng ký kinh doanh số:
                  </span>
                  <strong className="value">0107307178</strong>
                </div>
                <div className="flex items-center mb-2 mr-8 info-item">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                    width={14}
                    height={14}
                    style={{ marginRight: '6px' }}
                    fill="#00b14f"
                  >
                    <path d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128z" />
                  </svg>
                  <span className="mr-2 subject">
                    Giấy phép hoạt động dịch vụ việc làm số:
                  </span>
                  <strong className="value">18/SLĐTBXH-GP</strong>
                </div>
              </div>
              <div className="flex items-center mb-2 mr-8 info-item">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                  width={14}
                  height={14}
                  style={{ marginRight: '6px' }}
                  fill="#00b14f"
                >
                  <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                </svg>
                <span className="mr-2 subject">Cơ sở 1:</span>
                <strong className="value">
                  227 Nguyễn Văn Cừ, Phường 4, Quận 5, Thành phố Hồ Chí Minh
                </strong>
              </div>
              <div className="flex items-center mb-2 mr-8 info-item">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                  width={14}
                  height={14}
                  style={{ marginRight: '6px' }}
                  fill="#00b14f"
                >
                  <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                </svg>
                <span className="mr-2 subject">Cơ sở 2:</span>
                <strong className="value">
                  Khu phố 6, Phường Linh Trung, Thành phố Thủ Đức, Thành phố Hồ
                  Chí Minh
                </strong>
              </div>
            </div>
            <div className="flex flex-col items-center box-qr">
              <img
                width={120}
                height={120}
                src="https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/v4/image/footer/qr_code.png"
                alt=""
              />
              <div className="link text-[#00b14f] text-sm font-medium mt-3">
                t4CVs.com.vn
              </div>
            </div>
          </div>
          <div className="list-ecosystem">
            <div className="title text-[#212f3f] text-md font-semibold mb-5">
              Hệ sinh thái HR Tech của t4CVs
            </div>
            <div className="grid justify-between grid-cols-4 gap-6">
              <a
                href="https://www.topcv.vn/"
                className=" flex no-underline items-center p-6 bg-gradient-to-r from-[#213142] to-[#0a9c4b] gap-3 min-h-['72px'] rounded-lg"
              >
                <img
                  src="../../../images/t4CVs.png"
                  alt="logo"
                  width={60}
                  className="object-contain "
                />
                <span className="text-sm font-medium leading-tight text-white ">
                  Nền tảng công nghệ tuyển dụng thông minh t4CVs
                </span>
              </a>

              <a
                href="https://happytime.vn/"
                className="flex no-underline items-center p-6 bg-gradient-to-r from-[#fd7222] to-[#edab28] gap-3 min-h-['72px'] rounded-lg"
              >
                <img
                  src="https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/v4/image/footer/happy_time.png"
                  alt="logo"
                  width={60}
                  style={{ maxHeight: '40px' }}
                />
                <span className="text-sm font-medium leading-tight text-white ">
                  Nền tảng quản lý & gia tăng trải nghiệm nhân viên HappyTime.vn
                </span>
              </a>

              <a
                href="https://www.testcenter.vn/"
                className="no-underline items-center p-6 bg-gradient-to-r from-[#2a3a4d] to-[#0e60d8] gap-3 min-h-['72px'] flex rounded-lg"
              >
                <img
                  src="https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/v4/image/footer/testcenter.png"
                  alt="logo"
                  width={60}
                  style={{ maxHeight: '40px' }}
                />
                <span className="text-sm font-medium leading-tight text-white ">
                  Nền tảng thiết lập và đánh giá năng lực nhân viên t4CVs
                </span>
              </a>

              <a
                href="https://www.shiring.ai/"
                className="no-underline items-center p-6 bg-gradient-to-r from-[#009941] to-[#0bca5d] gap-3 min-h-['72px'] flex rounded-lg"
              >
                <img
                  src="https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/v4/image/footer/SHiring.png"
                  alt="logo"
                  width={60}
                  style={{ maxHeight: '40px' }}
                />
                <span className="text-sm font-medium leading-tight text-white ">
                  Giải pháp quản trị tuyển dụng hiệu suất cao SHiring.ai
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
