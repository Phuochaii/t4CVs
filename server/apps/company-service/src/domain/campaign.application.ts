import { CreateCampaignDTO, UpdateCampaignDTO } from './dto';
import { Campaign } from './entity';
import {
  CreateCampaignService,
  FindCampaignByIdService,
  FindCampaignByNameService,
  GetAllCampaignByEmployerIdPaginationService,
  GetAllCampaignByEmployerIdService,
  GetAllCampaignPaginationService,
  GetTotalCampaignByEmployerIdService,
  GetTotalCampaignByNameService,
  GetTotalCampaignsService,
  UpdateCampaignService,
} from './service';
import { DeleteCampaignService } from './service/campaign/deleteCampaign.service';

export class CampaignApplication {
  constructor(
    private readonly createCampaignService: CreateCampaignService,
    private readonly getAllCampaignPaginationService: GetAllCampaignPaginationService,
    private readonly getTotalCampaignsService: GetTotalCampaignsService,
    private readonly findCampaignByIdService: FindCampaignByIdService,
    private readonly updateCampaignService: UpdateCampaignService,
    private readonly getAllCampaignByEmployerIdService: GetAllCampaignByEmployerIdService,
    private readonly getAllCampaignByEmplyerIdPaginationService: GetAllCampaignByEmployerIdPaginationService,
    private readonly getTotalCampaignByEmployerIdService: GetTotalCampaignByEmployerIdService,
    private readonly deleteCampaignService: DeleteCampaignService,
    private readonly findCampaignByNameService: FindCampaignByNameService,
    private readonly getTotalCampaignByNameService: GetTotalCampaignByNameService,
  ) {}

  async createCampaign(request: CreateCampaignDTO): Promise<Campaign> {
    return await this.createCampaignService.execute(request);
  }

  async getAllCampaignPagination(
    page: number,
    limit: number,
  ): Promise<Campaign[]> {
    return await this.getAllCampaignPaginationService.execute(page, limit);
  }

  async getTotalCampaigns(): Promise<number> {
    return await this.getTotalCampaignsService.execute();
  }

  async findCampaignById(id: number): Promise<Campaign> {
    return await this.findCampaignByIdService.execute(id);
  }

  async updateCampaign(campaign: UpdateCampaignDTO): Promise<Campaign> {
    return await this.updateCampaignService.execute(campaign);
  }

  async getAllCampaignByEmployerId(employerId: string): Promise<Campaign[]> {
    return await this.getAllCampaignByEmployerIdService.execute(employerId);
  }

  async getAllCampaignByEmployerIdPagination(
    employerId: string,
    page: number,
    limit: number,
  ): Promise<Campaign[]> {
    return await this.getAllCampaignByEmplyerIdPaginationService.execute(
      employerId,
      page,
      limit,
    );
  }

  async getTotalCampaignByEmployerId(employerId: string): Promise<number> {
    return await this.getTotalCampaignByEmployerIdService.execute(employerId);
  }

  async deleteCampaign(id: number): Promise<string> {
    return await this.deleteCampaignService.execute(id);
  }

  async findCampaignByName(
    name: string,
    page: number,
    limit: number,
  ): Promise<Campaign[]> {
    return await this.findCampaignByNameService.execute(name, page, limit);
  }

  async getTotalCampaignByName(name: string): Promise<number> {
    return await this.getTotalCampaignByNameService.execute(name);
  }
}
