import { Module } from '@nestjs/common';
// import { CvServiceService } from './cv-service.service';
// import { CvServiceResolver } from './cv-service.resolver';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
    }),
  ],
})
export class CvServiceModule {}
