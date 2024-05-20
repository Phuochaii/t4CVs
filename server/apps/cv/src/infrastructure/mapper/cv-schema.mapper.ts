import { CvDto } from '../../domain/dto';
import { CvSchema } from '../schema';
import { Mapper } from './base.mapper';

export class CvSchemaMapper implements Mapper<CvDto, CvSchema> {
  toDomain(schema: CvSchema): CvDto {
    return {
      id: schema.id,
      userId: schema.userId,
      templateId: schema.templateId,
      link: schema.link,
      createdAt: schema.createdAt,
      isPublic: schema.isPublic,
      lastModified: schema.lastModified,
    };
  }

  toSchema(domain: CvDto): CvSchema {
    return {
      id: domain.id,
      userId: domain.userId,
      templateId: domain.templateId,
      link: domain.link,
      createdAt: domain.createdAt,
      isPublic: domain.isPublic,
      lastModified: domain.lastModified,
    };
  }
}
