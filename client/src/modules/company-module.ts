import axios from 'axios';
const serverURL = 'http://localhost:3000';

// GET ONE COMPAIGN BY ID
const getCampaignById = async ({id}:{id: number}) => {
  const response = await axios.get(`${serverURL}/company/${id}`);
  return response.data;
};


export { getCampaignById} ;
