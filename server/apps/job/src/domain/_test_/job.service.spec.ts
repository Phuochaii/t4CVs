import { Test, TestingModule } from '@nestjs/testing';
import { JobService } from './job.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Job } from './entities/job.entity';
import { JobDetailService } from './job-detail/job-detail.service';
import { MajorService } from './major/major.service';
import { LevelService } from './level/level.service';
import { CurrencyService } from './currency/currency.service';
import { FieldService } from './field/field.service';
import { LocationService } from './location/location.service';
import { ExperienceService } from './experience/experience.service';
import { TypeService } from './type/type.service';
import { CreateJobDto } from './dto/Req/create-job.dto';

describe('JobService', () => {
  let service: JobService;

  const mockJobRepository = {
    findOne: jest.fn((query) => {
      return Promise.resolve({
        id: Math.floor(Math.random() * 100),
        titleRecruitment: 'demo name',
        campaignId: query.where.campaignId,
      });
    }),
    save: jest.fn((createJobDto) => {
      return Promise.resolve({
        id: Math.floor(Math.random() * 100),
        titleRecruitment: createJobDto.titleRecruitment,
        majorId: createJobDto.majorId,
        campaignId: createJobDto.campaignId,
        typeId: createJobDto.typeId,
        currencyId: createJobDto.currencyId,
        salaryMin: createJobDto.salaryMin,
        salaryMax: createJobDto.salaryMax,
        expId: createJobDto.expId,
        expiredDate: new Date(createJobDto.expiredDate),
        createAt: new Date(),
        updateAt: new Date(),
        levelId: createJobDto.levelId,
        status: false,
        companyId: createJobDto.companyId,
        jobDetail: createJobDto.jobDetail,
        major: createJobDto.major,
        level: createJobDto.level,
        currency: createJobDto.currency,
        exp: createJobDto.exp,
        type: createJobDto.type,
        fields: createJobDto.fields,
        locations: createJobDto.locations,
      });
    }),
  };
  const mockJobDetailService = {
    createJobDetail: jest.fn((createJobDto) => {
      return Promise.resolve({
        id: Math.floor(Math.random() * 100),
        quantity: createJobDto.quantity,
        jobSchedule: createJobDto.jobSchedule,
        gender: createJobDto.gender,
        description: createJobDto.description,
        benefit: createJobDto.benefit,
        requirement: createJobDto.requirement,
        skills: createJobDto.skills,
      });
    }),
  };
  const mockMajorService = {
    findById: jest.fn((majorId) => {
      return Promise.resolve({
        id: majorId,
        name: 'demo major name',
      });
    }),
  };
  const mockLevelService = {
    findById: jest.fn((levelId) => {
      return Promise.resolve({
        id: levelId,
        name: 'demo level name',
      });
    }),
  };
  const mockCurrencyService = {
    findById: jest.fn((currencyId) => {
      return Promise.resolve({
        id: currencyId,
        name: 'demo currency name',
      });
    }),
  };
  const mockFieldService = {
    findById: jest.fn((fieldId) => {
      return Promise.resolve({
        id: fieldId,
        name: 'demo field name',
      });
    }),
  };
  const mockLocationService = {
    findById: jest.fn((locationId) => {
      return Promise.resolve({
        id: locationId,
        name: 'demo location name',
      });
    }),
  };
  const mockExperienceService = {
    findById: jest.fn((expId) => {
      return Promise.resolve({
        id: expId,
        name: 'demo exp name',
      });
    }),
  };
  const mockTypeService = {
    findById: jest.fn((typeId) => {
      return Promise.resolve({
        id: typeId,
        name: 'demo type name',
      });
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JobService,
        {
          provide: getRepositoryToken(Job),
          useValue: mockJobRepository,
        },
        JobDetailService,
        MajorService,
        LevelService,
        CurrencyService,
        FieldService,
        LocationService,
        ExperienceService,
        TypeService,
      ],
    })
      .overrideProvider(JobDetailService)
      .useValue(mockJobDetailService)
      .overrideProvider(MajorService)
      .useValue(mockMajorService)
      .overrideProvider(LevelService)
      .useValue(mockLevelService)
      .overrideProvider(CurrencyService)
      .useValue(mockCurrencyService)
      .overrideProvider(FieldService)
      .useValue(mockFieldService)
      .overrideProvider(LocationService)
      .useValue(mockLocationService)
      .overrideProvider(ExperienceService)
      .useValue(mockExperienceService)
      .overrideProvider(TypeService)
      .useValue(mockTypeService)
      .compile();

    service = module.get<JobService>(JobService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find job by campaign id', async () => {
    const campaignId = 1;
    const result = {
      id: expect.any(Number),
      titleRecruitment: expect.any(String),
      campaignId: campaignId,
    };
    const job = await service.findJobByCampaignId(campaignId);
    expect(job).toStrictEqual(result);
  });

  it('should create job', async () => {
    const createJobDto: CreateJobDto = {
      titleRecruitment: 'demo name',
      campaignId: 1,
      majorId: 1,
      levelId: 1,
      currencyId: 1,
      expId: 1,
      typeId: 1,
      fieldsId: [1],
      companyId: 1,
      salaryMin: 100,
      salaryMax: 200,
      locationsId: [1],
      expiredDate: '2024-08-12',
      quantity: 1,
      jobSchedule: 'T2-T6',
      gender: 'Male',
      description: 'demo description',
      benefit: 'demo benefit',
      requirement: 'demo requirement',
      skills: 'demo skills',
    };
    const result = {
      id: expect.any(Number),
      titleRecruitment: createJobDto.titleRecruitment,
      campaignId: createJobDto.campaignId,
      companyId: createJobDto.companyId,
      createAt: expect.any(Date),
      updateAt: expect.any(Date),
      majorId: createJobDto.majorId,
      levelId: createJobDto.levelId,
      currencyId: createJobDto.currencyId,
      salaryMin: createJobDto.salaryMin,
      salaryMax: createJobDto.salaryMax,
      expId: createJobDto.expId,
      typeId: createJobDto.typeId,
      expiredDate: new Date(createJobDto.expiredDate),
      status: false,
      jobDetail: {
        id: expect.any(Number),
        quantity: createJobDto.quantity,
        jobSchedule: createJobDto.jobSchedule,
        gender: createJobDto.gender,
        description: createJobDto.description,
        benefit: createJobDto.benefit,
        requirement: createJobDto.requirement,
        skills: createJobDto.skills,
      },
      major: {
        id: createJobDto.majorId,
        name: 'demo major name',
      },
      level: {
        id: createJobDto.levelId,
        name: 'demo level name',
      },
      currency: {
        id: createJobDto.currencyId,
        name: 'demo currency name',
      },
      exp: {
        id: createJobDto.expId,
        name: 'demo exp name',
      },
      type: {
        id: createJobDto.typeId,
        name: 'demo type name',
      },
      fields: [
        {
          id: 1,
          name: 'demo field name',
        },
      ],
      locations: [
        {
          id: 1,
          name: 'demo location name',
        },
      ],
    };
    const job = await service.create(createJobDto);
    expect(job).toStrictEqual(result);
  });
});
