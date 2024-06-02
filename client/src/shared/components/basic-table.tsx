import { CompanyFromServer } from '../types/Company.type';
import { CampaignFromServer } from '../types/Campaign.type';
import { RecruitmentFromServer } from '../types/Recruitment.type';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

export type ObjectFromServer =
  | CompanyFromServer
  | CampaignFromServer
  | RecruitmentFromServer;

export interface BasicColumnProps {
  field: string;
  name: string;
  tableCellClassname?: string;
  cell: (data: ObjectFromServer) => JSX.Element;
}

interface BasicTableProps {
  data: any[];
  columns: BasicColumnProps[];
}

function BasicTable({ data, columns }: BasicTableProps) {
  const navigation = useNavigate();
  return (
    <table className="w-full bg-white">
      <thead>
        <tr>
          {columns.map((column, index) => {
            return (
              <td
                key={'header-' + index.toString()}
                className="font-bold border"
              >
                {column.name}
              </td>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {data.map((object, index) => {
          return (
            <tr key={'row-' + index.toString()}>
              {columns.map((column, colIndex) => {
                return (
                  <td
                    className={clsx('border', column.tableCellClassname)}
                    key={'column-' + colIndex.toString()}
                    onClick={() => {
                      if (colIndex === 1) {
                        navigation(`/admin/company/${object.id}`);
                      }
                    }}
                  >
                    {column.cell(object)}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default BasicTable;
