import { ArrowLeft } from "lucide-react";

interface NumberLabelWidgetProps {
  title: string;
  number: number;
  color?: string;
}

function NumberLabelWidget(item: NumberLabelWidgetProps) {
  return (
    <div
      className="bg-white w-30 px-3 py-2 w-full"
      style={{ color: item.color }}
    >
      <p className="capitalize font-medium font-xs">{item.title}</p>
      <p className=" text-xl font-bold mt-3">{item.number}</p>
    </div>
  );
}

function Recuitment() {
  const numberData = [
    {
      title: "Tổng số CV ứng tuyển",
      number: 10,
    },
    {
      title: "CV ứng tuyển ",
      number: 5,
      color: "green",
    },
    {
      title: "CV mở liên hệ",
      number: 3,
      color: "red",
    },
    {
      title: "Số Credit đã sử dụng",
      number: 2,
      color: "#E5B83F",
    },
    {
      title: "Số lượt mở CV đã dùng",
      number: 1,
      color: "#4B71DA",
    },
  ];
  return (
    <>
      <div
        className="bg-white w-full flex items-center text-xm py-4"
        style={{ marginLeft: "1px", paddingLeft: "20px" }}
      >
        <button className="flex items-center bg-slate-100 px-3 py-1 font-medium">
          <ArrowLeft size={16} className="mr-1" />
          Quay lại
        </button>
        <p className="text-slate-500 font-medium mx-5">Chi tiết chiến dịch: </p>
        <p className="font-semibold">Tuyển nhân viên kinh doanh</p>
      </div>

      {/*  */}

      <div style={{ maxWidth: "1206px" }}>
        <div className="flex mt-6 mx-6 justify-between">
          {numberData.map((item, index) => (
            <div
              className={`flex-1 ${index != numberData.length - 1 ? "mr-5" : ""}`}
            >
              <NumberLabelWidget
                title={item.title}
                number={item.number}
                color={item.color}
              />
            </div>
          ))}
        </div>
        <div className="mt-6 mx-6 items-center rounded-lg bg-white">
          <div
            className="flex justify-between"
            style={{ padding: "15.96px" }}
          ></div>
        </div>
      </div>
    </>
  );
}

export default Recuitment;
