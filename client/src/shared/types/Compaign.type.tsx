import { CV } from "./CV.type";

export interface Compaign {
  compaignName: string;
  compaignId: number;
  cvs: CV[];
  optimization: number;
  recruitment: string;
  recruimentId: number;
  recruitmentStatus: string;
  isCompaignActive: boolean;
  cvSystem: string;
  isCVSystemActive: boolean;
  cvFiltered: number | null;
  runningServices: string[];
}
