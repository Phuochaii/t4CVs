import {
  MouseEventHandler,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { SingleValue } from 'react-select';
import SingleDropdown from './SingleDropDown';
import { Bold, Italic, List, ListOrdered, Underline } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useProfileContext } from '../services/authen/domain/context';
import { getField } from '../../modules/hr-module';
import { successToast } from '../../utils/toast';

const CreateCompany = ({
  handleView,
}: {
  handleView: MouseEventHandler<HTMLButtonElement>;
}) => {
  const [fields, setFields] = useState<any>(null);
  const [imageFile, setImageFile] = useState<File>();
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const imageUploadRef = useRef<HTMLInputElement | null>(null);
  const { token } = useProfileContext();
  const handleImageUpload = () => {
    if (imageUploadRef.current) {
      imageUploadRef.current.click();
    }
  };
  const imagePreview = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setImagePreviewUrl(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: any, event: any) => {
    const formData = new FormData();

    if (imageFile) {
      formData.append('file', imageFile);
    }
    formData.append(
      'field',
      Number.parseInt(
        fieldOptions?.value !== undefined ? fieldOptions?.value : '1',
      ).toString(),
    );
    formData.append('taxCode', data.MST);
    formData.append('website', data.website);
    formData.append('address', data.address);
    formData.append('phone', data.phoneNumber);
    formData.append('companySize', data.scale.toString());
    formData.append('description', data.description);
    formData.append('name', data.name);
    successToast('Tạo công ty thành công!');
    try {
      const response = await fetch('http://localhost:3000/company/create', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to post data to API');
      }
      console.log('Data successfully updated:', formData);
    } catch (error) {
      console.error('Error posting data:', error);
    }
    setTimeout(() => {
      location.reload();
    }, 2000);
    handleView(event);
  };
  useEffect(() => {
    // Fetch data from your API
    const fetchData = async () => {
      const response = await getField(token!);
      console.log(token);
      const data = response;
      console.log(response);
      setFields(data);
    };
    fetchData();
  }, []);
  const convertToOptions = (data: { id: string; name: string }[]) => {
    if (!data) return [];
    return data.map(({ id, name }) => ({ value: id.toString(), label: name }));
  };
  const field = convertToOptions(fields?.field);
  const [item] = useState({
    file: '',
    field: 0,
    taxCode: '',
    name: '',
    website: '',
    address: '',
    phone: '',
    companySize: 0,
    description: '',
  });
  const [fieldOptions, setFieldOptions] = useState<SingleValue<{
    value: string;
    label: string;
  }> | null>(null);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full m-2 flex flex-col">
        <h1 className="text-black text-sl font-bold mb-5">Tạo công ty</h1>

        <div className="w-[97%] border-slate-200 border-2 px-8 py-4 space-y-4">
          <div className="w-5/12 flex flex-row items-center space-x-1">
            <span>Logo</span>
            <img
              src={
                imagePreviewUrl ||
                'https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1114445501.jpg'
              }
              className="rounded-full"
              style={{ width: '32px', height: '32px' }}
              alt="Avatar"
            />
            <input
              type="file"
              name="file"
              ref={imageUploadRef}
              onChange={imagePreview}
              style={{ display: 'none' }}
              accept="image/png, image/gif, image/jpeg"
            />
            <div
              className="text-sm btn-success py-1 px-2 rounded bg-gray-100 cursor-pointer"
              onClick={handleImageUpload}
            >
              Đổi Logo
            </div>
          </div>
          <div className="flex flex-row space-x-10 items-center">
            <div className="space-y-2 w-1/2">
              <span className="text-base">Tên công ty</span>
              <input
                type="text"
                className=" border border-slate-300 hover:border-green-500 focus:border-green-500 outline-none text-black text-base  w-full p-2.5"
                placeholder="Nhập tên công ty"
                {...register('name', {
                  required: true,
                })}
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
              />
            </div>
          </div>
          {(errors.email || errors.name) && (
            <p className="text-red-700">
              Email và tên công ty không được để trống
            </p>
          )}
          <div className="flex flex-row space-x-10 items-center">
            <div className="space-y-2 w-1/2">
              <span className="text-base">Mã số thuế</span>
              <input
                type="text"
                className=" bg-white border border-slate-300 hover:border-green-500 focus:border-green-500 outline-none text-black text-base  w-full p-2.5"
                placeholder="Nhập mã số thuế"
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
                {...register('website', {
                  required: true,
                })}
              />
            </div>
          </div>
          {(errors.MST || errors.website) && (
            <p className="text-red-700">
              Mã số thuế và website không được để trống
            </p>
          )}
          <div className="flex flex-row space-x-10 items-center">
            <div className="w-1/2 space-y-2">
              <span className="text-base">Lĩnh vực hoạt động</span>
              <SingleDropdown
                onChange={setFieldOptions}
                options={field}
                placeholder={'--Chọn lĩnh vực--'}
              />
            </div>
            <div className="w-1/2 space-y-2">
              <span className="text-base">Quy mô</span>
              <input
                type="number"
                min="0"
                className=" bg-white border border-slate-300 hover:border-green-500 focus:border-green-500 outline-none text-black text-base  w-full p-2.5"
                placeholder="Nhập quy mô"
                {...register('scale', {
                  required: true,
                })}
              />
            </div>
          </div>
          {errors.scale && (
            <p className="text-red-700">Thông tin không được để trống</p>
          )}
          <div className="flex flex-row space-x-10 items-start">
            <div className="w-1/2 space-y-2">
              <div className="space-y-2">
                <span className="text-base">Địa chỉ</span>
                <input
                  type="text"
                  className=" bg-white border border-slate-300 hover:border-green-500 focus:border-green-500 outline-none text-black text-base  w-full p-2.5"
                  placeholder="Nhập địa chỉ"
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
              onClick={handleView}
            >
              Hủy
            </button>
            <button
              type="submit"
              className="text-base btn-success py-2 px-10 rounded text-white bg-green-500 shadow-md cursor-pointer"
            >
              Tạo
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
export default CreateCompany;
