import { MoreHorizontal } from "lucide-react";
import { useState } from "react";

interface OverviewCardProps {
  title: string;
  number: number;
  percent: number;
}

function OverviewCard({ title, number, percent }: OverviewCardProps) {
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <div
      className="flex flex-col p-4 bg-white rounded-xl"
      onClick={(event) => {
        event.preventDefault();
        setOpenDialog(false);
      }}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="w-24 h-24 text-center bg-gradient-to-b from-green-500  to-blue-500 flex justify-center items-center font-bold p-2 text-green-400 rounded-[50%]">
          <div className="w-full h-full bg-white rounded-[50%] flex justify-center items-center">
            {number}
          </div>
        </div>
        <div className="relative flex flex-col items-start justify-center gap-2">
          <MoreHorizontal
            className="self-end text-slate-400 hover:text-slate-600"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              setOpenDialog(!openDialog);
            }}
          />
          <h2 className="font-bold text-slate-400">{title}</h2>
          <span className="text-emerald-400">{percent}%</span>
          {openDialog && (
            <div className="absolute right-0 flex flex-col translate-x-16 translate-y-4 bg-white">
              <div
                className="flex px-4 py-2 border-t border-l border-r rounded-t-lg items-px-4 hover:bg-gradient-to-r from-blue-500 to-green-500 hover:text-white"
                onClick={() => {}}
              >
                View
              </div>
              <div
                className="flex px-4 py-2 border-b border-l border-r rounded-b-lg hover:bg-gradient-to-r from-blue-500 to-green-500 hover:text-white"
                onClick={() => {}}
              >
                Delete
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OverviewCard;
