import * as tabs from "./tabs";

import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useNavigate } from "react-router-dom";

function PostCompaign() {
  const navigation = useNavigate();
  const [value, setValue] = React.useState("1");

  const next = () => {
    if (value === "3") {
      navigation("/hr/compaign");
      return;
    }
    setValue((current) => (parseInt(current) + 1).toString());
  };
  const previous = () => {
    if (value === "1") {
      navigation("/hr/post-compaign");
      return;
    }
    setValue((current) =>
      current === "1" ? "1" : (parseInt(current) - 1).toString()
    );
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const tabSx = {
    "& .MuiTabs-indicator": {
      backgroundColor: "transparent",
    },
    "& .MuiButtonBase-root.MuiTab-root": {
      // color: "black",
      transition: "color 0.2s ease-in-out",
      textTransform: "none",
      "&:hover": {
        color: "#0B994B",
      },
      "&.Mui-selected": {
        color: "#0B994B",
      },
    },
  };
  return (
    <>
      <div>
        <div className="pb-3">
          <div
            className="bg-white w-full flex items-center text-xm py-4"
            style={{ marginLeft: "1px", paddingLeft: "20px" }}
          >
            <p className="font-semibold mr-10">Đăng tin tuyển dụng</p>
            <p className="text-slate-500 font-medium mr-2">Chiến dịch: </p>
            <p className="font-semibold">Tuyển nhân viên kinh doanh</p>
          </div>
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                  backgroundColor: "white",
                  padding: "0 20px",
                }}
              >
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                  sx={tabSx}
                >
                  <Tab
                    sx={{
                      paddingRight: 0.5,
                      paddingLeft: 0.5,
                      marginRight: 2,
                      fontWeight: "bold",
                    }}
                    label="1. Tin tuyển dụng"
                    value="1"
                  />
                  <Tab
                    sx={{
                      paddingRight: 0.5,
                      paddingLeft: 0.5,
                      marginRight: 2,
                      fontWeight: "bold",
                    }}
                    label="2. CV ứng tuyển"
                    value="2"
                  />
                  <Tab
                    sx={{
                      paddingRight: 0.5,
                      paddingLeft: 0.5,
                      marginRight: 2,
                      fontWeight: "bold",
                    }}
                    label="3. Ứng viên đã xem tin"
                    value="3"
                  />
                </TabList>
              </Box>
              <TabPanel sx={{ padding: "12px 36px" }} value="1">
                {tabs.Tab1({ next: next, previous: previous })}
              </TabPanel>
              <TabPanel sx={{ padding: "12px 36px" }} value="2">
                {tabs.Tab2({ next: next, previous: previous })}
              </TabPanel>
              <TabPanel sx={{ padding: "12px 36px" }} value="3">
                {tabs.Tab3({ next: next, previous: previous })}
              </TabPanel>
            </TabContext>
          </Box>
        </div>
      </div>
    </>
  );
}

export default PostCompaign;
