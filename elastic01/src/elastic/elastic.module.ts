import { Module, OnModuleInit } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { ElasticService } from './elastic.service';

@Module({
  imports: [
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        node: configService.get('ELASTICSEARCH_NODE'),
        maxRetries: 10,
        requestTimeout: 60000,
        pingTimeout: 60000,
        sniffOnStart: true
      }),
      inject: [ConfigService]
    }),
    ConfigModule
  ],
  providers: [ElasticService],
  exports: [ElasticService]
})
export class ElasticModule implements OnModuleInit {
  constructor(private esService: ElasticService) {}
  async onModuleInit() {
    //await this.esService.createIndex();
  }
}
