import { MouseEventHandler, SetStateAction, useEffect, useState } from 'react';
import { MultiValue, SingleValue } from 'react-select';
import SingleDropdown from './SingleDropDown';
import Select from 'react-select';
import { Bold, Italic, List, ListOrdered, Underline } from 'lucide-react';
const UpdateCompanyInfo = ({
  handleComponent,
  companyName,
}: {
  handleComponent: MouseEventHandler<HTMLButtonElement> | undefined;
  companyName: string;
}) => {
  const [fields, setFields] = useState<any>(null);
  useEffect(() => {
    // Fetch data from your API
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/job/create-info', {
          method: 'GET',
          headers: {
            'Access-control-allow-origin': 'http://localhost:3000',
            'Content-type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setFields(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  const convertToOptions = (data: { id: string; name: string }[]) => {
    if (!data) return [];
    return data.map(({ id, name }) => ({ value: id.toString(), label: name }));
  };
  const field = convertToOptions(fields?.field);
  const Scale = [
    { value: '100 - 200 nhân viên', label: '100 - 200 nhân viên' },
    { value: '200 - 300 nhân viên', label: '200 - 300 nhân viên' },
    { value: '400 - 500 nhân viên', label: '400 - 500 nhân viên' },
    { value: 'Trên 500 nhân viên', label: 'Trên 500 nhân viên' },
  ];
  const [scale, setScale] = useState<SingleValue<{
    value: string;
    label: string;
  }> | null>(null);
  const [fieldOptions, setFieldOptions] = useState<MultiValue<{
    value: string;
    label: string;
  }> | null>(null);
  return (
    <div className="w-full m-2 flex flex-col">
      <h1 className="text-black text-sl font-bold mb-5">
        Cập nhật thông tin công ty
      </h1>
      {companyName}
      <div className="w-[97%] border-slate-200 border-2 px-8 py-4 space-y-4">
        <div className="w-5/12 flex flex-row items-center space-x-1">
          <span>Logo</span>
          <img
            src="https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1114445501.jpg"
            className="rounded-full"
            style={{ width: '32px' }}
            alt="Avatar"
          />
          <button className="text-sm btn-success py-1 px-2 rounded bg-gray-100 cursor-pointer">
            Đổi Logo
          </button>
        </div>
        <div className="flex flex-row space-x-10 items-center">
          <div className="space-y-2 w-1/2">
            <span className="text-base">Tên công ty</span>
            <input
              type="text"
              className="  bg-gray-300 border border-slate-300 hover:border-green-500 focus:border-green-500 outline-none text-black text-base  w-full p-2.5"
              placeholder={companyName}
              disabled
            />
          </div>

          <div className="space-y-2 w-1/2">
            <span className="text-base">Email</span>
            <input
              type="text"
              className=" bg-white border border-slate-300 hover:border-green-500 focus:border-green-500 outline-none text-black text-base  w-full p-2.5"
              placeholder="Nhập email"
            />
          </div>
        </div>
        <div className="flex flex-row space-x-10 items-center">
          <div className="space-y-2 w-1/2">
            <span className="text-base">Mã số thuế</span>
            <input
              type="text"
              className=" bg-white border border-slate-300 hover:border-green-500 focus:border-green-500 outline-none text-black text-base  w-full p-2.5"
              placeholder="Nhập mã số thuế"
            />
          </div>

          <div className="space-y-2 w-1/2">
            <span className="text-base">Website</span>
            <input
              type="text"
              className=" bg-white border border-slate-300 hover:border-green-500 focus:border-green-500 outline-none text-black text-base  w-full p-2.5"
              placeholder="http://"
            />
          </div>
        </div>
        <div className="flex flex-row space-x-10 items-center">
          <div className="w-1/2 space-y-2">
            <span className="text-base">Lĩnh vực hoạt động</span>
            <Select
              styles={{
                control: (base) => ({
                  ...base,
                  boxShadow: 'none',
                  borderColor: '#6B728064',
                  '&:hover': {
                    borderColor: 'green',
                  },
                }),
                option: (base) => ({
                  ...base,
                  backgroundColor: 'white',
                  '&:hover': {
                    backgroundColor: 'lightgrey',
                    fontWeight: 'bold',
                  },
                }),
                multiValue: (base) => ({
                  ...base,
                  backgroundColor: '#C4F0D5',
                }),
                multiValueLabel: (base) => ({
                  ...base,
                  color: 'black',
                }),

                placeholder: (base) => ({
                  ...base,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }),
                menu: (base) => ({
                  ...base,
                  maxHeight: '200px', // Set maximum height for the dropdown menu
                  overflowY: 'auto',
                }),
              }}
              isClearable
              isMulti
              placeholder="-- Chọn lĩnh vực --"
              options={field}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={setFieldOptions}
              required
            />
          </div>
          <div className="w-1/2 space-y-2">
            <span className="text-base">Quy mô</span>
            <SingleDropdown
              placeholder="-- Chọn quy mô công ty --"
              options={Scale}
              onChange={(
                e: SetStateAction<
                  SingleValue<{ value: string; label: string }>
                >,
              ) => setScale(e)}
            />
          </div>
        </div>
        <div className="flex flex-row space-x-10 items-start">
          <div className="w-1/2 space-y-2">
            <div className="space-y-2">
              <span className="text-base">Địa chỉ</span>
              <input
                type="text"
                className=" bg-white border border-slate-300 hover:border-green-500 focus:border-green-500 outline-none text-black text-base  w-full p-2.5"
                placeholder="Nhập địa chỉ"
              />
            </div>
            <div className="space-y-2  ">
              <span className="text-base">Điện thoại</span>
              <input
                type="text"
                className=" bg-white border border-slate-300 hover:border-green-500 focus:border-green-500 outline-none text-black text-base  w-full p-2.5"
                placeholder="Nhập số điện thoại"
              />
            </div>
          </div>
          <div className="space-y-2 w-1/2">
            <span className="text-base mb-2">Mô tả công ty</span>
            <div>
              <div className="px-1 py-2 flex flex-row items-center bg-gray-300 space-x-1">
                <button className="bg-gray-300">
                  <Bold
                    style={{
                      strokeWidth: '4px',
                      color: 'black',
                      width: 15,
                      height: 15,
                      marginRight: 2,
                    }}
                  ></Bold>
                </button>
                <button className="bg-gray-300">
                  <Italic
                    style={{
                      strokeWidth: '2px',
                      color: 'black',
                      width: 15,
                      height: 15,
                      marginRight: 2,
                    }}
                  ></Italic>
                </button>
                <button className="bg-gray-300">
                  <Underline
                    style={{
                      strokeWidth: '2px',
                      color: 'black',
                      width: 15,
                      height: 15,
                      marginRight: 2,
                    }}
                  ></Underline>
                </button>
                <button className="bg-gray-300">
                  <List
                    style={{
                      strokeWidth: '2px',
                      color: 'black',
                      width: 15,
                      height: 15,
                      marginRight: 2,
                    }}
                  ></List>
                </button>
                <button className="bg-gray-300">
                  <ListOrdered
                    style={{
                      strokeWidth: '2px',
                      color: 'black',
                      width: 15,
                      height: 15,
                      marginRight: 2,
                    }}
                  ></ListOrdered>
                </button>
              </div>
              <textarea
                className="w-full bg-white border border-slate-300 hover:border-green-500 focus:border-green-500 outline-none text-black text-base h-32 p-2.5"
                placeholder="Nhập nội dung mô tả công việc"
              />
            </div>
          </div>
        </div>
        <div className="w-10/12 justify-start flex flex-row space-x-3">
          <button
            className="text-base btn-success py-2 px-10 rounded bg-gray-200 border cursor-pointer"
            onClick={handleComponent}
          >
            Hủy
          </button>
          <button
            className="text-base btn-success py-2 px-10 rounded text-white bg-green-500 shadow-md cursor-pointer"
            onClick={handleComponent}
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};
export default UpdateCompanyInfo;
