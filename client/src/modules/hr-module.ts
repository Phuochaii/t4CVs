import axios from 'axios';
import { CampaignFromServer } from '../shared/types/Campaign.type';
import { EmployerFromServer } from '../shared/types/Employer.type';
import { ApplicationFromServer } from '../shared/types/Application.type';
import { UserFromServer } from '../shared/types/User.type';
import { UserCV } from '../shared/types/CV_user.type';

const serverURL = 'http://localhost:3000';

// ------------------- khong dụng vào phần này
interface CreateEmployerInterface {
  id: string;
  fullname?: string,
  gender: string,
  positionId: number,
  skype: string,
  phoneNumber: string,
  image: string,
  token: string
}
export const createEmpolyer = async ({
  id, fullname, gender, positionId, skype, phoneNumber, image, token
}: CreateEmployerInterface) => {
  const response = await axios.post(`${serverURL}/employer/create`, {
    id, fullname, gender, positionId, skype, phoneNumber, image
  }, {
    headers: {
      authorization: `Bearer ${token}`
    }
  })
    .then((res) => res.data);
  return response;
}
const isHr: (token: string) => Promise<boolean> = async (token) => {
  const result = await axios.get(`http://localhost:3000/employer/check`, {
    headers: {
      authorization: `Bearer ${token}`,
    }
  })
    .then(res => {
      return res.data as boolean
    })
  return result;
}
const getProfile:(token:string) => Promise<{
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
      authorization: `Bearer ${token}`
    },
  });
  if(!response.data) throw new Error('Getting hr profile but not having hr profile data');
  return response.data;
}
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
    `${serverURL}/application/hr/?page=${page}&limit=${limit}&campaignId=${campaignId}${status != undefined ? `&status=${status}` : ''}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );
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
  return response.data;
};

// UPDATE APPLICATION STATUS
const updateApplicationStatus = async ({
  applicationId,
  token,
}: {
  applicationId: number;
  token: string;
}) => {
  const response = await axios.patch(
    `${serverURL}/application/${applicationId}`,
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
    .put(`${serverURL}/notification/hr/${notificationId}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
      status: 1,
    })
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
    .post(`${serverURL}/company/campaign/create`,
      {name,},
      {
        headers: {
          authorization: `Bearer ${token}`,
        }
      })
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

const updateEmployerLicense = async ({
  formData,
  token,
}: {
  formData: FormData;
  token: string;
}) => {
  const response = await axios
    .put(`${serverURL}/employer/update/license`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
      formData,
    })
    .then((res) => {
      console.log(res);
      return res;
    });
  return response.data;
};

const getHRById = async ({ userId }: { userId: string }) => {
  const response = await axios
    .get(`${serverURL}/employer/${userId}`)
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
    .put(`${serverURL}/employer/update`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
      formData,
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
  hrId: number,
  campaignId: number,
) {
  const response = await axios.get(
    `${serverURL}/application/hr/${hrId}?page=1&limit=100&campaignId=${campaignId}`,
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

export async function getEmployerById(id: number | string) {
  const response = await axios.get(`${serverURL}/employer/${id}`);
  const rawEmployer: EmployerFromServer = response.data;
  return rawEmployer;
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
