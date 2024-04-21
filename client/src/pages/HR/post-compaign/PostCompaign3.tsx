import { useState, useEffect } from 'react';

const slides = [
  '../../../images/slide_1-PostCompaign3.png',
  '../../../images/slide_2-PostCompaign3.png',
  '../../../images/slide_3-PostCompaign3.png',
  '../../../images/slide_4-PostCompaign3.png'
];

function PostCompaign3() {
  const autoSlideInterval = 3000;
  const [currentSlide, setCurrentSlide] = useState(0);

  const previous = () => {
    setCurrentSlide((current) => (current == 0 ? slides.length - 1 : current - 1));
  };

  const next = () => {
    setCurrentSlide((current) => (current == slides.length - 1 ? 0 : current + 1));
  };

  useEffect(() => {
    setInterval(next, autoSlideInterval);
  }, []);
  return (
    <div className="post-compaign-3 text-black">
      <div className="container">
        <div className="max-w-screen-lg mt-5 mb-20 mx-auto flex flex-col gap-4">
          <h2 className="post-compaign-3_title text-2xl font-bold">Thông tin đăng tuyển chi tiết</h2>
          <div className="post-compaign-3_content bg-white rounded flex flex-col gap-4 p-4">
            <div className="post-compaign-3_content--carousel overflow-hidden m-auto w-4/5 h-3/5 border border-slate-300 rounded">
              <div className="flex transition-transform duration-500 ease-out w-full"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                  {slides.map(slide => (
                    <img src={slide} />
                  ))}
              </div>
            </div>
            <div className="post-compaign-3_content--icon m-auto">
              <img src="../../../images/logo-PostCompaign3.png" className="h-8" />
            </div>
            <div className="post-compaign-3_content--text text-center w-4/5 m-auto">
              Testcenter.vn là nền tảng tạo đề thi và đánh giá năng lực nhân sự hàng đầu Việt Nam. Hỗ trợ doanh nghiệp thiết lập quy trình tuyển dụng, đào tạo nhân sự theo tiêu chuẩn của các tập đoàn lớn như Google, Microsoft,...
              <span className="text-sky-700 cursor-pointer"> Tìm hiểu thêm</span>
            </div>
            <div className="post-compaign-3_content--action m-auto">
              <span className="bg-blue-900 py-2 px-4 rounded-full text-white font-semibold cursor-pointer">Bắt đầu với Testcenter</span>
            </div>
          </div>
          <h2 className="post-compaign-3_action max-w-fit m-auto text-blue-900 text-sm font-bold cursor-pointer hover:text-blue-950">Bỏ qua cài đặt bài test và kết thúc</h2>
        </div>
      </div>
    </div>
  );
}

export default PostCompaign3;