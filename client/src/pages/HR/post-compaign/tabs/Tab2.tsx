import { RadioGroup, FormControlLabel, Radio } from "@mui/material";

function PostCompaign2({
  next,
  previous,
}: {
  next: React.MouseEventHandler<HTMLButtonElement>;
  previous: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <div className="flex flex-col overflow-x-hidden">
      <div className="container">
        <div className=" mx-auto">
          <div className="post-compaign-2_content flex flex-col gap-5">
            <h1 className="text-black text-xl font-bold">
              Thông tin đăng tuyển chi tiết
            </h1>
            <div className="post-compaign-2_content-item--options bg-white rounded p-6 flex flex-col gap-4">
              <div className="post-compaign-2_content-item--option flex flex-row gap-3 items-center text-lg font-semibold">
                <span className="p-2 bg-slate-200 rounded-full p-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      strokeLinejoin="round"
                      d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
                    />
                  </svg>
                </span>
                Hiển thị tin tuyển dụng
              </div>
              <div className="post-compaign-2_content-item--option text-left font-medium">
                Đăng tin tuyển dụng miễn phí và không giới hạn số lượng tin đăng
                là quyền lợi dành cho các Khách hàng Doanh nghiệp chỉ có ở
                TopCV. Đây là cách đơn giản nhất để bắt đầu một chiến dịch tuyển
                dụng. Tin tuyển dụng của bạn sẽ được hiển thi trên Kênh làm việc
                và Kết quả tìm kiếm, tần xuất và lượng hiển thị nội dung chịu
                tác động bởi chất lượng nội dung, uy tính thương hiệu và khả
                năng cạnh tranh của nội dung đăng tuyển.
              </div>
              <div className="post-compaign-2_content-item--option">
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="public"
                  name="radio-group"
                >
                  <FormControlLabel
                    className="max-h-8 text-slate-400"
                    value="public"
                    control={<Radio />}
                    label="Yêu cầu hiển thị tin tuyển dụng tại Kênh việc làm và Kết quả tìm kiếm việc làm"
                  />
                  <FormControlLabel
                    className="max-h-8 text-slate-400"
                    value="hide"
                    control={<Radio />}
                    label="Không công khai tin tuyển dụng"
                  />
                </RadioGroup>
              </div>
            </div>
            <div className="post-compaign-2_content-item--more-options bg-white rounded p-6 flex flex-col gap-4">
              <div className="post-compaign-2_content-item--option flex flex-row gap-3 items-center text-lg font-semibold">
                <span className=" bg-slate-200 rounded-full p-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      strokeLinejoin="round"
                      d="m15 11.25 1.5 1.5.75-.75V8.758l2.276-.61a3 3 0 1 0-3.675-3.675l-.61 2.277H12l-.75.75 1.5 1.5M15 11.25l-8.47 8.47c-.34.34-.8.53-1.28.53s-.94.19-1.28.53l-.97.97-.75-.75.97-.97c.34-.34.53-.8.53-1.28s.19-.94.53-1.28L12.75 9M15 11.25 12.75 9"
                    />
                  </svg>
                </span>
                Sử dụng gói tin đăng cao cấp
                <span className="recommend-tag uppercase text-base text-green-400 bg-green-100 rounded px-2">
                  Nên chọn
                </span>
              </div>
              <div className="post-compaign-2_content-item--option text-left font-medium">
                Sử dụng gói tin đăng cao cấp là cách đơn giản nhất để tin tuyển
                dụng của bạn hiển thị thường xuyên hơn với ứng viên tiềm năng và
                mang lại nhiều CV ứng tuyển hơn. Lựa chọn gói tin đăng VIP mà
                bạn muốn kích hoạt cùng với tin tuyển dụng này trong bảng bên
                dưới.
              </div>
              <div className="post-compaign-2_content-item--option">
                <table className="border border-slate-200 rounded border-collapse w-full">
                  <thead>
                    <tr className="grid grid-cols-12">
                      <th className="col-span-1 border border-slate-200 text-slate-400 p-2 text-left text-base font-medium">
                        Chọn
                      </th>
                      <th className="col-span-2 border border-slate-200 text-slate-400 p-2 text-left text-base font-medium">
                        Mã đơn hàng
                      </th>
                      <th className="col-span-2 border border-slate-200 text-slate-400 p-2 text-left text-base font-medium">
                        Dịch vụ
                      </th>
                      <th className="col-span-2 border border-slate-200 text-slate-400 p-2 text-left text-base font-medium">
                        Kích hoạt dịch vụ
                      </th>
                      <th className="col-span-2 border border-slate-200 text-slate-400 p-2 text-left text-base font-medium">
                        Hạn kích hoạt
                      </th>
                      <th className="col-span-1 border border-slate-200 text-slate-400 p-2 text-left text-base font-medium">
                        Số lượng
                      </th>
                      <th className="col-span-2 border border-slate-200 text-slate-400 p-2 text-left text-base font-medium">
                        Ngày bắt đầu
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-slate-200 font-medium col-span-12">
                        Bạn chưa có dịch vụ nào dành cho tin tuyển dụng
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="post-compaign-2_content-item--option flex flex-row gap-1 items-center text-green-600 font-medium bg-green-200 rounded px-2 py-1 max-w-fit cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="rgb(22 163 74)"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    stroke-linecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                Mua thêm dịch vụ
              </div>
            </div>
            <div className="post-compaign-2_content-item--actions flex flex-row justify-between font-bold">
              <button
                onClick={previous}
                className="post-compaign-2_content-item--action btn-back py-2 px-4 rounded bg-slate-300 shadow-md cursor-pointer"
              >
                Quay lại
              </button>
              <button
                onClick={next}
                className="post-compaign-2_content-item--action btn-success py-2 px-4 rounded text-white bg-green-500 shadow-md cursor-pointer"
              >
                Hoàn tất
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCompaign2;
