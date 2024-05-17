import { InjectRepository } from '@nestjs/typeorm';
import { CompanyRepository } from '../../domain/repository';
import { Repository } from 'typeorm';
import { CompanySchema } from '../schema';
import { Company } from '../../domain/entity';
import { CreateCompanyDTO, UpdateCompanyDTO } from '../../domain/dto';

export class TypeOrmCompanyRepository extends CompanyRepository {
  constructor(
    @InjectRepository(CompanySchema)
    private readonly companyRepository: Repository<CompanySchema>,
  ) {
    super();
  }

  async createCompany(company: CreateCompanyDTO): Promise<Company> {
    return await this.companyRepository.save(company);
  }

  async getAllCompanyPagination(
    page: number,
    limit: number,
  ): Promise<Company[]> {
    const skip = (page - 1) * limit;

    const companies = await this.companyRepository.find({
      skip: skip,
      take: limit,
    });

    return companies;
  }

  async getTotalCompanies(): Promise<number> {
    const total = await this.companyRepository.count();

    return total;
  }

  async findCompanyById(id: number): Promise<Company> {
    const result = await this.companyRepository.findOne({
      where: {
        id,
      },
    });
    return result;
  }

  async updateCompany(company: UpdateCompanyDTO): Promise<Company> {
    await this.companyRepository.update(company.id, {
      website: company.website,
      image: company.image,
      address: company.address,
      phone: company.phone,
      companySize: company.companySize,
      description: company.description,
      status: company.status,
    });

    return await this.findCompanyById(company.id);
  }

  async removeCompany(id: number): Promise<string> {
    await this.companyRepository.delete(id);

    return 'Delete Company Success';
  }
}
