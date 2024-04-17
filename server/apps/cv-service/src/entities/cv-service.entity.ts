import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class CvService {
  @Field(() => Int, { description: 'Unique identifier for the CV' })
  id: number;

  @Field(() => Int, {
    description: 'Unique identifier for the user',
    nullable: false,
  })
  userId: number;

  @Field(() => String, {
    description: 'CV data in file format',
    nullable: false,
  })
  cvData: string;

  @Field(() => Date, {
    description: 'Date when the CV was created',
    nullable: false,
  })
  createDate: Date;

  @Field(() => Date, {
    description: 'Date when the CV was last modified',
    nullable: true,
  })
  lastModifiedDate: Date;
}
