import { useState } from "react";
import {
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";

import CVPageImage from "../../shared/assets/images/list-cv-page.png";
import CVCard from "../../shared/components/CVCard";

const ListCV = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const [language, setLanguage] = useState("");
  const [designStyle, setDesignStyle] = useState("");

  const handleLanguageChange = (event: any) => {
    setLanguage(event.target.value);
  };

  const handleSelect = (index: number) => {
    setSelected(index);
  };

  const handleDesignStyleChange = (event: any) => {
    setDesignStyle(event.target.value);
  };

  {
    /* Fake Data */
  }
  const fakeData = [
    {
      cv: "https://picsum.photos/200",
      tag: ["Tag 1111111111111111", "Tag 2", "Tag 3"],
      name: "John Doe",
    },
    {
      cv: "https://picsum.photos/200",
      tag: ["Tag 4", "Tag 5", "Tag 6"],
      name: "Jane Smith",
    },
    {
      cv: "https://picsum.photos/200",
      tag: ["Tag 4", "Tag 5", "Tag 6", "tag8", "Tag9"],
      name: "Jane Smith",
    },
    {
      cv: "https://picsum.photos/200",
      tag: ["Tag 4", "Tag 5", "Tag 6"],
      name: "Jane Smith",
    },
    {
      cv: "https://picsum.photos/200",
      tag: ["Tag 4", "Tag 5", "Tag 6"],
      name: "Jane Smith",
    },
    {
      cv: "https://picsum.photos/200",
      tag: ["Tag 4", "Tag 5", "Tag 6"],
      name: "Jane Smith",
    },
    {
      cv: "https://picsum.photos/200",
      tag: ["Tag 4", "Tag 5", "Tag 6"],
      name: "Jane Smith",
    },
    {
      cv: "https://picsum.photos/200",
      tag: ["Tag 4", "Tag 5", "Tag 6"],
      name: "Jane Smith",
    },
    {
      cv: "https://picsum.photos/200",
      tag: ["Tag 4", "Tag 5", "Tag 6"],
      name: "Jane Smith",
    },
    {
      cv: "https://picsum.photos/200",
      tag: ["Tag 4", "Tag 5", "Tag 6"],
      name: "Jane Smith",
    },
    {
      cv: "https://picsum.photos/200",
      tag: ["Tag 4", "Tag 5", "Tag 6"],
      name: "Jane Smith",
    },
  ];

  return (
    <div className="items-center flex flex-col">
      <div>
        <img src={CVPageImage} alt="cv-page" loading="eager" />
      </div>
      <div className="w-4/5 items-center">
        {/*Chọn loại CV*/}
        <div className="border-b border-gray-300 flex flex-row">
          <div
            className={`border-b w-1/4 text-lg p-2 cursor-pointer ${selected === 1 ? "border-green-500" : "border-gray-100"}`}
            onClick={() => handleSelect(1)}
          >
            <h1
              className={`font-bold ${selected === 1 ? "text-green-500" : "text-gray-500"}`}
            >
              Mẫu CV theo style
            </h1>
          </div>
          <div
            className={`border-b w-1/4 text-lg p-2 cursor-pointer ${selected === 2 ? "border-green-500" : "border-gray-100"}`}
            onClick={() => handleSelect(2)}
          >
            <h1
              className={`font-bold ${selected === 2 ? "text-green-500" : "text-gray-500"}`}
            >
              Mẫu CV theo vị trí ứng tuyển
            </h1>
          </div>
        </div>

        {/*Lọc CV*/}
        <div className="flex flex-row justify-between m-4">
          <div className="flex flex-row justify-between">
            <div className="w-60 mr-8">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Ngôn ngữ</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={language}
                  label="Ngôn ngữ"
                  onChange={handleLanguageChange}
                >
                  <MenuItem value={"tiengviet"}>Tiếng Việt</MenuItem>
                  <MenuItem value={"english"}>Tiếng Anh</MenuItem>
                  <MenuItem value={"japanese"}>Tiếng Nhật</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="w-60">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Kiểu thiết kế
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={designStyle}
                  label="Kiểu thiết kế"
                  onChange={handleDesignStyleChange}
                >
                  <MenuItem value="tatca">Tất cả thiết kế</MenuItem>
                  <MenuItem value="dongian">Đơn giản</MenuItem>
                  <MenuItem value="thanhlịch">Thanh lịch</MenuItem>
                  <MenuItem value="hiendai">Hiện đại</MenuItem>
                  <MenuItem value="harvard">Harvard</MenuItem>
                  <MenuItem value="congnghiep">Công nghệ</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="new"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="new"
                control={<Radio color="success" />}
                label="Mới cập nhật"
              />
              <FormControlLabel
                value="most"
                control={<Radio color="success" />}
                label="Được dùng nhiều nhất"
              />
            </RadioGroup>
          </div>
        </div>

        {/*Danh sách CV*/}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-between ml-4">
          {fakeData.map((data, index) => (
            <CVCard key={index} cv={data.cv} tag={data.tag} name={data.name} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListCV;
