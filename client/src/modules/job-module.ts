import axios from "axios";

const API_URL = "http://localhost:3000/job";

const getAllMajor = async () => {
  const response = await axios.get(`${API_URL}/major/all`);
  return response.data;
};

const getAllCurrency = async () => {
  const response = await axios.get(`${API_URL}/currency/all`);
  return response.data;
};

const getAllField = async () => {
  const response = await axios.get(`${API_URL}/field/all`);
  return response.data;
};

const getAllExp = async () => {
  const response = await axios.get(`${API_URL}/exp/all`);
  return response.data;
};

const getAllLevel = async () => {
  const response = await axios.get(`${API_URL}/level/all`);
  return response.data;
};

const getAllLocation = async () => {
  const response = await axios.get(`${API_URL}/location/all`);
  return response.data;
};

const getAllType = async () => {
  const response = await axios.get(`${API_URL}/type/all`);
  return response.data;
};

const searchJob = async (
  page: number=0,
  limit: number=0,
  salaryMin: number=0,
  salaryMax: number=0,
  fieldId: number=0,
  locationId: number=0,
  expId: number=0,
  majorId: number=0,
  typeId: number=0,
  levelId: number=0
) => {
  if (
    page === 0 &&
    limit === 0 &&
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
      console.error("Đã có lỗi xảy ra khi tìm kiếm công việc:", error);
      throw error; // Ném lỗi để cho người dùng của hàm biết rằng có lỗi xảy ra
    }
  }
  else
  {
    try {
      const response = await axios.get(`${API_URL}/valid-jobs?
          ${page !== 0 ? `page=${page}` : ""}
          ${limit !== 0 ? `limit=${limit}`: ""}&
          ${salaryMin !== 0 ? `salaryMin=${salaryMin}`: ""}&
          ${salaryMax !== 0 ? `salaryMax=${salaryMax}`: ""}&
          ${fieldId !== 0 ? `fieldId=${fieldId}`: ""}&
          ${locationId !== 0 ? `locationId=${locationId}`: ""}&
          ${expId !== 0 ? `expId=${expId}`: ""}&
          ${majorId !== 0 ? `majorId=${majorId}`: ""}&
          ${typeId !== 0 ? `typeId=${typeId}`: ""}&
          ${levelId !== 0 ? `levelId=${levelId}`: ""}`);
          
      return response.data;
    } catch (error) {
      // Xử lý lỗi ở đây
      console.error("Đã có lỗi xảy ra khi tìm kiếm công việc:", error);
      throw error; // Ném lỗi để cho người dùng của hàm biết rằng có lỗi xảy ra
    }
  }
  
};

// get all job
const getAllJob = async ({page=1}:{page?: number}) => {
  try{
    console.log(123);
    console.log(page);
    
    
    const response = await axios.get(`${API_URL}/all?page=${page}`);
      return response.data;
  }catch(error){
    console.error("Đã có lỗi xảy ra khi tìm kiếm công việc:", error);
    throw error;
  }
}


const JobService = {
  getAllMajor,
  getAllCurrency,
  getAllField,
  getAllExp,
  getAllLevel,
  getAllLocation,
  getAllType,
  searchJob,
  getAllJob
};

export default JobService;
