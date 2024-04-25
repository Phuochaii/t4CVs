import { Injectable } from '@nestjs/common';
import { Company } from './entities/company.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCompanyDto } from './dto/Req/create-company.dto';
import { FindCompanyDTOResponse } from './dto/Res/find-company.dto';
import { UpdateCompanyDto } from './dto/Req/update-company.dto';
import { Repository } from 'typeorm';

@Injectable()
export class CompanyServiceService {
  constructor(
    @InjectRepository(Company)
    private CompanyRepository: Repository<Company>,
  ) {}

  async createCompany(createCompanyDto: CreateCompanyDto) {
    const company = await this.CompanyRepository.save(createCompanyDto);

    return await this.CompanyRepository.save(company);
  }

  // eslint-disable-next-line prettier/prettier
  async findAllCompanies(page: number, limit: number): Promise<FindCompanyDTOResponse[]> {
    const skip = (page - 1) * limit;
    const companies = await this.CompanyRepository.find({
      skip: skip,
      take: limit,
    });

    return companies;
  }

  async findCompanyById(id: number) {
    const result = await this.CompanyRepository.findOne({
      where: {
        id,
      },
    });
    return result;
  }

  async updateCompany(data: UpdateCompanyDto) {
    return await this.CompanyRepository.update(data.id, {
      website: data.website,
      image: data.image,
      address: data.address,
      phone: data.phone,
      companySize: data.companySize,
      description: data.description,
      status: data.status,
    });
  }

  async removeCompany(id: number) {
    await this.CompanyRepository.delete(id);
  }
}
