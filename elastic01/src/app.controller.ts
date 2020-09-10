import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { ElasticService } from './elastic/elastic.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
              private readonly elasticService: ElasticService) {}

  @Get('/add/:character/:quote')
  async add(@Param() params): Promise<string> {
    const br = await this.elasticService.add(params.character, params.quote);
    //return br.toString()
    return 'zzz';
  }

  @Get('/search/:quotePattern')
  async search(@Param() params): Promise<string> {
    //return this.elasticService.test(params.quotePattern);
    const result = await this.elasticService.searchIndex(params.quotePattern);
    return JSON.stringify(result);

    //return this.appService.getHello();
  }
}
