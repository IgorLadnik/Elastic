import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { ConfigService } from '../config/config.service';

@Injectable()
export class ElasticService {
  constructor(private readonly esService: ElasticsearchService, private readonly configService: ConfigService) {
    console.log(esService);
  }
}
