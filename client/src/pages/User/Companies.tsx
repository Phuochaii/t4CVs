import { useState, useEffect } from 'react';

import SearchCompany from '../../shared/components/SearchCompany';
import CompanyCard from '../../shared/components/CompanyCard';
import { useProfileContext } from '../../shared/services/authen/domain/context';

import * as HelperModule from '../../modules/helper';

function Companies() {
  const [companies, setCompanies] = useState([]);
  const { token } = useProfileContext();
  useEffect(() => {
    fetchCompanies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCompanies = async () => {
    try {
      // const response = await axios.get('http://localhost:3000/company/all');
      const response = await HelperModule.getAllCompany();
      console.log(response);
      setCompanies(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  return (
    <>
      <SearchCompany />
      <div className="w-full bg-white text-black">
        <div className="text-center py-6 text-[#333] text-2xl font-semibold">
          DANH SÁCH CÁC CÔNG TY NỔI BẬT
        </div>
        <div className="px-20 grid grid-cols-3 gap-4">
          {companies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Companies;
