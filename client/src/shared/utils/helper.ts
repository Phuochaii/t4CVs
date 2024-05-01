import axios from "axios"
import { CampaignFromServer } from "../types/Campaign.type"
import { CompanyFromServer } from "../types/Company.type"
import { EmployerFromServer } from "../types/Employer.type"
import { RecruitmentFromServer } from "../types/Recruitment.type"

const serverURL = 'http://localhost:3000'

export async function getAllCampaigns() {
    const response = await axios.get(`${serverURL}/company/campaign/all`)
    const rawCampaigns: CampaignFromServer[] = response.data.data;
    return rawCampaigns;
}

export async function getAllCompanies() {
    const response = await axios.get(`${serverURL}/company/all`)
    const rawCompanies: CompanyFromServer[] = response.data.data;
    return rawCompanies;
}

export async function getCompanyById(id:number) {
    const response = await axios.get(`${serverURL}/company/${id}`);
    const rawCompany: CompanyFromServer = response.data;
    return rawCompany;
}

export async function getAllEmployer() {
    const response = await axios.get(`${serverURL}/employer/all`);
    const rawEmployers: EmployerFromServer[] = response.data.data;
    return rawEmployers;
}

export async function getEmployerById(id: number) {
    const response = await axios.get(`${serverURL}/employer/${id}`);
    const rawEmployer: EmployerFromServer = response.data;
    return rawEmployer;
}

export async function getAllJobs(page:number = 1, limit:number = 5) {
    const response = await axios.get(`${serverURL}/job/all?page=${page}&limit=${limit}`)
    const rawJobs: RecruitmentFromServer[] = response.data.data;
    const totalPages = response.data.total_pages;
    return [rawJobs, totalPages];
}

export async function getJobByCampaignId(campaignId: number) {
    const response = await axios.get(`${serverURL}/job?campaignId=${campaignId}`);
    const rawJob: RecruitmentFromServer = response.data;
    return rawJob;
}