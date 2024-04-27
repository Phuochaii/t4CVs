import { Module } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Campaign } from '../entities/campaign.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Campaign])],
  controllers: [],
  providers: [CampaignService],
  exports: [CampaignService],
})
export class CampaignModule {}
