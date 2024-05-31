import { CampaignFromServer } from "./Campaign.type";
import { CompanyFromServer } from "./Company.type";

export interface Major {
    id: number;
    name: string;
}

export interface Field {
    id: number;
    name: string;
}

export interface Level {
    id: number;
    name: string;
}
export interface Currency {
    id: number;
    name: string;
}
export interface Experience {
    id: number;
    name: string;
}
export interface Type {
    id: number;
    name: string;
}
export interface Location {
    id: number;
    name: string;
}



export interface RecruitmentFromServer {
    id: number;
    titleRecruitment: string;
    majorId: number;
    campaignId: number;
    typeId: number;
    currencyId: number;
    salaryMin: number;
    salaryMax: number;
    expId: number;
    expiredDate: string;
    createAt: string;
    updateAt: string;
    levelId: number;
    status: boolean;
    companyId: number;
    major: Major;
    level: Level;
    currency: Currency;
    fields: Field[];
    exp: Experience;
    type: Type;
    company: CompanyFromServer;
    locations: Location[];
}


export interface RecruitmentJobPost extends Omit<RecruitmentFromServer, 'expiredDate'> {
    createdAt: Date;
    updatedAt: Date;
    expiredDate: Date;
    campaign: CampaignFromServer;
}