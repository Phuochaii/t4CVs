import {
  ArrowLeft,
  Check,
  ChevronDown,
  ChevronLeft,
  CircleAlert,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import React, { SetStateAction, useEffect, useState } from "react";
import { statusColor } from "../../shared/types/RecruitmentStatus.type";
import clsx from "clsx";
import { RecruitmentJobPost } from "../../shared/types/Recruitment.type";

import {
  getJobById,
  updateJobStatus,
} from "../../modules/helper";

function RecruitmentDisplayTable() {
  return (
    <table>
      <thead>
        <tr>
          <td className="font-bold border">Trạng thái</td>
          <td className="font-bold border">Mã đơn hàng</td>
          <td className="font-bold border">Dịch vụ</td>
          <td className="font-bold border">Số lượng</td>
          <td className="font-bold border">Bắt đầu</td>
          <td className="font-bold border">Kết thúc</td>
          <td className="font-bold border">Thao tác</td>
        </tr>
      </thead>
      <tbody>
        <tr className="border">
          <td>Hiện không có dịch vụ nào đang chạy</td>
        </tr>
      </tbody>
    </table>
  );
}

interface RecruitmentDisplayProps {
  recruitment: RecruitmentJobPost;
  refresh: boolean;
  setRefresh: React.Dispatch<SetStateAction<boolean>>;
}

function RecruitmentDisplaySection({
  recruitment,
  refresh,
  setRefresh,
}: RecruitmentDisplayProps) {
  return (
    <div className="flex flex-col gap-4 p-4 bg-white">
      <p>
        Đăng tin tuyển dụng miễn phí và không giới hạn số lượng tin
        đăng là quyền lợi dành cho các Khách hàng Doanh nghiệp chỉ có
        ở TopCV. Đây là cách đơn giản nhất để bắt đầu một chiến dịch
        tuyển dụng. Tin tuyển dụng của bạn sẽ được hiển thị trên Kênh
        việc làm và Kết quả tìm kiếm, tần suất và lượng hiển thị nội
        dung chịu tác động bởi chất lượng nội dung, uy tín thương hiệu
        và khả năng cạnh tranh của nội dung đăng tuyển.
      </p>
      <div className="flex flex-col gap-2">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={async () => {
            await updateJobStatus(recruitment.id, true);
            setRefresh(!refresh);
          }}
        >
          {recruitment.status ? (
            <div className="bg-green-500 border rounded-full">
              <Check stroke="white" size={16} />
            </div>
          ) : (
            <div className="border rounded-full">
              <Check stroke="white" size={16} />
            </div>
          )}
          <span>
            Yêu cầu hiển thị tin tuyển dụng tại Kênh việc làm và Kết
            quả tìm kiếm liên quan
          </span>
        </div>
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={async () => {
            await updateJobStatus(recruitment.id, false);
            setRefresh(!refresh);
          }}
        >
          {!recruitment.status ? (
            <div className="bg-green-500 border rounded-full">
              <Check stroke="white" size={16} />
            </div>
          ) : (
            <div className="border rounded-full">
              <Check stroke="white" size={16} />
            </div>
          )}
          <span>Không công khai tin tuyển dụng</span>
        </div>
        <div className="flex flex-col gap-4 py-4 border-t">
          <div className="flex items-center gap-2 text-sm">
            <CircleAlert size={16} stroke="red" />
            <span>
              Hiện tại Quý khách đang có{" "}
              <span className="font-bold text-red-400">{">= 3"}</span>{" "}
              dụng miễn phí hiển thị đồng thời, để được TopCV duyệt
              hiển thị tin tuyển dụng này, vui lòng sử dụng một trong
              các gói tin đăng cao cấp
            </span>
          </div>
          <RecruitmentDisplayTable />
        </div>
      </div>
      <div className="flex items-center justify-end w-full gap-4 ">
        <button className="px-8 py-3 font-bold bg-slate-200">
          Hủy
        </button>
        <button className="px-8 py-3 font-bold text-white bg-green-500">
          Lưu
        </button>
      </div>
    </div>
  );
}

function CampaignEdit() {
  const { state } = useLocation();
  const [recruitment, setRecruitment] =
    useState<RecruitmentJobPost>(state);
  const [openSection, setOpenSection] = useState(-1);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const response = await getJobById(recruitment.id);
      setRecruitment({
        ...response,
        createdAt: new Date(response.createAt),
        updatedAt: new Date(response.updateAt),
        expiredDate: new Date(response.expiredDate),
        campaign: recruitment.campaign,
      });
    };
    getData();
  }, [refresh]);
  const sections = [
    {
      title: "Nội dung tuyển dụng",
      sectionComponent: <></>,
      subtitle: (
        <h2 className="text-black ">{recruitment.campaign.name}</h2>
      ),
    },
    {
      title: "Hiển thị tin tuyển dụng",
      sectionComponent: (
        <RecruitmentDisplaySection
          recruitment={recruitment}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      ),
      subtitle: (
        <span
          className={clsx(
            "p-1 font-semibold",
            statusColor[
              recruitment.status ? "Đang hiển thị" : "Dừng hiển thị"
            ].bg,
            statusColor[
              recruitment.status ? "Đang hiển thị" : "Dừng hiển thị"
            ].text
          )}
        >
          {recruitment.status ? "Đang hiển thị" : "Dừng hiển thị"}
        </span>
      ),
    },
    {
      title: "Bài Test Tuyển dụng",
      sectionComponent: <></>,
      subtitle: <></>,
    },
  ];
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center gap-2 p-0">
      <div className="flex items-center w-full gap-4 p-4 bg-white">
        <button
          className="flex items-center p-2 bg-gray-200 rounded-sm"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={16} /> Quay lại
        </button>
        <h2 className="font-bold capitalize">
          {recruitment.titleRecruitment}
        </h2>
      </div>
      <div className="w-[90%] flex flex-col gap-8 p-4 justify-center">
        <h1 className="text-2xl font-bold">
          Chỉnh sửa tin tuyển dụng
        </h1>
        {sections.map((section, key) => {
          return (
            <div className="w-full" key={key}>
              <div className="flex items-center w-full gap-2 p-4 text-lg bg-white">
                <h2 className="font-bold">{section.title}</h2>
                {section.subtitle}
                {openSection != key ? (
                  <ChevronLeft
                    className="ml-auto cursor-pointer"
                    onClick={() =>
                      setOpenSection(openSection != key ? key : -1)
                    }
                  />
                ) : (
                  <ChevronDown
                    className="ml-auto cursor-pointer"
                    onClick={() => setOpenSection(-1)}
                  />
                )}
              </div>
              {openSection == key && section.sectionComponent}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CampaignEdit;
