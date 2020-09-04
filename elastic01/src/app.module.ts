import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ElasticModule } from './elastic/elastic.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [ConfigModule, ElasticModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
