import axios from 'axios';
import { EmployerFromServer } from '../shared/types/Employer.type';
import { UserFromServer } from '../shared/types/User.type';
import { ApplicationFromServer } from '../shared/types/Application.type';
import { CampaignFromServer } from '../shared/types/Campaign.type';
import { RecruitmentFromServer } from '../shared/types/Recruitment.type';

const serverURL = 'http://localhost:3000';

// không đụng vào phần này
export const isAdmin = async (token: string) => {
  const result = await axios
    .get('http://localhost:3000/admin/check', {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data as boolean);
  return result;
};

export const getProfile = async (token: string) => {
  const result = await axios
    .get('http://localhost:3000/admin/profile', {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data as { name: string; picture?: string });
  return result;
};
// không đụng tới phần trên

const findAllCV = async (token: string) => {
  const result = await axios
    .get(`${serverURL}/cv`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
  return result;
};

const getJobs = async (token: string, page: number, limit: number) => {
  const result = await axios
    .get(`${serverURL}/job/all?page=${page}&limit=${limit}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
  return result;
};

const getJobById = async (token: string, id: string) => {
  const result = await axios
    .get(`${serverURL}/job/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
  return result;
};

// Ko có trong POSTMAN
const getAllCampaigns = async (page: number = 1) => {
  const response = await axios.get(
    `${serverURL}/company/campaign/all?page=${page}`,
  );
  const rawCampaigns: CampaignFromServer[] = response.data.data;
  const totalPages = response.data.total_page;
  return { allCampaigns: rawCampaigns, totalPages: totalPages };
};

// Ko có trong POSTMAN
const getAllEmployer = async (
  token: string,
  page: number = 1,
  limit: number = 10,
) => {
  const response = await axios.get(
    `${serverURL}/employer/all?page=${page}&limit=${limit}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );
  const rawEmployers: EmployerFromServer[] = response.data.data;
  return {
    allEmployers: rawEmployers,
    total: response.data.total,
    totalPages: response.data.total_page,
  };
};

// Ko có trong POSTMAN
const getApplicationsByCampaignId = async (
  token: string,
  hrId: number,
  page: number,
  limit: number,
  campaignId: number,
  status: boolean,
) => {
  const response = await axios.get(
    `${serverURL}/application/admin/${hrId}?page=${page}&limit=${limit}&campaignId=${campaignId}&status=${status}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );
  const rawApplications: ApplicationFromServer[] = response.data.applications;
  const total = response.data.total;
  return { total: total, applications: rawApplications };
};

const getUsers = async (token: string, page: number, limit: number) => {
  try {
    const response = await axios.get(
      `${serverURL}/user/all?page=${page}&limit=${limit}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    );
    const user: UserFromServer = response.data;
    return user;
  } catch (e) {
    return null;
  }
};

const getUserById = async (token: string, userId: number) => {
  try {
    const response = await axios.get(`${serverURL}/user/${userId}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const user: UserFromServer = response.data;
    return user;
  } catch (e) {
    return null;
  }
};

const updateCompanyStatus = async (
  token: string,
  id: number,
  status: boolean,
) => {
  const response = await axios.put(
    `${serverURL}/company/updateStatus`,
    {
      id: id,
      status: status,
    },
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );
  return response;
};
const updateLicenseStatus = async (
  token: string,
  employerId: number,
  status: boolean,
) => {
  const response = await axios.put(
    `${serverURL}/employer/update/licenseStatus`,
    {
      employerId: employerId,
      licenseStatus: status,
    },
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );
  return response;
};

const updatePhoneStatus = async (
  token: string,
  employerId: number,
  status: boolean,
) => {
  const response = await axios.put(
    `${serverURL}/employer/update/phoneNumberStatus`,
    {
      employerId: employerId,
      phoneNumberStatus: status,
    },
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );
  return response;
};

const updateJobStatus = async (token: string, id: number, status: boolean) => {
  const response = await axios.put(
    `${serverURL}/job/update-status`,
    {
      id: id,
      status: status,
    },
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );
  return response;
};

const deleteJob = async (token: string, id: string) => {
  const response = await axios
    .delete(`${serverURL}/job/${id}`, {
      headers: { authorization: `Bearer ${token}` },
    })
    .then((res) => res.data);
  return response;
};

// Ko có trong POSTMAN
const getEmployerById = async (id: number | string) => {
  const response = await axios.get(`${serverURL}/employer/${id}`);
  const rawEmployer: EmployerFromServer = response.data;
  return rawEmployer;
};

const getAllJobs = async (
  token: string,
  page: number = 1,
  limit: number = 5,
) => {
  const response = await axios.get(
    `${serverURL}/job/all?page=${page}&limit=${limit}`,
    {
      headers: { authorization: `Bearer ${token}` },
    },
  );
  const rawJobs: RecruitmentFromServer[] = response.data.data;
  const totalPages = response.data.total_pages;
  return { allJobs: rawJobs, totalPages: totalPages };
};

const getJobsStat = async (token: string, limit: number = 1000) => {
  let response = await axios.get(`${serverURL}/job/all?limit=${limit}`, {
    headers: { authorization: `Bearer ${token}` },
  });
  const total = response.data.total;
  response = await axios.get(
    `${serverURL}/job/all?limit=${limit}&status=true`,
    {
      headers: { authorization: `Bearer ${token}` },
    },
  );
  const isActive = response.data.total;
  response = await axios.get(
    `${serverURL}/job/all?limit=${limit}&status=false`,
    {
      headers: { authorization: `Bearer ${token}` },
    },
  );
  const isNotActive = response.data.total;
  return { total: total, isActive: isActive, isNotActive: isNotActive };
};

const getJobByCampaignId = async (token: string, campaignId: number) => {
  try {
    const response = await axios.get(
      `${serverURL}/job?campaignId=${campaignId}`,
      {
        headers: { authorization: `Bearer ${token}` },
      },
    );
    if (response.status != 200) return null;
    const rawJob: RecruitmentFromServer = response.data;
    return rawJob;
  } catch (e) {
    return null;
  }
};

const findJobRecruitmentByName = async (
  token: string,
  page: number = 1,
  limit: number = 5,
  name: string,
) => {
  const response = await axios.get(
    `${serverURL}/job/all?page=${page}&limit=${limit}&titleRecruitment=${name}`,
    {
      headers: { authorization: `Bearer ${token}` },
    },
  );
  const rawJobs: RecruitmentFromServer[] = response.data.data;
  const totalPages = response.data.total_pages;
  return { allJobs: rawJobs, totalPages: totalPages };
};

const findCampaignByName = async (
  token: string,
  name: string,
  page: number = 1,
  limit: number = 5,
) => {
  const response = await axios.get(
    `${serverURL}/company/campaign/name/${name}?page=${page}&limit=${limit}`,
    {
      headers: { authorization: `Bearer ${token}` },
    },
  );
  if (response.status === 400) return { allCampaigns: null, totalPages: 0 };
  const rawCampaigns: CampaignFromServer[] = response.data.data;
  const totalPages = response.data.total_page;
  return { allCampaigns: rawCampaigns, totalPages: totalPages };
};

// cập nhật các function vào đây
export {
  findAllCV,
  getJobs,
  getJobById,
  updateJobStatus,
  deleteJob,
  getUsers,
  getUserById,
  updateCompanyStatus,
  updateLicenseStatus,
  updatePhoneStatus,
  // Ko có trong POSTMAN
  getAllCampaigns,
  getAllEmployer,
  getApplicationsByCampaignId,
  getEmployerById,
  getAllJobs,
  getJobsStat,
  getJobByCampaignId,
  findJobRecruitmentByName,
  findCampaignByName,
};
