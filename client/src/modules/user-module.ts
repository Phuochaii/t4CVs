import axios from 'axios';
import { ApplicationFromServer } from '../shared/types/Application.type';
import { RecruitmentFromServer } from '../shared/types/Recruitment.type';

const serverURL = 'http://localhost:3000';
// GET NOTIFICATION
// không đụng vào phânf bên dưới
const getNotification = async ({
  token,
  page = 1,
  limit = 3,
}: {
  token: string;
  page?: number;
  limit?: number;
}) => {
  const response = await axios.get(
    `${serverURL}/notification/user?limit=${limit}&page=${page}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};

const isUser: (token: string) => Promise<boolean> = async (token: string) => {
  const result = await axios
    .get(`${serverURL}/user/check`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data as boolean);
  return result;
};

const getProfile: (token: string) => Promise<{
  fullname: string;
  phone?: string;
  image?: string;
}> = async (token: string) => {
  const result = await axios
    .get(`${serverURL}/user/profile`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
  return result;
};

const createUser: (input: {
  fullname: string;
  phone?: string;
  image?: string;
  token: string;
}) => Promise<void> = async ({ fullname, phone, image, token }) => {
  console.log('image sent to be: ', image);
  await axios.post(
    `${serverURL}/user/create`,
    {
      fullname,
      phone,
      image,
    },
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );
};
// không đụng vào phần bên trên

const updateStatusNotification = async ({
  userId,
  notificationId,
}: {
  userId: string;
  notificationId: number;
}) => {
  const response = await axios
    .put(`${serverURL}/notification/user/${userId}/${notificationId}`, {
      status: 1,
    })
    .then((res) => {
      // console.log(res);
      return res;
    });

  return response;
};

const getUserById = async ({ userId }: { userId: string }) => {
  const response = await axios
    .get(`http://localhost:3000/user/${userId}`)
    .then((res) => {
      return res;
    });
  return response;
};

const updateUserById = async (formData) => {
  const response = await axios
    .put('http://localhost:3000/user/update', formData)
    .then((res) => {
      return res;
    });
  return response;
};


const getApplications: (
  token: string,
) => Promise<{
  applications: ApplicationFromServer[];
  jobs: RecruitmentFromServer[];
}> = async (token: string) => {
  const response = await axios.get(
    `${serverURL}/application/user/page=1&limit=10`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );
  const applications: ApplicationFromServer[] = response.data.applicationsFinal;
  const jobs = response.data.applicationsFinal.map(
    (application) => application.jobs,
  ) as RecruitmentFromServer[];
  // const campaignIds = applications.map(
  //   (application: ApplicationFromServer) => application.campaignId,
  // );
  // const promiseJobs = campaignIds.map((id) => getJobByCampaignId(id));
  return { applications: applications, jobs: jobs };
};

export async function uploadApplication({ data, token }) {
  try {
    const response = await axios.post(`${serverURL}/application`, data, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch {
    throw new Error('Upload application failed');
  }
}


export async function uploadCV({ postData, token }) {
  try {
    const response = await axios.post(`${serverURL}/cv`, postData, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch {
    throw new Error('Upload cv failed');
  }
}

export async function getCVById(cvId: number) {
  try {
    const response = await axios.get(`${serverURL}/cv/${cvId}`);
    const CV: UserCV = response.data;
    return CV;
  } catch (e) {
    return null;
  }
}

// làm xong thêm mấy cái export dùm tui nha, dưới này chưa đúng đâu
export {
  getNotification,
  updateStatusNotification,
  isUser,
  getProfile,
  createUser,
  getApplications,
  getUserById,
  updateUserById,
};
