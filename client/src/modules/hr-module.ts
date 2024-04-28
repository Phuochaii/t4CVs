import axios from 'axios';

// GET APPLICATION BY HR ID
const getApplicationByCampaignIdHRId = async ({campaignId, hrId, status, page=1 }: {campaignId : string,
hrId: string,
status?: boolean, page?: number}) => {
  
  const response = await axios.get(`http://localhost:3000/application/hr/${hrId}?page=${page}&limit=5&campaignId=${campaignId}${status!=undefined ? `&status=${status}`: ""}`);
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
  console.log(response.data);
  
  return response.data;
}

//GET CV BY APPLICATION ID
const getCVByApplicationID = async ({applicationId}:{applicationId: number}) => {
  const response = await axios.get(`http://localhost:3000/application/${applicationId}/cv`);
  console.log(response.data);
  
  return response.data;
}


export { getApplicationByCampaignIdHRId, getCampaignById, getAllCompaignByHrId, updateApplicationStatus ,getCVByApplicationID} ;
