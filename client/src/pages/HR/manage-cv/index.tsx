import * as tabs from "./tabs";

import { ArrowLeft } from "lucide-react";
import * as React from "react";
import { styled } from "@mui/system";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

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
function ManageCV() {
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

  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const tabSx = {
    "& .MuiTabs-indicator": {
      backgroundColor: "black",
    },
    "& .MuiButtonBase-root.MuiTab-root": {
      color: "black",
      transition: "color 0.2s ease-in-out",
      "&:hover": {
        color: "green)",
      },
      "&.Mui-selected": {
        color: "black",
      },
    },
  };
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
                key={index}
                title={item.title}
                number={item.number}
                color={item.color}
              />
            </div>
          ))}
        </div>
        <div className="mt-6 mx-6 items-center rounded-lg bg-white">
          <div className="flex justify-between pb-3 pl-4 pr-4">
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                    sx={tabSx}
                  >
                    <Tab
                      sx={{
                        paddingRight: 0,
                        paddingLeft: 0,
                        marginRight: 2,
                        fontWeight: "bold",
                      }}
                      label="Tin tuyển dụng"
                      value="1"
                    />
                    <Tab
                      sx={{
                        paddingRight: 0,
                        paddingLeft: 0,
                        marginRight: 2,
                        fontWeight: "bold",
                      }}
                      label="CV ứng tuyển"
                      value="2"
                    />
                    <Tab
                      sx={{
                        paddingRight: 0,
                        paddingLeft: 0,
                        marginRight: 2,
                        fontWeight: "bold",
                      }}
                      label="Ứng viên đã xem tin"
                      value="3"
                    />
                    <Tab
                      sx={{
                        paddingRight: 0,
                        paddingLeft: 0,
                        marginRight: 2,
                        fontWeight: "bold",
                      }}
                      label="Scount AI"
                      value="4"
                    />
                    <Tab
                      sx={{
                        paddingRight: 0,
                        paddingLeft: 0,
                        marginRight: 2,
                        fontWeight: "bold",
                      }}
                      label="CV tìm kiếm"
                      value="5"
                    />
                    <Tab
                      sx={{
                        paddingRight: 0,
                        paddingLeft: 0,
                        marginRight: 2,
                        fontWeight: "bold",
                      }}
                      label="CV đang theo dõi"
                      value="6"
                    />
                    <Tab
                      sx={{
                        paddingRight: 0,
                        paddingLeft: 0,
                        marginRight: 2,
                        fontWeight: "bold",
                      }}
                      label="CV được hỗ trợ"
                      value="7"
                    />
                    <Tab
                      sx={{
                        paddingRight: 0,
                        paddingLeft: 0,
                        marginRight: 2,
                        fontWeight: "bold",
                      }}
                      label="Dịch vụ"
                      value="8"
                    />
                  </TabList>
                </Box>
                <TabPanel sx={{ padding: "12px 0" }} value="1">
                  {tabs.Recuitment()}
                </TabPanel>
                <TabPanel sx={{ padding: "12px 0" }} value="2">
                  Item Two
                </TabPanel>
                <TabPanel sx={{ padding: "12px 0" }} value="3">
                  Item Three
                </TabPanel>
                <TabPanel sx={{ padding: "12px 0" }} value="4">
                  Item Three
                </TabPanel>
                <TabPanel sx={{ padding: "12px 0" }} value="5">
                  Item Three
                </TabPanel>
                <TabPanel sx={{ padding: "12px 0" }} value="6">
                  Item Three
                </TabPanel>
                <TabPanel sx={{ padding: "12px 0" }} value="7">
                  Item Three
                </TabPanel>
                <TabPanel sx={{ padding: "12px 0" }} value="8">
                  Item Three
                </TabPanel>
              </TabContext>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
}

export default ManageCV;
