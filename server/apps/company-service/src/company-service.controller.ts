import { Controller } from '@nestjs/common';
import { CompanyServiceService } from './company-service.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateCompanyDto } from './dto/Req/create-company.dto';
import { UpdateCompanyDto } from './dto/Req/update-company.dto';
// import { FindCompanyDTOResponse } from './dto/Res/find-company.dto';
// import { DeleteCompanyDto } from './dto/Req/delete-company.dto';
// import { UpdateCompanyDto } from './dto/Req/update-company.dto';

@Controller()
export class CompanyServiceController {
  constructor(private readonly companyServiceService: CompanyServiceService) {}

  @MessagePattern({ cmd: 'create_company' })
  createCompany(company: CreateCompanyDto) {
    this.companyServiceService.create(company);
    return 'Company created successfully!';
  }

  @MessagePattern({ cmd: 'get_all_companies' })
  findAllCompanies() {
    return this.companyServiceService.findAll();
  }

  @MessagePattern({ cmd: 'find_company_by_id' })
  findCompanyById(id: number) {
    return this.companyServiceService.findCompanyById(id);
  }

  @MessagePattern({ cmd: 'update_company' })
  updateCompany(data: UpdateCompanyDto) {
    this.companyServiceService.updateCompany(data);
    return 'Company update successfully!';
  }

  @MessagePattern({ cmd: 'remove_company' })
  removeCompany(id: number) {
    return this.companyServiceService.remove(id);
  }

  // @Get()
  // getHello(): string {
  //   return this.companyServiceService.getHello();
  // }
}
