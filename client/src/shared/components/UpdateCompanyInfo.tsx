import { MouseEventHandler, SetStateAction, useEffect, useState } from 'react';
import { MultiValue, SingleValue } from 'react-select';
import SingleDropdown from './SingleDropDown';
import { Bold, Italic, List, ListOrdered, Underline } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { CompanyFromServer } from '../types/Company.type';
const UpdateCompanyInfo = ({
  handleComponent,
  company,
  fields
}: {
  handleComponent: MouseEventHandler<HTMLButtonElement>;
  company: CompanyFromServer;
  fields : any
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [item] = useState({
    id: 0,
    file: "",
    field: 0,
    taxCode: "",
    name: "",
    website: "",
    address: "",
    phone: "",
    companySize: 0,
    description: "",
});
  const onSubmit = async (data: any, event:any) => {
    const updatedItem = { ...item };

        // Thịnh update lại phần file
        updatedItem.id = company.id
        updatedItem.file = "";
        updatedItem.field = Number.parseInt(
            fieldOptions?.value !== undefined ? fieldOptions?.value : '0',
        );
        updatedItem.taxCode = data.MST;
        updatedItem.website = data.website;
        updatedItem.address = data.address;
        updatedItem.phone = data.phoneNumber;
        updatedItem.companySize = data.scale;
        updatedItem.description = data.description;
        //debug line
        console.log(updatedItem);
        try {
            const response = await fetch('http://localhost:3000/company/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedItem),
            });

            if (!response.ok) {
                throw new Error('Failed to post data to API');
            }

            console.log('Data posted successfully');
        } catch (error) {
            console.error('Error posting data:', error);
        }
    handleComponent(event)
  };
  const convertToOptions = (data: { id: string; name: string }[]) => {
    if (!data) return [];
    return data.map(({ id, name }) => ({ value: id.toString(), label: name }));
  };
  const field = convertToOptions(fields?.field);
  const [fieldOptions, setFieldOptions] = useState<SingleValue<{
    value: string;
    label: string;
  }> | null>(null);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full m-2 flex flex-col">
        <h1 className="text-black text-sl font-bold mb-5">
          Cập nhật thông tin công ty
        </h1>
        {company.name}
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
                defaultValue={company.name}
                disabled
              />
            </div>

            <div className="space-y-2 w-1/2">
              <span className="text-base">Email</span>
              <input
                type="text"
                className=" bg-white border border-slate-300 hover:border-green-500 focus:border-green-500 outline-none text-black text-base  w-full p-2.5"
                placeholder="Nhập email"
                {...register('email', {
                  required: true,
                })}
                defaultValue = {"email@gmail.com"}
              />
            </div>

          </div>
          {errors.email && (
            <p className="text-red-700">Email không được để trống</p>
          )}
          <div className="flex flex-row space-x-10 items-center">
            <div className="space-y-2 w-1/2">
              <span className="text-base">Mã số thuế</span>
              <input
                type="text"
                className=" bg-white border border-slate-300 hover:border-green-500 focus:border-green-500 outline-none text-black text-base  w-full p-2.5"
                placeholder="Nhập mã số thuế"
                defaultValue={company.taxCode}
                {...register('MST', {
                  required: true,
                })}
              />
            </div>

            <div className="space-y-2 w-1/2">
              <span className="text-base">Website</span>
              <input
                type="text"
                className=" bg-white border border-slate-300 hover:border-green-500 focus:border-green-500 outline-none text-black text-base  w-full p-2.5"
                placeholder="http://"
                defaultValue={company.website}
                {...register('website', {
                  required: true,
                })}
              />
            </div>

          </div>
          {(errors.MST || errors.website) && (
            <p className="text-red-700">Mã số thuế và website không được để trống</p>
          )}
          <div className="flex flex-row space-x-10 items-center">
            <div className="w-1/2 space-y-2">
              <span className="text-base">Lĩnh vực hoạt động</span>
              <SingleDropdown onChange={setFieldOptions} options={field} placeholder={'--Chọn lĩnh vực--'} defaultValue={field.find(item => {return item.value === company.field.toString()})} />
            </div>
            <div className="w-1/2 space-y-2">
              <span className="text-base">Quy mô</span>
              <input
                type="number"
                min="0"
                className=" bg-white border border-slate-300 hover:border-green-500 focus:border-green-500 outline-none text-black text-base  w-full p-2.5"
                placeholder="Nhập quy mô"
                defaultValue={company.companySize}
                {...register('scale', {
                  required: true,
                })}
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
                  defaultValue={company.address}
                  {...register('address', {
                    required: true,
                  })}
                />
              </div>
              <div className="space-y-2  ">
                <span className="text-base">Điện thoại</span>
                <input
                  type="text"
                  className=" bg-white border border-slate-300 hover:border-green-500 focus:border-green-500 outline-none text-black text-base  w-full p-2.5"
                  placeholder="Nhập số điện thoại"
                  {...register('phoneNumber', {
                    required: true,
                  })}
                  defaultValue={company.phone}
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
                  placeholder="Nhập nội dung mô tả công ty"
                  {...register('description', {
                    required: true,
                  })}
                  defaultValue={company.description}
                />
              </div>
            </div>
          </div>
          {(errors.address || errors.description || errors.phoneNumber) && (
            <p className="text-red-700">Thông tin không được để trống</p>
          )}
          <div className="w-10/12 justify-start flex flex-row space-x-3">
            <button
              className="text-base btn-success py-2 px-10 rounded bg-gray-200 border cursor-pointer"
              onClick={handleComponent}
            >
              Hủy
            </button>
            <button
              type='submit'
              className="text-base btn-success py-2 px-10 rounded text-white bg-green-500 shadow-md cursor-pointer"
            >
              Lưu
            </button>
          </div>
        </div>
      </div>
    </form>

  );
};
export default UpdateCompanyInfo;
