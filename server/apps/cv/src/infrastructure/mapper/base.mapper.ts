export interface Mapper<Domain, Schema> {
  toDomain(schema: Schema): Domain;
  toSchema(domain: Domain): Schema;
}
