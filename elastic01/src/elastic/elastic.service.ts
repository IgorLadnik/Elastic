import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { ConfigService } from '../config/config.service';

@Injectable()
export class ElasticService {
  index: string;
  constructor(private readonly esService: ElasticsearchService,
              private readonly configService: ConfigService) {
    this.index = configService.get('ELASTICSEARCH_INDEX');
    setImmediate(async () => {
      try {
        console.log(`ELASTIC, on ping:\n\r${JSON.stringify(await this.esService.ping(), null, 2)}`);

        const ind = this.esService.indices.create({
          index: this.index,
          body: {
            settings: { },
            mappings: { },
          }
        });

        console.log(`Index:\n\r${JSON.stringify(ind, null, 2)}`);
      }
      catch(err) {
        console.log(err);
            // throw new HttpException({
            //   status: 'error',
            //   message: 'Unable to reach Elasticsearch cluster'
            // }, 500);
      }
    });
  }

  async createIndex() {
    const resultGa = await this.searchIndex('Ga?');
    ElasticService.delayMs(1000);
    const resultRed = await this.searchIndex('red');

    let br: boolean;
    if (resultRed.length === 0)
      br = await this.add('Churchill1', 'Rather dead than red!');
    if (resultGa.length === 0)
      br = await this.add('Igor', 'Ga?');
  }

  async add(character: string, quote: string): Promise<any> {
    let br = true;
    let result;
    try {
      result = await this.esService.index({
        index: this.index,
        body: {
          character,
          quote
        }
      });
    }
    catch (err) {
      br = false;
      console.log(err);
    }

    return result;
  }

  test = (quotePattern: string): string => this.index + '  ' + quotePattern;

  async searchIndex(quotePattern: string): Promise<any> {
    let result: any;
    try {
      const { body } = await this.esService.search({
        index: this.index,
        body: {
          query: {
            match: { quote: quotePattern }
          }
        }
      });
      result = body.hits.hits;
      console.log(result);
    }
    catch (err) {
      console.log(err);
    }

    return result;
  }

  static delayMs = (duration: number): Promise<void> =>
    new Promise(resolve => setTimeout(() => resolve(), duration));
}
