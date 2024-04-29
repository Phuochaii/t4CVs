import axios from 'axios';
// GET NOTIFICATION

const getNotification = async ({
  userId,
  page = 1,
  limit = 3
}: {
  userId: string;
  page?: number;
  limit?: number;
}) => {
  const response = await axios.get(`http://localhost:3000/notification/user/${userId}?limit=${limit}&page=${page}`);
  return response.data;
};


export { getNotification };