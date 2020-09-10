/*
kop7 / nest-elasticsearch-vue
https://github.com/kop7/nest-elasticsearch-vue/tree/master/server/src

Implement Elastic Search Using NestJS
https://www.codebyomar.me/implement-elastic-search-using-nest-js


Remote reindexing:
https://www.codementor.io/@monikamaheshwari1996/upgrading-elasticsearch-server-data-dm8bccwf7
*/

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  console.log('start');
  const configService = new ConfigService('.env');
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix(configService.get('GLOBAL_PREFIX'));
  await app.listen(configService.get('NODE_PORT'));
}
bootstrap();
