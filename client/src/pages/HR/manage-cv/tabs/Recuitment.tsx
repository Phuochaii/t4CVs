import DayChooseButton from "./components/ChooseDay";
import { ExternalLink } from "lucide-react";
import { LineChart } from "@mui/x-charts/LineChart";
import RecuitmentTable from "./components/RecuimentTable";

function LineNote({ title, color }: { title: string; color: string }) {
  return (
    <div className="flex items-center mr-4">
      <div className="border-y-2  w-8" style={{ borderColor: color }}></div>
      <p className="ml-3">{title}</p>
    </div>
  );
}

function Recuitment() {
  const tableHeading = [
    // "Thao tác",//
    "Tin tuyển dụng",
    "Số lần hiển thị",
    "Số lượt xem",
    "Tỷ lệ xem tin",
    "Số lượng ứng tuyển",
    "Tỷ lệ ứng tuyển",
  ];
  const tableData = [
    {
      title: "Nhân viên kinh doanh",
      show: 100,
      view: 50,
      rateView: "50%",
      apply: 10,
      rateApply: "20%",
    },
  ];
  return (
    <div>
      <div className="border-b-2 border-gray-00 pb-4 pt-2">
        <p className="flex-grow">
          Báo cáo Tin tuyển dụng:{" "}
          <span className="text-green-500 font-bold">Nhân viên kinh doanh</span>
        </p>
      </div>
      <div className="flex">
        <div className="flex-grow">
          <DayChooseButton />
          <LineChart
            xAxis={[{ data: ["1", 2, 3, 5, 8, 10] }]}
            series={[
              {
                data: [2, 5.5, 2, 8.5, 1.5, 5],
              },
            ]}
            width={500}
            height={300}
          />
          <div className="flex">
            <LineNote title="Lượt hiển thị" color="#000000" />
            <LineNote title="Lượt xem" color="#2B59AA" />
            <LineNote title="Lượt ứng tuyển" color="#248232" />
          </div>
        </div>
        <div className="lg:w-1/4 p-3">
          <div className="p-3 border-2 border-gray-300 font-medium">
            <p>
              48 giờ là khoảng thời gian lí tưởng để phản hồi ứng viên. Hãy là
              nhà tuyển dụng chuyên nghiệp. Kiểm tra và phản hồi ứng viên ngay
            </p>
            <button className="bg-green-200 flex p-2 text-green-500  mt-3">
              <ExternalLink size={20} className="mr-1" />
              Kiểm tra CV
            </button>
          </div>
        </div>
      </div>
      <RecuitmentTable
        heading={tableHeading}
        data={tableData}
        objectKey={["title", "show", "view", "rateView", "apply", "rateApply"]}
      />
    </div>
  );
}

export default Recuitment;
