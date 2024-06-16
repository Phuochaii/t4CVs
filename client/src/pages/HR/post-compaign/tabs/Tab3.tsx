import { useState, useEffect } from 'react';

const slides = [
  '../../../images/slide_1-PostCompaign3.png',
  '../../../images/slide_2-PostCompaign3.png',
  '../../../images/slide_3-PostCompaign3.png',
  '../../../images/slide_4-PostCompaign3.png',
];

function PostCompaign3({
  next,
  // previous,
}: {
  next: React.MouseEventHandler<HTMLButtonElement>;
  previous: React.MouseEventHandler<HTMLButtonElement>;
}) {
  const autoSlideInterval = 5000;
  const [currentSlide, setCurrentSlide] = useState(0);

  // const previousSlide = () => {
  //   setCurrentSlide((current) =>
  //     current == 0 ? slides.length - 1 : current - 1,
  //   );
  // };

  const nextSlide = () => {
    setCurrentSlide((current) =>
      current == slides.length - 1 ? 0 : current + 1,
    );
  };

  useEffect(() => {
    setInterval(nextSlide, autoSlideInterval);
  }, []);
  return (
    <div className="post-compaign-3 text-black">
      <div className="container">
        <div className="mb-20 mx-auto flex flex-col gap-4">
          <h1 className="text-black text-xl font-bold">
            Thông tin đăng tuyển chi tiết
          </h1>
          <div className="post-compaign-3_content bg-white rounded flex flex-col gap-4 px-4 py-8">
            <div className="post-compaign-3_content--carousel overflow-hidden m-auto w-4/5 h-3/5 border border-slate-300 rounded">
              <div
                className="flex transition-transform duration-500 ease-out w-full"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {slides.map((slide) => (
                  <img src={slide} />
                ))}
              </div>
            </div>
            <div className="post-compaign-3_content--icon m-auto">
              <img
                src="../../../images/logo-PostCompaign3.png"
                className="h-8"
              />
            </div>
            <div className="post-compaign-3_content--text text-center w-4/5 m-auto">
              t4CVs là nền tảng tạo đề thi và đánh giá năng lực nhân sự hàng đầu
              Việt Nam. Hỗ trợ doanh nghiệp thiết lập quy trình tuyển dụng, đào
              tạo nhân sự theo tiêu chuẩn của các tập đoàn lớn như Google,
              Microsoft,...
              <span className="text-sky-700 cursor-pointer">
                {' '}
                Tìm hiểu thêm
              </span>
            </div>
            <div className="post-compaign-3_content--action m-auto">
              <span className="bg-blue-900 py-2 px-4 rounded-full text-white font-semibold cursor-pointer">
                Bắt đầu với Testcenter
              </span>
            </div>
          </div>
          <button style={{ backgroundColor: 'transparent' }} onClick={next}>
            <span className="post-compaign-3_action text-blue-900 text-sm font-bold cursor-pointer hover:text-blue-950">
              Bỏ qua cài đặt bài test và kết thúc
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostCompaign3;
