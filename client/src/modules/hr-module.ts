import axios from 'axios';

const serverURL = 'http://localhost:3000';

// GET APPLICATION BY HR ID
const getApplicationByCampaignIdHRId = async ({ campaignId, hrId, status, page = 1 }: {
  campaignId: string,
  hrId: string,
  status?: boolean, page?: number
}) => {
  console.log(hrId, !!hrId);

  console.log(`${serverURL}/application/hr/${hrId}?page=${page}&limit=5&campaignId=${campaignId}${status != undefined ? `&status=${status}` : ""}`);


  const response = await axios.get(`${serverURL}/application/${hrId ? `hr/${hrId}` : ''}?page=${page}&limit=5&campaignId=${campaignId}${status != undefined ? `&status=${status}` : ""}`);
  return response.data;
};

// GET ONE COMPAIGN BY ID
const getCampaignById = async ({ id }: { id: string }) => {
  const response = await axios.get(`${serverURL}/company/campaign/${id}`);
  return response.data;
};

// GET ALL CAMPAIGN BY HR ID
const getAllCompaignByHrId = async ({ hrId }: { hrId: string }) => {
  const response = await axios.get(`${serverURL}/company/campaign/employer/${hrId}`);
  return response.data;
}

// UPDATE APPLICATION STATUS
const updateApplicationStatus = async ({ applicationId }: { applicationId: number }) => {
  const response = await axios.patch(`${serverURL}/application/${applicationId}`);
  // console.log(response.data);

  return response.data;
}

//GET CV BY APPLICATION ID
const getCVByApplicationID = async ({ applicationId }: { applicationId: number }) => {
  const response = await axios.get(`${serverURL}/application/${applicationId}/cv`);
  // console.log(response.data);
  return response.data;
}

const getNotification = async ({
  userId,
  page = 1,
  limit = 3
}: {
  userId: string;
  page?: number;
  limit?: number;
}) => {
  const response = await axios.get(`${serverURL}/notification/hr/${userId}?limit=${limit}&page=${page}`);
  return response.data;
};

// UPDATE STATUS NOTIFICATION
const updateStatusNotification = async ({ userId, notificationId }: { userId: string, notificationId: number }) => {
  const response = await axios.put(`${serverURL}/notification/hr/${userId}/${notificationId}`, {
    status: 1
  }).then((res) => {

    // console.log(`${serverURL}/notification/hr/${userId}/${notificationId}`);
    console.log(res);
    return res
  });
  return response;
}

// CREATE COMPAIGN
const createCompaign = async ({ employerId, name }: { employerId: string, name: string }) => {
  const response = await axios.post(`${serverURL}/company/campaign/create`, {
    name,
    employerId
  }).then((res) => {

    console.log(res);
    return res
  });
  return response.data;
}

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

// GET ALL POSITION 
const getPosition = async () => {
  const response = await axios.get(`${serverURL}/employer/position/all`);
  return response.data;
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
    }
  });
  if(!response.data) throw new Error('Getting hr profile but not having hr profile data');
  return response.data;
}

export { getApplicationByCampaignIdHRId, getCampaignById, getAllCompaignByHrId, updateApplicationStatus, getCVByApplicationID, getNotification, updateStatusNotification, createCompaign, getPosition, isHr, getProfile };
