import axios from 'axios';

// GET ONE COMPAIGN BY ID
const getCampaignById = async ({id}:{id: number}) => {
  const response = await axios.get(`http://localhost:3000/company/${id}`);
  return response.data;
};


export { getCampaignById} ;
