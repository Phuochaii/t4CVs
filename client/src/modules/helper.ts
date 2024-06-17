import axios from 'axios';
import { CampaignFromServer } from '../shared/types/Campaign.type';
import { CompanyFromServer } from '../shared/types/Company.type';
import { Field, RecruitmentFromServer } from '../shared/types/Recruitment.type';
import { EmployerFromServer } from '../shared/types/Employer.type';

const serverURL = 'https://https-proxy-ten.vercel.app';

export async function getCampaignById(id: number) {
  const response = await axios.get(`${serverURL}/company/campaign/${id}`);
  const rawCampaign: CampaignFromServer = response.data;
  return rawCampaign;
}

export async function getAllCompany() {
  try {
    const response = await axios.get(`${serverURL}/company/all`);
    return response;
  } catch {
    throw new Error('Cannot fetch companies data');
  }
}
export async function getAllCompanies(page: number = 1) {
  const response = await axios.get(`${serverURL}/company/all?page=${page}`);
  const rawCompanies: CompanyFromServer[] = response.data.data;
  const totalPages = response.data.total_page;
  const total = response.data.total;
  return { allCompanies: rawCompanies, totalPages: totalPages, total: total };
}

export async function getCompanyById(id: number | string) {
  const response = await axios.get(`${serverURL}/company/${id}`);
  if (response.status != 200) return null;
  const rawCompany: CompanyFromServer = response.data;
  return rawCompany;
}
export async function getJobByCampaignId(token:string,campaignId: number) {
  try {
    const response = await axios.get(
      `${serverURL}/job?campaignId=${campaignId}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status != 200) return null;
    const rawJob: RecruitmentFromServer = response.data;
    return rawJob;
  } catch (e) {
    return null;
  }
}

// -------------------------------- phần bên dưới k có authen
export async function getJobById(id: number | string) {
  const response = await axios.get(`${serverURL}/job/${id}`);
  const rawJob: RecruitmentFromServer = response.data;
  return rawJob;
}

export async function getJobsStat(limit: number = 1000) {
  let response = await axios.get(`${serverURL}/job/all?limit=${limit}`);
  const total = response.data.total;
  response = await axios.get(`${serverURL}/job/all?limit=${limit}&status=true`);
  const isActive = response.data.total;
  response = await axios.get(
    `${serverURL}/job/all?limit=${limit}&status=false`,
  );
  const isNotActive = response.data.total;
  return { total: total, isActive: isActive, isNotActive: isNotActive };
}
//---
export async function getAllFields() {
  const response = await axios.get(`${serverURL}/job/field/all`);
  const fields: Field[] = response.data;
  return fields;
}
export const getAllMajor = async () => {
  try {
    const response = await axios.get(`${serverURL}/job/major/all`);
    return response.data;
  } catch (error) {
    console.error('Error in getAllMajor:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

export const getAllCurrency = async () => {
  try {
    const response = await axios.get(`${serverURL}/job/currency/all`);
    return response.data;
  } catch (error) {
    console.error('Error in getAllCurrency:', error);
    throw error;
  }
};

export const getAllExp = async (): Promise<any[]> => {
  try {
    const response = await axios.get(`${serverURL}/job/exp/all`);
    return response.data;
  } catch (error) {
    console.error('Error in getAllExp:', error);
    throw error;
  }
};

export const getAllLevel = async () => {
  try {
    const response = await axios.get(`${serverURL}/job/level/all`);
    return response.data;
  } catch (error) {
    console.error('Error in getAllLevel:', error);
    throw error;
  }
};

export const getAllLocation = async (): Promise<any[]> => {
  try {
    const response = await axios.get(`${serverURL}/job/location/all`);
    return response.data;
  } catch (error) {
    console.error('Error in getAllLocation:', error);
    throw error;
  }
};

export const getAllType = async () => {
  try {
    const response = await axios.get(`${serverURL}/job/type/all`);
    return response.data;
  } catch (error) {
    console.error('Error in getAllType:', error);
    throw error;
  }
};
// ---

export async function getAllJobs(page: number = 1) {
  const response = await axios.get(`${serverURL}/job/all?page=${page}`);
  const rawJobs: RecruitmentFromServer[] = response.data.data;
  const totalPages = response.data.total_pages;
  return { allJobs: rawJobs, totalPages: totalPages };
}

export const searchJob = async ({
  page = 1,
  limit = 0,
  titleRecruitment = '',
  salaryMin = 0,
  salaryMax = 0,
  fieldId = 0,
  locationId = 0,
  expId = 0,
  majorId = 0,
  typeId = 0,
  levelId = 0,
}: {
  page?: number;
  limit?: number;
  titleRecruitment?: string;
  salaryMin?: number;
  salaryMax?: number;
  fieldId?: number;
  locationId?: number;
  expId?: number;
  majorId?: number;
  typeId?: number;
  levelId?: number;
}) => {
  if (
    page === 1 &&
    limit === 0 &&
    titleRecruitment === '' &&
    salaryMin === 0 &&
    salaryMax === 0 &&
    fieldId === 0 &&
    locationId === 0 &&
    expId === 0 &&
    majorId === 0 &&
    typeId === 0 &&
    levelId === 0
  ) {
    try {
      const response = await axios.get(`${serverURL}/job/valid-jobs`);
      return response.data;
    } catch (error) {
      // Xử lý lỗi ở đây
      console.log(titleRecruitment);
      console.error('Đã có lỗi xảy ra khi tìm kiếm công việc:', error);
      throw error; // Ném lỗi để cho người dùng của hàm biết rằng có lỗi xảy ra
    }
  } else {
    try {
      const queryParams = {
        page: page !== 0 ? `page=${page}` : '',
        limit: limit !== 0 ? `limit=${limit}` : '',
        titleRecruitment:
          titleRecruitment !== '' ? `titleRecruitment=${titleRecruitment}` : '',
        salaryMin: salaryMin !== 0 ? `salaryMin=${salaryMin}` : '',
        salaryMax: salaryMax !== 0 ? `salaryMax=${salaryMax}` : '',
        fieldId: fieldId !== 0 ? `fieldId=${fieldId}` : '',
        locationId: locationId !== 0 ? `locationId=${locationId}` : '',
        expId: expId !== 0 ? `expId=${expId}` : '',
        majorId: majorId !== 0 ? `majorId=${majorId}` : '',
        typeId: typeId !== 0 ? `typeId=${typeId}` : '',
        levelId: levelId !== 0 ? `levelId=${levelId}` : '',
      };

      const queryString = Object.values(queryParams)
        .filter((param) => param !== '')
        .join('&');

      const url = `${serverURL}/job/valid-jobs?${queryString}`;
      console.log(`${serverURL}/job/valid-jobs?${queryString}`);

      const response = await axios.get(url);

      return response.data;
    } catch (error) {
      // Xử lý lỗi ở đây
      console.log(titleRecruitment);
      console.error('Đã có lỗi xảy ra khi tìm kiếm công việc:', error);
      throw error; // Ném lỗi để cho người dùng của hàm biết rằng có lỗi xảy ra
    }
  }
};

export async function findEmployerByName(
  name: string,
  page: number = 1,
  limit: number = 10,
) {
  const response = await axios.get(`
    ${serverURL}/employer/name/${name}?page=${page}&limit=${limit}`);
  const rawEmployers: EmployerFromServer[] = response.data.data;
  return {
    allEmployers: rawEmployers,
    total: response.data.total,
    totalPages: response.data.total_page,
  };
}

export async function findCompanyByName(
  name: string,
  page: number = 1,
  limit: number = 5,
) {
  const response = await axios.get(`
    ${serverURL}/company/name/${name}?page=${page}&limit=${limit}`);
  const rawCompanies: CompanyFromServer[] = response.data.data;
  const totalPages = response.data.total_page;
  const total = response.data.total;
  return { allCompanies: rawCompanies, totalPages: totalPages, total: total };
}
