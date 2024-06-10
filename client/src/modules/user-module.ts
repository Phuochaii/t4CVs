import axios from 'axios';
// GET NOTIFICATION

const getNotification = async ({
  userId,
  page = 1,
  limit = 3,
}: {
  userId: string;
  page?: number;
  limit?: number;
}) => {
  const response = await axios.get(
    `http://localhost:3000/notification/user/${userId}?limit=${limit}&page=${page}`,
  );
  return response.data;
};

const updateStatusNotification = async ({
  userId,
  notificationId,
}: {
  userId: string;
  notificationId: number;
}) => {
  const response = await axios
    .put(
      `http://localhost:3000/notification/user/${userId}/${notificationId}`,
      {
        status: 1,
      },
    )
    .then((res) => {
      // console.log(res);
      return res;
    });

  return response;
};

const isUser: (token: string) => Promise<boolean> = async (token: string) => {
  const result = await axios.get(`http://localhost:3000/user/check`, {
    headers: {
      authorization: `Bearer ${token}`,
    }
  })
    .then(res => res.data as boolean)
  return result;
}

const getProfile: (token: string) => Promise<{
  fullname: string;
  phone?: string;
  image?: string;
}> = async (token: string) => {
  const result = await axios.get(`http://localhost:3000/user/profile`, {
    headers: {
      authorization: `Bearer ${token}`,
    }
  })
    .then(res => res.data)
  return result;
}

const createUser: (input: {
  fullname: string;
  phone?: string;
  image?: string;
  token: string;
}) => Promise<void> = async ({
  fullname,
  phone,
  image,
  token
}) => {
  console.log("image sent to be: ",image)
  await axios.post(`http://localhost:3000/user/create`, {
    fullname,
    phone,
    image,
  }, {
    headers: {
      authorization: `Bearer ${token}`,
    }
  });
}

export { getNotification, updateStatusNotification, isUser, getProfile, createUser };
