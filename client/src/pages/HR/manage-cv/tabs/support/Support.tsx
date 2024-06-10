import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import React from "react";

import * as tabs from "./tabs";
function Support({ compaignId }: { compaignId: string}) {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const tabSx = {
    "& .MuiTabs-indicator": {
      backgroundColor: "#42B96E",
    },
    "& .MuiButtonBase-root.MuiTab-root": {
      color: "#42B96E",
      transition: "color 0.2s ease-in-out",
      textTransform: "none",
      "&:hover": {
        color: "green)",
      },
      "&.Mui-selected": {
        color: "#42B96E",
      },
    },
  };
  return (
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
                label="Danh sách CV được hỗ trợ"
                value="1"
              />
              <Tab
                sx={{
                  paddingRight: 0,
                  paddingLeft: 0,
                  marginRight: 2,
                  fontWeight: "bold",
                }}
                label="Các CV mở liên hệ"
                value="2"
              />
            </TabList>
          </Box>
          <TabPanel sx={{ padding: "12px 0" }} value="1">
            {tabs.Tab1({ compaignId: compaignId})}
          </TabPanel>
          <TabPanel sx={{ padding: "12px 0" }} value="2">
            {tabs.Tab2()}
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
}

export default Support;
