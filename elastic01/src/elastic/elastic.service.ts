import { HttpException, Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { ConfigService } from '../config/config.service';

@Injectable()
export class ElasticService {
  constructor(private readonly esService: ElasticsearchService, private readonly configService: ConfigService) {
    // setImmediate(async () => {
    //   try {
    //     await this.esService.ping();
    //   }
    //   catch(err) {
    //     console.log(err);
    //         // throw new HttpException({
    //         //   status: 'error',
    //         //   message: 'Unable to reach Elasticsearch cluster'
    //         // }, 500);
    //   }
    // });
  }

  async createIndex() {
    let isIndexFound = true;
    let body;
    try {
      body = await this.esService.search({
        index: 'test-index',
        body: {
          query: {
            match: { quote: 'red' }
          }
        }
      });

      console.log(body.body.hits.hits[0]);
      /*
      Output:
      {
        _index: 'test-index',
          _type: '_doc',
        _id: '1P44YnQBkpZfj8pXWDXW',
        _score: 0.2876821,
        _source: { character: 'Churchill', quote: 'Rather dead than red!' }
      }
      */
    }
    catch (err) {
      isIndexFound = false;
      console.log(err);
    }

    if (!isIndexFound) {
      try {
        await this.esService.index({
          index: 'test-index',
          body: {
            character: 'Churchill',
            quote: 'Rather dead than red!'
          }
        });
      }
      catch (err) {
        isIndexFound = false;
        console.log(err);
      }
    }
  }

  async searchIndex() {
    const { body } = await this.esService.search({
      index: 'test-index',
        body: {
          query: {
            match: { quote: 'red' }
          }
        }
    })

    console.log(body.hits.hits)
  }
}
