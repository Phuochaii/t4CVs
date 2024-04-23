export interface statusColorType {
  bg: string;
  text: string;
}

export const statusColor: { [index: string]: statusColorType } = {
  "Đang chạy Top Jobs": {
    bg: "bg-slate-100",
    text: "text-slate-500",
  },
  "Đang hiển thị": {
    bg: "bg-slate-100",
    text: "text-slate-500",
  },
  "Đang xét duyệt": {
    bg: "bg-yellow-100",
    text: "text-yellow-500",
  },
  "Bị từ chối": {
    bg: "bg-slate-100",
    text: "text-slate-500",
  },
  "Không công khai": {
    bg: "bg-slate-100",
    text: "text-slate-500",
  },
  "Hết hạn hiển thị": {
    bg: "bg-slate-100",
    text: "text-slate-500",
  },
  "Dừng hiển thị": {
    bg: "bg-slate-100",
    text: "text-slate-500",
  },
};