import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('home')
  async home(){
    let barrios = await this.appService.getBarrios();
    
    return { barrios: encodeURIComponent(JSON.stringify(barrios)) }
  }

}
