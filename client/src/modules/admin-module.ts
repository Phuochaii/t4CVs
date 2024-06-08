import axios from "axios";
// không đụng vào phần này
export const isAdmin = async (token: string) => {
    const result = await axios.get(`http://localhost:3000/admin/check`, {
        headers: {
            authorization: `Bearer ${token}`,
        }
    })
        .then(res => res.data as boolean)
    return result;
}

export const getProfile = async (token: string) => {
    const result = await axios.get(`http://localhost:3000/admin/profile`, {
        headers: {
            authorization: `Bearer ${token}`,
        }
    })
        .then(res => res.data as { name: string, picture?: string })
    return result;
}
// không đụng tới phần trên

export async function getAllCampaigns(page: number = 1) {
  const response = await axios.get(
    `${serverURL}/company/campaign/all?page=${page}`,
  );
  const rawCampaigns: CampaignFromServer[] = response.data.data;
  const totalPages = response.data.total_page;
  return { allCampaigns: rawCampaigns, totalPages: totalPages };
}

export async function getAllEmployer(page: number = 1) {
  const response = await axios.get(`${serverURL}/employer/all?page=${page}`);
  const rawEmployers: EmployerFromServer[] = response.data.data;
  return {
    allEmployers: rawEmployers,
    total: response.data.total,
    totalPages: response.data.total_page,
  };
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

export async function getUserById(userId: number) {
  try {
    const response = await axios.get(`${serverURL}/user/${userId}`);
    const user: UserFromServer = response.data;
    return user;
  } catch (e) {
    return null;
  }
}

export async function updateCompanyStatus(id: number, status: boolean) {
  const response = await axios.put(`${serverURL}/company/updateStatus`, {
    id: id,
    status: status,
  });
  return response;
}
export async function updateLicenseStatus(id: number, status: boolean) {
  const response = await axios.put(
    `${serverURL}/employer/update/licenseStatus/${id}`,
    {
      licenseStatus: status,
    },
  );
  return response;
}
export async function updatePhoneStatus(id: number, status: boolean) {
  const response = await axios.put(
    `${serverURL}/employer/update/phoneNumberStatus/${id}`,
    {
      phoneNumberStatus: status,
    },
  );
  return response;
}

export async function updateJobStatus(id: number, status: boolean) {
  const response = await axios.put(`${serverURL}/job/update-status`, {
    id: id,
    status: status,
  });
  return response;
}


export async function getEmployerById(id: number | string) {
  const response = await axios.get(`${serverURL}/employer/${id}`);
  const rawEmployer: EmployerFromServer = response.data;
  return rawEmployer;
}

// cập nhật các function vào đây
export{

}