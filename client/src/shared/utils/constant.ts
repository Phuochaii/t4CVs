// Lưu các const vào đây
export const accountList = [
    { role: "admin", id: "", email: "admin@gmail.com", password: "123456" },
    { role: "hr", id: "1", email: "hr@gmail.com", password: "123456" },
    { role: "user", id: "1", email: "user@gmail.com", password: "123456" },
  ];
export const numberData = [
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

  export const cvState: NameValue[] = [
  { name: "Tất cả", value: undefined },
  { name: "Đã xem", value: true },
  { name: "Chưa xem", value: false },
];

export const cvLabel: NameValue[] = [
  { name: "Chưa gắn nhãn", value: "1" },
  { name: "Ưu tiên", value: "2" },
  { name: "Ít tiềm năng", value: "3" },
];

export const  salary_range:any[] = [
  {
    value: "0",
    label: "Tất cả mức lương",
    minSalary: 0,
    maxSalary: 0,
  },
  {
    value: "1",
    label: "Dưới 10 triệu",
    minSalary: 0,
    maxSalary: 10,
  },
  {
    value: "2",
    label: "10 - 15 triệu",
    minSalary: 10,
    maxSalary: 15,
  },
  {
    value: "3",
    label: "15 - 20 triệu",
    minSalary: 15,
    maxSalary: 20,
  },
  {
    value: "4",
    label: "20 - 25 triệu",
    minSalary: 20,
    maxSalary: 25,
  },
  {
    value: "5",
    label: "25 - 30 triệu",
    minSalary: 25,
    maxSalary: 30,
  },
  {
    value: "6",
    label: "30 - 50 triệu",
    minSalary: 30,
    maxSalary: 50,
  },
  {
    value: "7",
    label: "Trên 50 triệu",
    minSalary: 50,
    maxSalary: 0,
  },
  {
    value: "8",
    label: "Thỏa thuận",
    minSalary: 0,
    maxSalary: 0,
  },
];