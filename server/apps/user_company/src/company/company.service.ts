import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from '../entity/company.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}

  async findAll(): Promise<Company[]> {
    return await this.companyRepository.find();
  }

  async findOne(id: number): Promise<Company> {
    return await this.companyRepository.findOne({ where: { id_company: id } });
  }

  async create(company: Company): Promise<Company> {
    return await this.companyRepository.save(company);
  }

  async update(id: number, company: Company): Promise<Company> {
    await this.companyRepository.update(id, company);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.companyRepository.delete(id);
  }
}
