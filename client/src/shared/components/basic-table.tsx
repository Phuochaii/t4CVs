import { CompanyFromServer } from '../types/Company.type';
import { CampaignFromServer } from '../types/Campaign.type';
import { RecruitmentFromServer } from '../types/Recruitment.type';
import clsx from 'clsx';
import { EmployerFromServer } from '../types/Employer.type';
import { useNavigate } from 'react-router-dom';

export type ObjectFromServer =
  | CompanyFromServer
  | CampaignFromServer
  | RecruitmentFromServer
  | EmployerFromServer;

export interface BasicColumnProps {
  field: string;
  name: string;
  tableCellClassname?: string;
  cell: (data: ObjectFromServer) => JSX.Element;
}

interface BasicTableProps {
  data: any[];
  columns: BasicColumnProps[];
  tableFor?: string;
}

function BasicTable({ data, columns, tableFor }: BasicTableProps) {
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
                      if (colIndex === 1 && tableFor) {
                        navigation(`/admin/${tableFor}/${object.id}`);
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
