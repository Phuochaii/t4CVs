import {
  Button,
  Typography,
  AppBar,
  Toolbar,
  Box,
  CircularProgress,
  Backdrop,
  Alert,
} from "@mui/material";
import "tailwindcss/tailwind.css";
import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Cell,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const data = [
  { name: "Kinh doanh / Bán hàng", uv: 15395 },
  { name: "Marketing / Truyền thông", uv: 7763 },
  { name: "Bất động sản", uv: 7763 },
  { name: "IT", uv: 5123 },
];

function newDashBoard() {
  const [searching, setSearching] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false); // new state for loading

  const handleSearch = () => {
    setSearching(true);
    setShowAlert(false);
    setLoading(true); // start loading when search starts
    setTimeout(() => {
      setSearching(false);
      setShowAlert(true);
      setLoading(false); // stop loading when search ends
      // Set a timer to hide the alert after 2 seconds
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
    }, 11000);
  };

  return (
    <div>
      <Backdrop open={loading} style={{ color: "#fff", zIndex: 1500 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ flexGrow: 1, width: "100%" }}>
        <AppBar
          position="static"
          style={{
            height: "50px",
            backgroundColor: "#ffffff",
            color: "#111111",
          }}
        >
          <Toolbar variant="dense">
            <Typography variant="h6" component="div">
              topCV
            </Typography>
            <Button color="inherit">Việc làm</Button>
            <Button color="inherit">Hồ sơ & CV</Button>
            <Button color="inherit">Công ty</Button>
            <Button color="inherit">LPhát triển sự nghiệm và công cụ</Button>
            <Button color="inherit">Blog</Button>
            <Button color="inherit">Giao diện mới</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <div className="bg-gradient-to-r from-color1 to-color2 flex flex-row items-start justify-start min-h-screen bg-gradient-to-r from-teal-900 to-teal-500">
        <div className="flex flex-col items-center justify-between mt-20 w-2/5">
          <div className="flex flex-row justify-between w-full mt-3 ml-6">
            <input
              id="outlined-basic"
              placeholder="Tìm kiếm việc làm"
              className="flex-grow mb-4 bg-white rounded-md h-10 w-5/6"
            />
            <button
              onClick={handleSearch}
              disabled={searching}
              className="ml-4 bg-green-500 rounded-lg w-20 h-10"
            >
              {searching ? <CircularProgress size={24} /> : "Tìm kiếm"}
            </button>
          </div>
          <div className="flex flex-row justify-between w-full mt-3 ml-6">
            <select
              id="outlined-basic"
              className="flex-grow mr-4 bg-white rounded-md h-10 "
            >
              <option value="" disabled selected hidden>
                Tỉnh/Thành phố
              </option>
              <option value={10}>Hà Nội</option>
              <option value={20}>TP Hồ Chí Minh</option>
              <option value={30}>Đà Nẵng</option>
            </select>
            <select
              id="outlined-basic"
              className="flex-grow mr-4 bg-white rounded-md h-10 "
            >
              <option value="" disabled selected hidden>
                Kinh nghiệm
              </option>
              <option value={10}>Dưới 1 năm</option>
              <option value={20}>1-2 năm</option>
              <option value={30}>Trên 2 năm</option>
            </select>
            <select
              id="outlined-basic"
              className="flex-grow mr-4 bg-white rounded-md h-10"
            >
              <option value="" disabled selected hidden>
                Mức lương
              </option>
              <option value={10}>Dưới 10 triệu</option>
              <option value={20}>10-20 triệu</option>
              <option value={30}>Trên 20 triệu</option>
            </select>
          </div>
        </div>

        <BarChart
          width={900}
          height={300}
          data={data}
          className="mt-20 ml-4 w-3/5"
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" className="white-text" /> <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="uv">
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </div>
    </div>
  );
}

export default newDashBoard;
