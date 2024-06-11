import { ShieldCheck, Check, Star, Search, Plus } from 'lucide-react';
import FPT from '../../shared/assets/images/FPT.jpg';
import VNRS from '../../shared/assets/images/VNRS.png';
import { useState, useEffect } from 'react';
import UpdateCompanyInfo from './UpdateCompanyInfo';
import { CompanyFromServer } from '../types/Company.type';
import { Field } from '../types/Recruitment.type';
import {
  getAllCompanies,
  getAllFields,
  getCompanyById,
} from '../../modules/helper';
import { DefaultPagination } from './default-pagination';
import CreateCompany from './CreateCompany';
import { getField, getProfile } from '../../modules/hr-module';
import { useProfileContext } from '../services/authen/domain/context';
function CompanyInfo() {
  const [component, setComponent] = useState(true);
  const { token } = useProfileContext();
  const [company, setCompany] = useState<CompanyFromServer>();
  const [view, setView] = useState(true);
  const [companies, setCompanies] = useState<CompanyFromServer[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [fields, setField] = useState<Field[]>([]);
  const [fieldss, setFields] = useState<any>(null);
  const [employer, setEmployer] = useState<{
    id: string;
    fullname: string;
    gender: string;
    positionId: number;
    skype: string;
    companyId: number;
    license: string;
    phoneNumber: string;
    licenseStatus: boolean;
    phoneNumberStatus: boolean;
    image: string;
  }>();
  useEffect(() => {
    async function getData() {
      const response = await getField(token!);
      const data = response;
      console.log(response);
      setFields(data);
      const res = await getProfile(token!);
      console.log(res.companyId);
      if (res.companyId !== null && res.companyId !== undefined) {
        const company = await getCompanyById(res.companyId);
        setCompany(company!);
      }
      console.log(res);
      setEmployer(res);
      const {
        allCompanies,
        // total,
        totalPages,
      }: {
        allCompanies: CompanyFromServer[];
        total: number;
        totalPages: number;
      } = await getAllCompanies(page);
      const fields = await getAllFields();
      setCompanies(allCompanies);
      console.log(allCompanies);
      setTotalPages(totalPages);
      setField(fields);
    }
    getData();
  }, [page]);

  const handleComponent = () => {
    setComponent(!component);
    // console.log(component);
    // console.log("Hello world")
  };
  const handleView = (view: boolean) => {
    setView(view);
    // console.log("Hello world")
  };
  return component === true ? (
    employer?.companyId !== null && employer?.companyId !== undefined ? (
      <UpdateCompanyInfo
        handleComponent={handleComponent}
        company={company!}
        fields={fieldss}
      ></UpdateCompanyInfo>
    ) : (
      <div className="w-full flex flex-col items-center py-9">
        <div className="w-[95%]">
          <div
            className={
              'btn text-sm p-3 flex items-center justify-between w-full bg-[#EBF3FF] text-[#2D7CF1] mb-4'
            }
          >
            <div className="flex flex-row items-center space-x-4">
              <Star
                className="text-blue-600"
                style={{ width: 40, height: 40 }}
              />
              <div className="flex flex-col">
                <span className="text-[13px] ml-1 mr-1">
                  Xác nhận tài khoản điện tử giúp bạn
                </span>
                <div className="flex flex-row items-center">
                  <Check size={20} color="green"></Check>
                  <div className="text-black text-[13px]">
                    Tăng mức độ uy tín thương hiệu
                  </div>
                </div>
                <div className="flex flex-row items-center">
                  <Check size={20} color="green"></Check>
                  <div className="text-black text-[13px]">
                    Bảo vệ thương hiệu tuyển dụng trước các đối tượng giả mạo
                  </div>
                </div>
              </div>
            </div>
            <button className="text-sm btn-success py-1 px-3 rounded text-white bg-blue-500 cursor-pointer">
              <div className="flex flex-row space-x-2 items-center">
                <ShieldCheck size={20} />
                <div>Xác thực ngay</div>
              </div>
            </button>
          </div>
          <div className="flex flex-row items-center space-x-5">
            <div
              onClick={() => handleView(true)}
              className={`flex flex-row items-center justify-between ${view === true ? 'border-slate-200 border-b-green-500 border-2' : 'border-0 '}   p-4 flex-grow`}
            >
              <div className="flex flex-row items-center space-x-2">
                <Search
                  className={`flex flex-row items-center space-x-2 ${view === true ? 'text-green-600 bg-green-200' : 'bg-gray-200'} rounded-full p-2`}
                  size={30}
                ></Search>
                <div className="flex flex-col">
                  <div className="text-[14px] text-green-600">
                    Tìm kiếm thông tin công ty
                  </div>
                  <div className="text-[12px]">
                    Dành cho Doanh nghiệp đã có trên t4CVs
                  </div>
                </div>
              </div>
              {view === true && (
                <Check
                  className="text-white bg-green-500 rounded-full p-2"
                  size={30}
                ></Check>
              )}
            </div>
            <div
              onClick={() => handleView(false)}
              className={`flex flex-row items-center ${view === false ? 'border-slate-200 border-b-green-500 border-2' : 'border-0 '}  justify-between p-4 flex-grow`}
            >
              <div className="flex flex-row items-center space-x-2">
                <Plus
                  className={`bg-gray-200 ${view === false ? 'text-green-600 bg-green-200' : 'bg-gray-200'} rounded-full p-2`}
                  size={30}
                ></Plus>
                <div className="flex flex-col">
                  <div className="text-[14px] text-green-600">
                    Tạo công ty mới
                  </div>
                  <div className="text-[12px]">
                    Dành cho Doanh nghiệp lần đầu t4CVs
                  </div>
                </div>
                {view === false && (
                  <Check
                    className="text-white bg-green-500 rounded-full p-2"
                    size={30}
                  ></Check>
                )}
              </div>
            </div>
          </div>
          {/* */}
          {view ? (
            <div className="flex flex-col w-full border-slate-200 border-2 p-5">
              <div className="flex flex-row items-center space-x-2">
                <div className="relative w-5/6">
                  <Search className="text-gray-500 w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2"></Search>
                  <input
                    type="text"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full hover:border-green-400 focus:outline-none focus:ring-1 focus:ring-green-500"
                  />
                </div>
                <button className="text-sm btn-success py-3 px-8 text-white bg-green-500 shadow-md cursor-pointe rounded-full">
                  Tìm kiếm
                </button>
              </div>
              <h1 className="text-black my-3">Công ty mới tạo</h1>
              <div
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                style={{ height: '250px', overflowY: 'scroll' }}
              >
                {companies.length > 0 ? (
                  companies.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        // navigation(`/detail-job/${item.id}`);
                      }}
                      className="job-item-search-result max-h-60 bg-white px-3 py-3.5 mb-3 border border-transparent rounded-lg shadow-md flex items-center gap-3 hover:border-green-500"
                    >
                      <div className="job-logo-company justify-center w-32 h-24 flex items-center border rounded-lg overflow-hidden">
                        <img
                          src={item.image}
                          alt={`${item.name} logo`}
                          className="object-contain"
                        />
                      </div>
                      <div className="job-detail w-full h-full overflow-hidden">
                        <div className="flex flex-col">
                          <div className="flex flex-row justify-between">
                            <span className="job-title text-black font-semibold text-lg truncate w-4/5">
                              {item.name}
                            </span>
                          </div>
                        </div>
                        <span className="text-sm text-slate-600 ">
                          MST: {item.taxCode}
                        </span>
                        <div className="flex justify-between items-center ">
                          <p className="text-sm flex w-2/3">
                            <span className="truncate w-[70%]">
                              {item.address}
                            </span>
                            <span className="mx-1">|</span>
                            <span className="job-company-name text-slate-600 text-[10px] truncate w-4/5">
                              {item.companySize} nhân sự
                            </span>
                            {/* <span className="truncate w-[29%]">{item.time}</span> */}
                          </p>
                          <div className="job-actions flex items-center space-x-2">
                            <button
                              onClick={() => {
                                handleComponent(), setCompany(item);
                              }}
                              className="bg-green-100 text-sm hover:bg-green-300 text-green-700 py-0.5 px-1 rounded-full inline-flex items-center"
                            >
                              Chọn
                            </button>
                          </div>
                        </div>
                        <div className="text-sm bg-gray-100 px-2 py-1 w-fit rounded-lg">
                          {fields.find((i) => i.id === item.field)?.name}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>Không có dữ liệu</div>
                )}
              </div>
              <div className="flex justify-center mt-5">
                <DefaultPagination
                  totalPage={totalPages}
                  active={page}
                  setActive={setPage}
                />
              </div>
            </div>
          ) : (
            <CreateCompany handleView={() => handleView(true)}></CreateCompany>
          )}
        </div>
      </div>
    )
  ) : (
    <UpdateCompanyInfo
      handleComponent={handleComponent}
      company={company ?? companies[0]}
      fields={fieldss}
    ></UpdateCompanyInfo>
  );
}
export default CompanyInfo;
