import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCvServiceInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
