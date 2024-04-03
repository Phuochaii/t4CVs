import { Module } from '@nestjs/common';
import { CvServiceService } from './cv-service.service';
import { CvServiceResolver } from './cv-service.resolver';
import {
  ApolloDriver,
  ApolloDriverConfig,
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
    }),
  ],
  providers: [CvServiceService, CvServiceResolver],
})
export class CvServiceModule {}
