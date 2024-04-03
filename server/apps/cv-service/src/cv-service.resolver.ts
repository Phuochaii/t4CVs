import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CvServiceService } from './cv-service.service';
import { CvService } from './entities/cv-service.entity';

@Resolver(() => CvService)
export class CvServiceResolver {
  constructor(private readonly cvServiceService: CvServiceService) {}

  @Mutation(() => CvService)
  @Query(() => CvService)
  async getCV(@Args('id') id: number): Promise<CvService> {
    return this.cvServiceService.getCVById(id);
  }

  @Mutation(() => CvService)
  async createCV(
    @Args('userId') userId: number,
    @Args('cvData') cvData: string,
  ): Promise<CvService> {
    return this.cvServiceService.createCV(userId, cvData);
  }
  // createCvService(
  //   @Args('createCvServiceInput') createCvServiceInput: CreateCvServiceInput,
  // ) {
  //   return this.cvServiceService.create(createCvServiceInput);
  // }

  @Query(() => [CvService], { name: 'cvService' })
  findAll() {
    return this.cvServiceService.findAll();
  }

  @Query(() => CvService, { name: 'cvService' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.cvServiceService.findOne(id);
  }

  // @Mutation(() => CvService)
  // updateCvService(@Args('updateCvServiceInput') updateCvServiceInput: UpdateCvServiceInput) {
  //   return this.cvServiceService.update(updateCvServiceInput.id, updateCvServiceInput);
  // }

  // @Mutation(() => CvService)
  // removeCvService(@Args('id', { type: () => Int }) id: number) {
  //   return this.cvServiceService.remove(id);
  // }
}
