import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CvServiceService } from './cv-service.service';
import { CvService } from './entities/cv-service.entity';
import { CreateCvServiceInput } from './dto/create-cv-service.input';
import { UpdateCvServiceInput } from './dto/update-cv-service.input';

@Resolver(() => CvService)
export class CvServiceResolver {
  constructor(private readonly cvServiceService: CvServiceService) {}

  @Mutation(() => CvService)
  createCvService(@Args('createCvServiceInput') createCvServiceInput: CreateCvServiceInput) {
    return this.cvServiceService.create(createCvServiceInput);
  }

  @Query(() => [CvService], { name: 'cvService' })
  findAll() {
    return this.cvServiceService.findAll();
  }

  @Query(() => CvService, { name: 'cvService' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.cvServiceService.findOne(id);
  }

  @Mutation(() => CvService)
  updateCvService(@Args('updateCvServiceInput') updateCvServiceInput: UpdateCvServiceInput) {
    return this.cvServiceService.update(updateCvServiceInput.id, updateCvServiceInput);
  }

  @Mutation(() => CvService)
  removeCvService(@Args('id', { type: () => Int }) id: number) {
    return this.cvServiceService.remove(id);
  }
}
