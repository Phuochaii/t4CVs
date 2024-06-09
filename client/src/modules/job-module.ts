import axios from 'axios';

const API_URL = 'http://localhost:3000/job';

const getAllMajor = async () => {
  try {
    const response = await axios.get(`${API_URL}/major/all`);
    return response.data;
  } catch (error) {
    console.error('Error in getAllMajor:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

const getAllCurrency = async () => {
  try {
    const response = await axios.get(`${API_URL}/currency/all`);
    return response.data;
  } catch (error) {
    console.error('Error in getAllCurrency:', error);
    throw error;
  }
};

const getAllField = async () => {
  try {
    const response = await axios.get(`${API_URL}/field/all`);
    return response.data;
  } catch (error) {
    console.error('Error in getAllField:', error);
    throw error;
  }
};

const getAllExp = async (): Promise<any[]> => {
  try {
    const response = await axios.get(`${API_URL}/exp/all`);
    return response.data;
  } catch (error) {
    console.error('Error in getAllExp:', error);
    throw error;
  }
};

const getAllLevel = async () => {
  try {
    const response = await axios.get(`${API_URL}/level/all`);
    return response.data;
  } catch (error) {
    console.error('Error in getAllLevel:', error);
    throw error;
  }
};

const getAllLocation = async (): Promise<any[]> => {
  try {
    const response = await axios.get(`${API_URL}/location/all`);
    return response.data;
  } catch (error) {
    console.error('Error in getAllLocation:', error);
    throw error;
  }
};

const getAllType = async () => {
  try {
    const response = await axios.get(`${API_URL}/type/all`);
    return response.data;
  } catch (error) {
    console.error('Error in getAllType:', error);
    throw error;
  }
};

const searchJob = async ({
  page = 1,
  limit = 0,
  titleRecruitment = '',
  salaryMin = 0,
  salaryMax = 0,
  fieldId = 0,
  locationId = 0,
  expId = 0,
  majorId = 0,
  typeId = 0,
  levelId = 0,
}: {
  page?: number;
  limit?: number;
  titleRecruitment?: string;
  salaryMin?: number;
  salaryMax?: number;
  fieldId?: number;
  locationId?: number;
  expId?: number;
  majorId?: number;
  typeId?: number;
  levelId?: number;
}) => {
  if (
    page === 1 &&
    limit === 0 &&
    titleRecruitment === '' &&
    salaryMin === 0 &&
    salaryMax === 0 &&
    fieldId === 0 &&
    locationId === 0 &&
    expId === 0 &&
    majorId === 0 &&
    typeId === 0 &&
    levelId === 0
  ) {
    try {
      const response = await axios.get(`${API_URL}/valid-jobs`);
      return response.data;
    } catch (error) {
      // Xử lý lỗi ở đây
      console.log(titleRecruitment);
      console.error('Đã có lỗi xảy ra khi tìm kiếm công việc:', error);
      throw error; // Ném lỗi để cho người dùng của hàm biết rằng có lỗi xảy ra
    }
  } else {
    try {
      const queryParams = {
        page: page !== 0 ? `page=${page}` : '',
        limit: limit !== 0 ? `limit=${limit}` : '',
        titleRecruitment:
          titleRecruitment !== '' ? `titleRecruitment=${titleRecruitment}` : '',
        salaryMin: salaryMin !== 0 ? `salaryMin=${salaryMin}` : '',
        salaryMax: salaryMax !== 0 ? `salaryMax=${salaryMax}` : '',
        fieldId: fieldId !== 0 ? `fieldId=${fieldId}` : '',
        locationId: locationId !== 0 ? `locationId=${locationId}` : '',
        expId: expId !== 0 ? `expId=${expId}` : '',
        majorId: majorId !== 0 ? `majorId=${majorId}` : '',
        typeId: typeId !== 0 ? `typeId=${typeId}` : '',
        levelId: levelId !== 0 ? `levelId=${levelId}` : '',
      };

      const queryString = Object.values(queryParams)
        .filter((param) => param !== '')
        .join('&');

      const url = `${API_URL}/valid-jobs?${queryString}`;
      console.log(`${API_URL}/valid-jobs?${queryString}`);
      

      const response = await axios.get(url);

      return response.data;
    } catch (error) {
      // Xử lý lỗi ở đây
      console.log(titleRecruitment);
      console.error('Đã có lỗi xảy ra khi tìm kiếm công việc:', error);
      throw error; // Ném lỗi để cho người dùng của hàm biết rằng có lỗi xảy ra
    }
  }
};

// get all job
const getAllJob = async ({ page = 1 }: { page?: number }) => {
  try {
    const response = await axios.get(`${API_URL}/all?page=${page}`);
    return response.data;
  } catch (error) {
    console.error('Đã có lỗi xảy ra khi tìm kiếm công việc:', error);
    throw error;
  }
};

const JobService = {
  getAllMajor,
  getAllCurrency,
  getAllField,
  getAllExp,
  getAllLevel,
  getAllLocation,
  getAllType,
  searchJob,
  getAllJob,
};

export default JobService;
