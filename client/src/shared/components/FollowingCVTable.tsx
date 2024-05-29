import { Clock, Phone, Mail } from 'lucide-react';
import { ApplicationFromServer } from '../types/Application.type';

interface TableProps {
  data: ApplicationFromServer[];
}

function FollowingCVTable({ data }: TableProps) {
  return (
    <table className="p-5" style={{ width: '100%' }}>
      <thead className="border-b-2 border-gray-100 capitalize pb-2">
        <tr>
          <th className="text-left capitalize">CV Ứng viên</th>
          <th className="text-left">Thông tin liên hệ</th>
          <th className="text-left" style={{ width: '400px' }}>
            Insighs
          </th>
          <th className="text-left">Trạng thái</th>
        </tr>
      </thead>
      <tbody className="pt-2">
        {data.map((item: any, index: number) => (
          <tr
            key={index}
            className="font-medium my-5 mx-3"
            style={{ fontSize: '13px' }}
          >
            <td className="flex items-center" style={{ maxWidth: '300px' }}>
              <div className="w-20 rounded-full inline-block mr-5 border-black border-2">
                <img
                  className="w-full"
                  src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                />
              </div>
              <div className="h-full">
                <p className=" text-lg font-bold">{item.fullname}</p>

                <button className="bg-green-300 text-white my-2 px-2">
                  Xem CV
                </button>
              </div>
            </td>

            <td>
              <a
                href={`mailto:${item.email}`}
                className="flex hover:text-green-500 text-sm"
              >
                <Mail
                  size={15}
                  color="#38A34D"
                  style={{ marginRight: '5px' }}
                />
                {item.email}
              </a>
              <a
                href={`tel:${item.phone}`}
                className="flex hover:text-green-500 text-sm"
              >
                <Phone
                  color="#38A34D"
                  size={18}
                  style={{ marginRight: '5px' }}
                />
                {item.phone}
              </a>
            </td>
            <td className="">
              <p className="flex">
                <Mail
                  size={15}
                  color="#38A34D"
                  style={{ marginRight: '5px' }}
                />
                Tìm việc
              </p>
              <p className="flex">
                <Clock
                  size={15}
                  color="#38A34D"
                  style={{ marginRight: '5px' }}
                />
                {item.updateAt}
              </p>
              <p className="flex px-3 py-1 bg-[#b7c1d12f]">
                {item.coverLetter}
              </p>
            </td>
            <td>
              <div
                className={`rounded-full ${item.status ? 'bg-orange-100 text-orange-400' : 'bg-blue-200 text-blue-500'} px-3`}
              >
                {item.status ? 'Đã xem' : 'Chưa xem'}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default FollowingCVTable;
