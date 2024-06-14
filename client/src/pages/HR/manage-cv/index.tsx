import * as tabs from './tabs';

import { ArrowLeft } from 'lucide-react';
import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useParams, useNavigate } from 'react-router-dom';
import * as HRModule from '../../../modules/hr-module';
import { numberData } from '../../../shared/utils/constant';
// import { Compaign } from "..";

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
  const navigation = useNavigate();
  // const hrId = JSON.parse(localStorage.getItem('hr') as string).id;
  const { id } = useParams();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [campaign, setCampaign] = React.useState({} as any);

  const compaignId = id as string;

  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  React.useEffect(() => {
    HRModule.getCampaignById({ id: compaignId }).then((res) => {
      setCampaign(res);
    });
  }, []);

  const tabListSx = {
    '& .MuiTabs-indicator': {
      backgroundColor: 'black',
    },
    '& .MuiButtonBase-root.MuiTab-root': {
      color: 'black',
      transition: 'color 0.2s ease-in-out',
      textTransform: 'none',
      '&:hover': {
        color: 'green)',
      },
      '&.Mui-selected': {
        color: 'black',
      },
    },
  };

  const tabSx = {
    paddingRight: 0,
    paddingLeft: 0,
    marginRight: 2,
    fontWeight: 'bold',
  };
  return (
    <>
      <div
        className="bg-white w-full flex items-center text-xm py-4"
        style={{ marginLeft: '1px', paddingLeft: '20px' }}
      >
        <button
          className="flex items-center bg-slate-100 px-3 py-1 font-medium"
          onClick={() => navigation('/hr/campaign')}
        >
          <ArrowLeft size={16} className="mr-1" />
          Quay lại
        </button>
        <p className="text-slate-500 font-medium mx-5">Chi tiết chiến dịch: </p>
        <p className="font-semibold">{campaign.name}</p>
      </div>

      {/*  */}

      <div>
        <div className="flex mt-6 mx-6 justify-between">
          {numberData.map((item, index) => (
            <div
              className={`flex-1 ${index != numberData.length - 1 ? 'mr-5' : ''}`}
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
            <Box sx={{ width: '100%', typography: 'body1' }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                    sx={tabListSx}
                  >
                    <Tab sx={tabSx} label="Thông tin tuyển dụng" value="1" />
                    <Tab sx={tabSx} label="Tin tuyển dụng" value="2" />
                    <Tab sx={tabSx} label="CV ứng tuyển" value="3" />
                    <Tab
                      className="pointer-events-none"
                      sx={tabSx}
                      label={
                        <span style={{ color: 'grey' }}>
                          Ứng viên đã xem tin
                        </span>
                      }
                      value="4"
                    />
                    <Tab
                      className="pointer-events-none"
                      sx={tabSx}
                      label={<span style={{ color: 'grey' }}>CV tìm kiếm</span>}
                      value="5"
                    />
                    <Tab sx={tabSx} label="CV đang theo dõi" value="6" />
                    <Tab sx={tabSx} label="CV được hỗ trợ" value="7" />
                    <Tab
                      className="pointer-events-none"
                      sx={tabSx}
                      label={<span style={{ color: 'grey' }}>Dịch vụ</span>}
                      value="8"
                    />
                    <Tab sx={tabSx} label="Quản lý chiến dịch" value="9" />
                  </TabList>
                </Box>
                <TabPanel sx={{ padding: '12px 0' }} value="1">
                  {tabs.Information({ compaignId: compaignId })}
                </TabPanel>
                <TabPanel sx={{ padding: '12px 0' }} value="2">
                  {tabs.Recuitment()}
                </TabPanel>
                <TabPanel sx={{ padding: '12px 0' }} value="3">
                  {tabs.Application({ compaignId: compaignId })}
                </TabPanel>
                <TabPanel sx={{ padding: '12px 0' }} value="4">
                  Item Three
                </TabPanel>

                <TabPanel sx={{ padding: '12px 0' }} value="5">
                  Item Three
                </TabPanel>
                <TabPanel sx={{ padding: '12px 0' }} value="6">
                  {tabs.CV({ compaignId: compaignId })}
                </TabPanel>
                <TabPanel sx={{ padding: '12px 0' }} value="7">
                  {tabs.Support({ compaignId: compaignId })}
                </TabPanel>
                <TabPanel sx={{ padding: '12px 0' }} value="8">
                  Item Three
                </TabPanel>
                <TabPanel sx={{ padding: '12px 0' }} value="9">
                  {tabs.EditCampaign()}
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
