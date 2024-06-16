import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule, { cors: true });
  const configService = app.get(ConfigService);
  const port = configService.get<number>('GATEWAY_PORT', 3000);
  await app.listen(port).then(async () => {
    console.log(`Gateway is running on: ${await app.getUrl()}`);
  });
}
bootstrap();
