interface Compaign {
  compaignName: string;
  compaignId: number;
  cvs: number;
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
