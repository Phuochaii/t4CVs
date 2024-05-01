import axios from 'axios';

// GET APPLICATION BY HR ID
const getApplicationByCampaignIdHRId = async ({campaignId, hrId, status, page=1 }: {campaignId : string,
hrId: string,
status?: boolean, page?: number}) => {
  console.log(hrId, !!hrId);
  
  console.log(`http://localhost:3000/application/hr/${hrId}?page=${page}&limit=5&campaignId=${campaignId}${status!=undefined ? `&status=${status}`: ""}`);
  
  
  const response = await axios.get(`http://localhost:3000/application/${hrId?`hr/${hrId}`:''}?page=${page}&limit=5&campaignId=${campaignId}${status!=undefined ? `&status=${status}`: ""}`);
  return response.data;
};

// GET ONE COMPAIGN BY ID
const getCampaignById = async ({id}:{id: string}) => {
  const response = await axios.get(`http://localhost:3000/company/campaign/${id}`);
  return response.data;
};

// GET ALL CAMPAIGN BY HR ID
const getAllCompaignByHrId = async ({hrId}:{hrId: string}) => {
  const response = await axios.get(`http://localhost:3000/company/campaign/employer/${hrId}`);
  return response.data;
}

// UPDATE APPLICATION STATUS
const updateApplicationStatus = async ({applicationId}:{applicationId: number}) => {
  const response = await axios.patch(`http://localhost:3000/application/${applicationId}`);
  // console.log(response.data);
  
  return response.data;
}

//GET CV BY APPLICATION ID
const getCVByApplicationID = async ({applicationId}:{applicationId: number}) => {
  const response = await axios.get(`http://localhost:3000/application/${applicationId}/cv`);
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
  const response = await axios.get(`http://localhost:3000/notification/hr/${userId}?limit=${limit}&page=${page}`);
  return response.data;
};

// UPDATE STATUS NOTIFICATION
const updateStatusNotification = async ({userId, notificationId}:{userId:string,  notificationId: number}) => {
  const response = await axios.put(`http://localhost:3000/notification/hr/${userId}/${notificationId}`, {
    status: 1
  }).then((res) => {

    // console.log(`http://localhost:3000/notification/hr/${userId}/${notificationId}`);
    console.log(res);
    return res
  });
  return response;
}

// CREATE COMPAIGN
const createCompaign = async ({employerId, name}:{employerId:string,  name: string}) => {
  const response = await axios.post(`http://localhost:3000/company/campaign/create`, {
    name,
    employerId
  }).then((res) => {

    console.log(res);
    return res
  });
  return response.data;
}




export { getApplicationByCampaignIdHRId, getCampaignById, getAllCompaignByHrId, updateApplicationStatus ,getCVByApplicationID, getNotification,updateStatusNotification,createCompaign} ;
