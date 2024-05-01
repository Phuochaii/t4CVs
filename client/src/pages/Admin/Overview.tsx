import { CalendarCheck } from "lucide-react";
import GradientIcon from "../../layouts/AdminLayout/components/GradientIcon";
import OverviewCard from "../../layouts/AdminLayout/components/OverviewCard";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";

function Overview() {
  const [data] = useState([
    {
      title: "HR",
      rows: [
        {
          title: "Evil Incorporated",
          number: "400",
        },
        {
          title: "Rockstar",
          number: "400",
        },
        {
          title: "Rito",
          number: "400",
        },
        {
          title: "Volvo",
          number: "400",
        },
      ],
    },
    {
      title: "User",
      rows: [
        {
          title: "Mac Zucc",
          number: "25",
        },
        {
          title: "Jeff Bezos",
          number: "500",
        },
        {
          title: "Zilong Ma",
          number: "1000",
        },
        {
          title: "Cho Bite'm",
          number: "500",
        },
      ],
    },
    {
      title: "Campaign",
      rows: [
        {
          title: "Ukraine - India",
          number: "2040",
        },
        {
          title: "Israel",
          number: "500",
        },
        {
          title: "Palestine",
          number: "500",
        },
        {
          title: "Sua Kun Cho Em",
          number: "500",
        },
      ],
    },
  ]);
  return (
    <div className="flex flex-col flex-grow gap-8 px-12 py-8 bg-slate-100">
      <div className="flex items-center justify-between font-bold text-slate-500">
        <h3>Admin Management System Overview</h3>
        <div className="flex gap-2">
          <h3 className="">Accounts: Admin123</h3>
        </div>
      </div>
      <div className="flex items-center justify-between font-bold text-slate-500">
        <h2>Overview</h2>
        <GradientIcon icon={CalendarCheck} />
      </div>

      <div className="flex items-center justify-between w-full gap-4">
        <OverviewCard
          title="Total Number of Users"
          number={10000}
          percent={22.8}
        />
        <OverviewCard
          title="Total Number of Company"
          number={424}
          percent={11.8}
        />
        <OverviewCard
          title="Total Number of Campaign"
          number={40000}
          percent={11.8}
        />
      </div>

      <div className="flex flex-col gap-4 p-12 bg-white rounded-lg">
        <div className="relative flex items-center justify-between my-8 font-bold text-slate-500">
          <h2>Statistics</h2>
          <MoreHorizontal
            className=" hover:text-slate-600"
            onClick={() => {}}
          ></MoreHorizontal>
        </div>

        <div className="flex items-center gap-24">
          {data.map((item, index) => {
            return (
              <div key={index} className="flex flex-col gap-2">
                <h3 className="font-bold text-green-500">{item.title}</h3>
                {item.rows.map((row, index) => {
                  return (
                    <div
                      key={"row-" + index}
                      className="flex items-center justify-between gap-12 text-slate-400"
                    >
                      <div>{row.title}</div>
                      <div>{row.number}</div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Overview;
