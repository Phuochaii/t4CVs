import { InjectRepository } from '@nestjs/typeorm';
import { CompanyRepository } from '../../domain/repository';
import { In, Repository } from 'typeorm';
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
      order: {
        id: 'ASC',
      },
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
      status: company.status,
    });

    return this.findCompanyById(company.id);
  }

  async removeCompany(id: number): Promise<string> {
    await this.companyRepository.delete(id);

    return 'Delete Company Success';
  }

  async findCompanyByArrayId(id: number[]): Promise<Company[]> {
    const result = await this.companyRepository.find({
      where: {
        id: In(id),
      },
    });

    const orderedData = id.map((key) => result.find((item) => item.id === key));

    return orderedData;
  }
}
