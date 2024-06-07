export interface statusColorType {
  bg: string;
  text: string;
}

export const statusColor: { [index: string]: statusColorType } = {
  'Đang hiển thị': {
    bg: 'bg-slate-100',
    text: 'text-slate-500',
  },
  'Dừng hiển thị': {
    bg: 'bg-slate-100',
    text: 'text-slate-500',
  },
};
