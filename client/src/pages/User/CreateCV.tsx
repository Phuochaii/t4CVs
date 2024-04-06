import { useState } from "react";
import {
  Eye,
  Download,
  Save,
  RotateCcw,
  RotateCw,
  RefreshCcw,
  PlusCircle,
  BookOpen,
  HelpCircle,
  Briefcase,
} from "lucide-react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

import CV from "../../shared/components/CV";

function CreateCV() {
  const [hovered, setHovered] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [lineSpacing, setLineSpacing] = useState<number>(1);

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
  };

  const [font, setFont] = useState("");

  const handleChange = (event: any) => {
    setFont(event.target.value);
  };

  const handleChangeLineSpacing = (event: any) => {
    setLineSpacing(event.target.value);
  };

  const lineSpacingOptions = [];
  for (let i = 1; i <= 20; i++) {
    lineSpacingOptions.push(i / 10);
  }

  return (
    <div className="flex flex-col w-full h-full">
      {/*Create CV header*/}
      <div className="w-full flex flex-col bg-light-700">
        <div className="flex flex-row justify-between border border-gray-400 w-full">
          <div className="w-64 h-8 m-4">
            <input
              id="cvName"
              className="mt-1 p-1 w-full rounded-lg border border-green-500"
              type="text"
              placeholder="CV chưa đặt tên"
            />
          </div>
          <div className="flex flex-row justify-around m-4">
            <button
              className={`text-sm px-4 py-2 rounded-md focus:outline-none mx-2 ${hovered ? "bg-green-200 text-green-700" : "bg-green-100 text-green-800"} hover:bg-green-600 hover:text-white`}
            >
              <Eye size={24} className="inline-block mr-2" /> Xem trước
            </button>
            <button
              className={`text-sm px-4 py-2 rounded-md focus:outline-none mx-2 bg-green-100 text-green-800 hover:bg-green-600 hover:text-white`}
            >
              <Download size={24} className="inline-block mr-2" /> Lưu và tải
              xuống
            </button>
            <button
              className={`text-sm px-4 py-2 rounded-md focus:outline-none mx-2 bg-green-700 text-white`}
            >
              <Save size={24} className="inline-block mr-2" /> Lưu lại
            </button>
          </div>
        </div>
        <div className="flex flex-row justify-center">
          <div className="flex flex-row p-4">
            <span className="text-sm mr-4">Ngôn ngữ</span>
            <label className="cursor-pointer mt-2">
              <input
                type="radio"
                name="language"
                value="vietnam"
                checked={selectedLanguage === "vietnam"}
                onChange={() => handleLanguageChange("vietnam")}
                className="hidden"
              />
              <img
                src="http://purecatamphetamine.github.io/country-flag-icons/3x2/VN.svg"
                alt="Vietnam Flag"
                className="w-6 h-4 mr-2"
              />
            </label>
            <label className="cursor-pointer mt-2">
              <input
                type="radio"
                name="language"
                value="usa"
                checked={selectedLanguage === "usa"}
                onChange={() => handleLanguageChange("usa")}
                className="hidden"
              />
              <img
                src="http://purecatamphetamine.github.io/country-flag-icons/3x2/US.svg"
                alt="USA Flag"
                className="w-6 h-4 mr-2"
              />
            </label>
            <label className="cursor-pointer mt-2">
              <input
                type="radio"
                name="language"
                value="japan"
                checked={selectedLanguage === "japan"}
                onChange={() => handleLanguageChange("japan")}
                className="hidden"
              />
              <img
                src="http://purecatamphetamine.github.io/country-flag-icons/3x2/JP.svg"
                alt="Japan Flag"
                className="w-6 h-4 mr-2"
              />
            </label>
          </div>
          <div className="w-32 ml-2 mr-2">
            <FormControl variant="standard" fullWidth>
              <InputLabel id="font-select-label">Font</InputLabel>
              <Select
                labelId="font-select-label"
                id="font-select"
                value={font}
                label="Font"
                onChange={handleChange}
                style={{ fontFamily: font }}
              >
                <MenuItem value="Arial">Arial</MenuItem>
                <MenuItem value="'Times New Roman', Times, serif">
                  Times New Roman
                </MenuItem>
                <MenuItem value="Verdana">Verdana</MenuItem>
                {/* Add more font options here */}
              </Select>
            </FormControl>
          </div>
          <div className="flex flex-row justify-center items-center ml-4">
            <div className="text-sm">Màu chủ đề</div>
            <div
              style={{
                width: "16px",
                height: "16px",
                borderRadius: "50%",
                backgroundColor: "blue",
                marginLeft: "8px",
              }}
            ></div>
          </div>
          <div className="flex flex-row ml-4 justify-center items-center">
            <div className="mr-4 text-sm w-64">Khoảng cách dòng</div>
            <FormControl variant="standard" fullWidth>
              <InputLabel id="line-spacing-select-label">
                Khoảng cách dòng
              </InputLabel>
              <Select
                labelId="line-spacing-select-label"
                id="line-spacing-select"
                value={lineSpacing}
                label="Khoảng cách dòng"
                onChange={handleChangeLineSpacing}
              >
                {lineSpacingOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="justify-center items-center flex flex-row ml-4">
            <button className="flex items-center bg-gray-200 hover:bg-gray-300 text-gray-800 hover:text-gray-900 py-2 px-4 rounded-lg transition duration-300">
              <Eye size={24} className="mr-2" />
              <span className="text-sm ml-2">Hình nền CV</span>
            </button>
          </div>
          <div className="flex items-center ml-4 justify-between">
            <button className="">
              <RotateCcw size={16} />
            </button>
            <button className="ml-4">
              <RotateCw size={16} />
            </button>
          </div>
        </div>
      </div>
      <div className="bg-gray-200 flex flex-row justify-between">
        <div className="flex flex-col mt-2 p-4">
          <div className="flex flex-row justify-center items-center">
            <div className="flex flex-col mr-2">
              <button className="flex flex-col items-center justify-center border border-green-500 bg-white text-green-500 px-4 py-2 rounded-lg hover:bg-green-500 hover:text-white transition duration-300 w-24 mb-2 text-sm">
                <RefreshCcw size={24} className="mb-2" />
                Đổi mẫu CV
              </button>
              <button className="flex flex-col items-center justify-center border border-green-500 bg-white text-green-500 px-4 py-2 rounded-lg hover:bg-green-500 hover:text-white transition duration-300 w-24 mb-2 text-sm">
                <PlusCircle size={24} className="mb-2" />
                Thêm mục
              </button>
              <button className="flex flex-col items-center justify-center border border-green-500 bg-white text-green-500 px-4 py-2 rounded-lg hover:bg-green-500 hover:text-white transition duration-300 w-24 mb-2 text-sm">
                <BookOpen size={24} className="mb-2" />
                Thư viện CV theo ngành nghề
              </button>
              <button className="flex flex-col items-center justify-center border border-green-500 bg-white text-green-500 px-4 py-2 rounded-lg hover:bg-green-500 hover:text-white transition duration-300 w-24 mb-2 text-sm">
                <HelpCircle size={24} className="mb-2" />
                Hướng dẫn viết CV
              </button>
              <button className="flex flex-col items-center justify-center border border-green-500 bg-white text-green-500 px-4 py-2 rounded-lg hover:bg-green-500 hover:text-white transition duration-300 w-24 mb-2 text-sm">
                <Briefcase size={24} className="mb-2" />
                Việc làm phù hợp với CV
              </button>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-col rounded-lg bg-white w-80 p-3">
                <div className="flex flex-row">
                  <p className="m-2">Hướng dẫn viết CV</p>
                  <p className="m-2">Hướng dẫn sử dụng</p>
                </div>
                <div className="rounded-lg bg-gray-200 m-4">
                  <p className="m-4">
                    CV cơ bản cần có thông tin cá nhân, kỹ năng, học vấn và kinh
                    nghiệm làm việc. Lưu ý ghi rõ tên bạn vào tiêu đề khi bấm
                    Lưu hoặc Tải CV về máy. Một số lỗi sai thường gặp:
                  </p>
                </div>
                <div>
                  <p className="ml-2">Hướng dẫn này có hữu ích không</p>
                  <div className="flex flex-row justify-around m-4">
                    <button className="flex items-center justify-center border border-gray-400 rounded-lg bg-white text-gray-600 px-4 py-2 hover:border-green-500 hover:text-green-500 transition duration-300">
                      Có
                    </button>
                    <button className="flex items-center justify-center border border-gray-400 rounded-lg bg-white text-gray-600 px-4 py-2 hover:border-green-500 hover:text-green-500 transition duration-300">
                      Không
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col rounded-lg bg-white w-80 p-1 mt-2">
                <p className="m-4">Mọi chi tiết vui lòng liên hệ:</p>
                <p className="m-4">
                  Email:{" "}
                  <a href="mailto:hotro@topcv.vn" className="text-green-500">
                    hotro@topcv.vn
                  </a>{" "}
                  hoặc đăng ký tư vấn CV cùng chuyên gia tại:{" "}
                  <a
                    href="https://reviewcv.topcv.vn"
                    className="text-green-500"
                  >
                    https://reviewcv.topcv.vn
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="m-4 mr-36">
          <CV />
        </div>
      </div>
    </div>
  );
}

export default CreateCV;
