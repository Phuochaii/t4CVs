import axios from 'axios';
import { CampaignFromServer } from '../shared/types/Campaign.type';
import { EmployerFromServer } from '../shared/types/Employer.type';
import { ApplicationFromServer } from '../shared/types/Application.type';
import { UserFromServer } from '../shared/types/User.type';
import { UserCV } from '../shared/types/CV_user.type';
import { RecruitmentFromServer } from '../shared/types/Recruitment.type';

const serverURL = 'http://34.28.130.105';

// ------------------- khong dụng vào phần này
interface CreateEmployerInterface {
  id: string;
  fullname?: string;
  gender: string;
  positionId: number;
  skype: string;
  phoneNumber: string;
  image: string;
  token: string;
}
export const createEmpolyer = async ({
  id,
  fullname,
  gender,
  positionId,
  skype,
  phoneNumber,
  image,
  token,
}: CreateEmployerInterface) => {
  const response = await axios
    .post(
      `${serverURL}/employer/create`,
      {
        id,
        fullname,
        gender,
        positionId,
        skype,
        phoneNumber,
        image,
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    )
    .then((res) => res.data);
  return response;
};
const isHr: (token: string) => Promise<boolean> = async (token) => {
  const result = await axios
    .get('http://34.28.130.105/employer/check', {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      return res.data as boolean;
    });
  return result;
};
const getProfile: (token: string) => Promise<{
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
}> = async (token) => {
  const response = await axios.get(`${serverURL}/employer/profile`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  if (!response.data)
    throw new Error('Getting hr profile but not having hr profile data');
  return response.data;
};
// --------------------không đụng phần trên

// GET APPLICATION BY HR ID
const getApplicationByCampaignIdHRId = async ({
  page = 1,
  limit = 5,
  campaignId,
  status,
  token,
}: {
  page?: number;
  limit?: number;
  campaignId: string;
  status?: boolean;
  token: string;
}) => {
  console.log(
    `${serverURL}/application/hr?page=${page}&limit=${limit}&campaignId=${campaignId}${status != undefined ? `&status=${status}` : ''}`,
  );

  const response = await axios.get(
    `${serverURL}/application/hr?page=${page}&limit=${limit}&campaignId=${campaignId}${status != undefined ? `&status=${status}` : ''}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );
  console.log(response.data);
  return response.data;
};

// GET ONE COMPAIGN BY ID
const getCampaignById = async ({ id }: { id: string }) => {
  const response = await axios.get(`${serverURL}/company/campaign/${id}`);
  return response.data;
};

// GET ALL CAMPAIGN BY HR ID
const getAllCompaignByHrId = async ({ token }: { token: string }) => {
  const response = await axios.get(
    `${serverURL}/company/campaign/employer/authorize`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );
  const responseData = response.data;
  const { data, total_page } = responseData;
  console.log(data, total_page);
  return { allCampaigns: data, totalPages: total_page };
};

// UPDATE APPLICATION STATUS
const updateApplicationStatus = async ({
  applicationId,
  token,
  status,
}: {
  applicationId: number;
  token: string;
  status: boolean;
}) => {
  const response = await axios.patch(
    `${serverURL}/application/${applicationId}`,
    {
      status: status,
    },
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );
  // console.log(response.data);

  return response.data;
};

//GET CV BY APPLICATION ID
const getCVByApplicationID = async ({
  applicationId,
  token,
}: {
  applicationId: number;
  token: string;
}) => {
  const response = await axios.get(
    `${serverURL}/application/${applicationId}/cv`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );
  // console.log(response.data);
  return response.data;
};

const getNotification = async ({
  page = 1,
  limit = 3,
  token,
}: {
  page?: number;
  limit?: number;
  token: string;
}) => {
  const response = await axios.get(
    `${serverURL}/notification/hr?limit=${limit}&page=${page}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};

// UPDATE STATUS NOTIFICATION
const updateStatusNotification = async ({
  notificationId,
  token,
}: {
  notificationId: number;
  token: string;
}) => {
  const response = await axios
    .put(
      `${serverURL}/notification/hr/${notificationId}`,
      {
        status: 1,
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    )
    .then((res) => {
      // console.log(`${serverURL}/notification/hr/${userId}/${notificationId}`);
      console.log(res);
      return res;
    });
  return response;
};

// --- authen

// CREATE COMPAIGN
const createCompaign = async ({
  name,
  token,
}: {
  name: string;
  token: string;
}) => {
  const response = await axios
    .post(
      `${serverURL}/company/campaign/create`,
      { name },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    )
    .then((res) => {
      console.log(res.data);
      return res;
    });
  return response.data;
};

// GET ALL POSITION
const getPosition = async () => {
  const response = await axios.get(`${serverURL}/employer/position/all`);
  return response.data;
};
// ---

const updateEmployerLicense = async (formData: FormData, token: string) => {
  const response = await axios
    .put(`${serverURL}/employer/update/license`, formData, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      console.log(res);
      return res;
    });
  return response.data;
};

const getHRById = async (hrId: string | number) => {
  const response = await axios
    .get(`${serverURL}/employer/${hrId}`)
    .then((res) => {
      return res;
    });
  return response;
};

const getHRPosition = async () => {
  const response = await axios
    .get(`${serverURL}/employer/position/all`)
    .then((res) => {
      return res;
    });
  return response;
};

const uploadHRProfile = async ({
  formData,
  token,
}: {
  formData: FormData;
  token: string;
}) => {
  const response = await axios
    .put(`${serverURL}/employer/update`, formData, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      return res;
    });
  return response;
};

export async function getAllCampaigns(page: number = 1) {
  const response = await axios.get(
    `${serverURL}/company/campaign/all?page=${page}`,
  );
  const rawCampaigns: CampaignFromServer[] = response.data.data;
  const totalPages = response.data.total_page;
  return { allCampaigns: rawCampaigns, totalPages: totalPages };
}

export async function getApplicationsByCampaignId(
  token: string,
  campaignId: number,
) {
  const response = await axios.get(
    `${serverURL}/application/hr?page=1&limit=100&campaignId=${campaignId}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );
  const rawApplications: ApplicationFromServer[] = response.data.applications;
  const total = response.data.total;
  return { total: total, applications: rawApplications };
}

export async function getUserById(userId: number, token: string) {
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
}
export async function getField(token: string) {
  try {
    const response = await axios.get(`${serverURL}/job/create-info`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const field = response.data;
    return field;
  } catch (e) {
    return null;
  }
}
export async function postJob(token: string, body: any) {
  try {
    console.log(body);
    const response = await axios.post(`${serverURL}/job/create`, body, {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (e) {
    return null;
  }
}
export async function updateCompanyId(token: string, companyId: number) {
  try {
    const body = {
      companyId: companyId,
    };

    const response = await axios.put(
      `${serverURL}/employer/update/companyid`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );

    // Check if the response is OK
    if (!response) {
      throw new Error('Failed to update companyId');
    }

    // Log and return the response data
    console.log('Data successfully updated:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating companyId:', error);
    return null;
  }
}
export async function getCVById(cvId: number, token: string) {
  try {
    const response = await axios.get(`${serverURL}/cv/${cvId}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const CV: UserCV = response.data;
    return CV;
  } catch (e) {
    return null;
  }
}

export async function getCampaignByHRId(id: number, page: number = 1) {
  const response = await axios.get(
    `${serverURL}/company/campaign/employer/${id}?page=${page}`,
  );
  const rawCampaigns: CampaignFromServer[] = response.data.data;
  const totalPages = response.data.total_page;
  return { allCampaigns: rawCampaigns, totalPages: totalPages };
}
export async function getCampaign(id: number, page: number = 1) {
  const response = await axios.get(
    `${serverURL}/company/campaign/employer/${id}?page=${page}`,
  );
  const rawCampaigns: CampaignFromServer[] = response.data.data;
  const totalPages = response.data.total_page;
  return { allCampaigns: rawCampaigns, totalPages: totalPages };
}
export async function deleteCampaign({
  id,
  token,
}: {
  id: string;
  token: string;
}) {
  const response = await axios.delete(`${serverURL}/company/campaign/${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  console.log(response);
  return response;
}
export async function getEmployerById(id: number | string) {
  const response = await axios.get(`${serverURL}/employer/${id}`);
  const rawEmployer: EmployerFromServer = response.data;
  return rawEmployer;
}

export async function getJobByCampaignId(
  token: string,
  campaignId: number | string,
) {
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
}

// cập nhật các function export vào đây (dưới đây chưa đủ)
export {
  getApplicationByCampaignIdHRId,
  getCampaignById,
  getAllCompaignByHrId,
  updateApplicationStatus,
  getCVByApplicationID,
  getNotification,
  updateStatusNotification,
  createCompaign,
  getPosition,
  updateEmployerLicense,
  getHRById,
  getHRPosition,
  uploadHRProfile,
  getProfile,
  isHr,
};
