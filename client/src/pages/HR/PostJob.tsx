// Thịnh
import "./PostJob.css";

function PostJob() {
  return (
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
            Hoạt động tuyển dụng của doanh nghiệp được tiến hành theo từng giai
            đoạn
            <br /> với các mục tiêu tuyển dụng khác nhau. Chiến dịch tuyển dụng
            là nơi tổng hợp các
            <br /> hoạt động khác nhau của một đợt tuyển dụng được thực hiện
            trên nền tảng TopCV
          </div>
          <div className="banner_button">
            <button className="button">Tìm hiểu thêm</button>
          </div>
        </div>
        <div className="post_info">
          <div className="info_main">Tạo chiến dịch tuyển dụng của bạn</div>
          <div className="info_form">
            <div className="form_item">
              <div className="item_label">Tên chiến dịch tuyển dụng *</div>
              <div className="item_input">
                <input
                  autoFocus
                  type="text"
                  placeholder="VD: Tuyển dụng nhân viên Marketing tháng 10..."
                />
              </div>
              <div className="item_error">
                Tên chiến dịch tuyển dụng không được để trống
              </div>
            </div>
            <div className="form_button">Tiếp theo</div>
          </div>
          <div className="info_ref">
            <div className="ref_head">Tài liệu bạn nên xem</div>
            <div className="ref_description">
              Hiểu về cách chiến dịch tuyển dụng hoạt động sẽ giúp bạn tối ưu
              tốt hơn hoạt động tuyển dụng của doanh nghiệp trên TopCV. Hãy chắc
              chắn bạn đã tìm hiểu thông tin về chiến dịch tuyển dụng.
            </div>
            <div className="ref_links">
              <div className="link_item">
                Smart Recruitment Platform Principle
              </div>
              <div className="link_item">Khái niệm Chiến dịch tuyển dụng</div>
              <div className="link_item">
                Khởi tạo Chiến dịch tuyển dụng đúng cách
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostJob;
