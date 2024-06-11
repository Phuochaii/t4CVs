import {
  ChevronDown,
  ChevronLeftCircle,
  ChevronRightCircle,
  Search,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { findEmployerByName, getCompanyById } from '../../modules/helper';
import {
  getAllEmployer,
  updateLicenseStatus,
  updatePhoneStatus,
} from '../../modules/admin-module';
import BasicTable, {
  BasicColumnProps,
  ObjectFromServer,
} from '../../shared/components/basic-table';
import { EmployerFromServer } from '../../shared/types/Employer.type';
import Switch from '../../shared/components/CustomSwitch';
import clsx from 'clsx';
import { useProfileContext } from '../../shared/services/authen/domain/context';

function Employer() {
  const [employers, setEmployers] = useState<EmployerFromServer[]>([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [searchText, setSearchText] = useState('');
  const { token } = useProfileContext();
  // console.log(token); //Có token

  useEffect(() => {
    async function getData() {
      const {
        allEmployers,
        // total,
        totalPages,
      }: {
        allEmployers: EmployerFromServer[];
        total: number;
        totalPages: number;
      } = await getAllEmployer(token, page); // Cấn authen
      console.log(allEmployers);
      const allEmployersWithCompany = allEmployers.map(async (employer) => {
        const company = employer.companyId
          ? await getCompanyById(employer.companyId)
          : null;
        return { ...employer, company: company };
      });
      setEmployers(await Promise.all(allEmployersWithCompany));
      setTotalPages(totalPages);
    }
    async function getDataSearch() {
      const {
        employers,
      }: {
        employers: EmployerFromServer[];
      } = await findEmployerByName(searchText, page);
      console.log(employers);
      setEmployers(employers);
    }
    if (searchText == '') {
      getData();
    } else {
      getDataSearch();
    }
  }, [page, refresh, searchText]);

  const columns: BasicColumnProps[] = useMemo(
    () => [
      {
        name: 'Họ và tên',
        field: 'fullname',
        tableCellClassname: '',
        cell: (data: ObjectFromServer) => {
          const employer = data as EmployerFromServer;
          return (
            <div className="flex flex-col items-center">
              <img src={employer.image} alt="Avatar" className="w-24 h-24" />
              <span>{employer.fullname}</span>
            </div>
          );
        },
      },
      {
        name: 'Giới tính',
        field: 'fullname',
        tableCellClassname: '',
        cell: (data: ObjectFromServer) => {
          const employer = data as EmployerFromServer;
          return <div>{employer.gender === 'Male' ? 'Nam' : 'Nữ'}</div>;
        },
      },
      {
        name: 'Số điện thoại',
        field: 'phoneNumber',
        tableCellClassname: '',
        cell: (data: ObjectFromServer) => {
          const employer = data as EmployerFromServer;
          return (
            <div className="flex flex-col">
              <span
                className={clsx(
                  employer.phoneNumberStatus
                    ? 'text-green-600'
                    : 'text-gray-400',
                )}
              >
                {employer.phoneNumber}
              </span>
              <Switch
                checked={employer.phoneNumberStatus}
                onChange={async () => {
                  await updatePhoneStatus(
                    token,
                    employer.id,
                    !employer.phoneNumberStatus,
                  );
                  setRefresh(!refresh);
                }}
              ></Switch>
            </div>
          );
        },
      },
      {
        name: 'Skype',
        field: 'skype',
        tableCellClassname: '',
        cell: (data: ObjectFromServer) => {
          const employer = data as EmployerFromServer;
          return (
            <div className="">
              <a href={employer.skype}>Đường dẫn tới Skype</a>
            </div>
          );
        },
      },
      {
        name: 'Công ty',
        field: 'skype',
        tableCellClassname: '',
        cell: (data: ObjectFromServer) => {
          const employer = data as EmployerFromServer;
          return <div className="">{employer.company?.name}</div>;
        },
      },
      {
        name: 'Giấy phép',
        field: 'skype',
        tableCellClassname: '',
        cell: (data: ObjectFromServer) => {
          const employer = data as EmployerFromServer;
          return (
            <div className="flex flex-col">
              <a href={employer.license}>
                <img src={employer.license} className="w-32 object-contain" />
              </a>
              <Switch
                checked={employer.licenseStatus}
                onChange={async () => {
                  await updateLicenseStatus(
                    token,
                    employer.id,
                    !employer.licenseStatus,
                  );
                  setRefresh(!refresh);
                }}
              ></Switch>
            </div>
          );
        },
      },
    ],
    [],
  );

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col items-center flex-grow bg-slate-200">
      <div className="w-full p-2 bg-white">
        <h2 className="font-bold">Quản lý công ty tuyển dụng</h2>
      </div>
      <div className="flex flex-col items-center justify-between gap-2 py-8 w-[90%]">
        <div className="flex items-center justify-between w-full gap-2">
          <div className="flex items-center flex-grow divide-x-2">
            <div className="flex items-center justify-between h-full p-2 text-sm bg-white">
              <span className="text-gray-400">Tất cả nhà tuyển dụng</span>
              <ChevronDown stroke="#9ca3af" size={16} />
            </div>
            <form
              onSubmit={handleSearch}
              className="flex items-center justify-between flex-grow p-2 text-sm bg-white "
            >
              <input
                className="w-full text-gray-400"
                placeholder="Tìm nhà tuyển dụng (Nhập để tìm kiếm)"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              ></input>
              <Search stroke="#9ca3af" size={16} />
            </form>
          </div>
        </div>
        <BasicTable data={employers} columns={columns} tableFor="employer" />
        <div className="flex items-center self-center justify-center gap-2">
          <ChevronLeftCircle
            className="cursor-pointer"
            stroke="green"
            strokeWidth={1}
            onClick={() => {
              setPage(page - 1 > 0 ? page - 1 : page);
            }}
          />
          <span className="font-bold text-green-600">{page}</span>/
          <span>{totalPages}</span>
          <ChevronRightCircle
            stroke="green"
            className="cursor-pointer"
            strokeWidth={1}
            onClick={() => setPage(page + 1 <= totalPages ? page + 1 : page)}
          />
        </div>
      </div>
    </div>
  );
}

export default Employer;
