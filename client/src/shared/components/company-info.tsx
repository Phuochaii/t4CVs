import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import { ShieldCheck, Check, Star, Search, Plus } from "lucide-react"
import FPT from '../../shared/assets/images/FPT.jpg';
import VNRS from '../../shared/assets/images/VNRS.png';
function CompanyInfo() {
    const companies = [
        { id: 1, name: 'CÔNG TY CỔ PHẦN TÀI NGUYÊN TRI THỨC VIỆT NĂNG', number: '0401530734', logo: VNRS, time: '06-09-2023 21:36 PM', address: '316 Chánh Hưng, Phường 5, Quận 8', field:'Lập trình phần mềm' },
        { id: 2, name: 'FPT information system', number: '0401530735', logo: FPT, time: '14-09-2023 15:55 PM', address: '170/2 Đường Nguyễn Xí, Quận 26', field:'Khác' },
        { id: 3, name: 'CÔNG TY CỔ PHẦN TÀI NGUYÊN TRI THỨC VIỆT NĂNG', number: '0401530734', logo: VNRS, time: '06-09-2023 21:36 PM', address: '316 Chánh Hưng, Phường 5, Quận 8', field:'Lập trình phần mềm' },
        { id: 4, name: 'FPT information system', number: '0401530735', logo: FPT, time: '14-09-2023 15:55 PM', address: '170/2 Đường Nguyễn Xí, Quận 26', field:'Khác' },
        { id: 5, name: 'CÔNG TY CỔ PHẦN TÀI NGUYÊN TRI THỨC VIỆT NĂNG', number: '0401530734', logo: VNRS, time: '06-09-2023 21:36 PM', address: '316 Chánh Hưng, Phường 5, Quận 8', field:'Lập trình phần mềm' },
        { id: 6, name: 'FPT information system', number: '0401530735', logo: FPT, time: '14-09-2023 15:55 PM', address: '170/2 Đường Nguyễn Xí, Quận 26', field:'Khác' },
    ];
    return (
        <div className="w-full m-10 flex flex-col">
            <div
                className={`btn text-sm p-3 flex items-center justify-between w-11/12`}
                style={{
                    backgroundColor: "#EBF3FF",
                    color: "#2D7CF1",
                    marginBottom: "15.96px",
                }}
            >
                <div className="flex flex-row items-center space-x-4">
                    <Star
                        className="text-blue-600"
                        style={{ width: 40, height: 40 }}
                    />
                    <div className="flex flex-col" >
                        <span className="text-[13px] ml-1 mr-1">Xác nhận tài khoản điện tử giúp bạn</span>
                        <div className="flex flex-row items-center">
                            <Check size={20} color="green"></Check>
                            <div className="text-black text-[13px]">Tăng mức độ uy tín thương hiệu</div>
                        </div>
                        <div className="flex flex-row items-center">
                            <Check size={20} color="green"></Check>
                            <div className="text-black text-[13px]">Bảo vệ thương hiệu tuyển dụng trước các đối tượng giả mạo</div>
                        </div>
                    </div>
                </div>
                <button
                    className="text-sm btn-success py-1 px-3 rounded text-white bg-blue-500 cursor-pointer"
                >
                    <div className="flex flex-row space-x-2 items-center">
                        <ShieldCheck size={20} />
                        <div>Xác thực ngay</div>
                    </div>
                </button>
            </div>
            <div className="flex flex-row items-center space-x-5">
                <div className="flex flex-row items-center justify-between border-slate-200 border-b-green-500 border-2 p-4 w-[50%]">
                    <div className="flex flex-row items-center space-x-2">
                        <Search className="text-green-600 bg-green-200 rounded-full p-2" size={30}></Search>
                        <div className="flex flex-col">
                            <div className="text-[14px] text-green-600">Tìm kiếm thông tin công ty</div>
                            <div className="text-[12px]">Dành cho Doanh nghiệp đã có trên TopCV</div>
                        </div>
                    </div>
                    <Check className="text-white bg-green-500 rounded-full p-2" size={30}></Check>
                </div>
                <div className="flex flex-row items-center justify-between p-4 w-[50%]">
                    <div className="flex flex-row items-center space-x-2">
                        <Plus className="bg-gray-200 rounded-full p-2" size={30}></Plus>
                        <div className="flex flex-col">
                            <div className="text-[14px] text-green-600">Tạo công ty mới</div>
                            <div className="text-[12px]">Dành cho Doanh nghiệp lần đầu TopCV</div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row items-center"></div>
            </div>
            <div className="flex flex-col w-11/12 border-slate-200 border-2 p-5">
                <div className="flex flex-row items-center space-x-2">
                    <div className="relative w-5/6">
                        <Search className="text-gray-500 w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2"></Search>
                        <input
                            type="text"
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full hover:border-green-400 focus:outline-none focus:ring-1 focus:ring-green-500"
                        />
                    </div>
                    <button
                        className="text-sm btn-success py-3 px-8 rounded text-white bg-green-500 shadow-md cursor-pointe rounded-full"
                    >
                        Tìm kiếm
                    </button>
                </div>
                <h1 className="text-black my-3">Công ty mới tạo</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4" style={{height: '250px', overflowY: 'scroll'}}>
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
                                        src={item.logo}
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
                                        <span className="job-company-name text-slate-600 text-sm truncate w-4/5">
                                            {item.number}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center ">
                                        <p className="text-sm flex w-2/3">
                                            <span className="truncate w-[70%]">{item.address}</span>
                                            <span className="mx-1">|</span>
                                            <span className="truncate w-[29%]">{item.time}</span>
                                        </p>
                                        <div className="job-actions flex items-center space-x-2">

                                            <button className="bg-green-100 text-sm hover:bg-green-300 text-green-700 py-1 px-2 rounded-full inline-flex items-center">
                                                Chọn
                                            </button>
                                        </div>
                                    </div>
                                    <div className="text-sm bg-gray-200 px-2 py-1 w-fit rounded-lg">{item.field}</div>
                                </div>
                                
                            </div>
                        ))
                    ) : (
                        <div>Không có dữ liệu</div>
                    )}
                </div>
            </div>
        </div>)
}
export default CompanyInfo