import { useState, useEffect } from 'react';
import axios from 'axios';

import SearchCompany from '../../shared/components/SearchCompany';
import CompanyCard from '../../shared/components/CompanyCard';
import { findCompanyByName } from '../../shared/utils/helper';
import { CompanyFromServer } from '../../shared/types/Company.type';

function Companies() {
  const [companies, setCompanies] = useState<CompanyFromServer[]>([]);
  const [searchText, setSearchText] = useState('');

  const fetchCompanies = async () => {
    try {
      const response = await axios.get('http://localhost:3000/company/all');
      console.log(response.data.data);
      setCompanies(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    async function getData() {
      const {
        companies,
      }: {
        companies: CompanyFromServer[];
      } = await findCompanyByName(searchText);
      console.log(companies);
      setCompanies(companies);
    }
    if (searchText == '') {
      fetchCompanies();
    } else {
      getData();
    }
  }, [searchText]);

  const handleSearch = (text) => {
    setSearchText(text);
  };
  return (
    <>
      <SearchCompany onSearch={handleSearch} />
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
